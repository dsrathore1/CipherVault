"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import MetricsLogin from "@/components/metrics-login";

function parsePrometheusMetrics(text) {
    const metrics = [];

    for (const line of text.split(/\r?\n/)) {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) continue;

        const match = trimmed.match(
            /^([a-zA-Z_:][a-zA-Z0-9_:]*)(?:\{([^}]*)\})?\s+([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?|NaN|[+-]?Inf)$/
        );

        if (!match) continue;

        const labels = {};
        const labelText = match[2] || "";
        const labelRegex = /([a-zA-Z_][a-zA-Z0-9_]*)="((?:\\.|[^"\\])*)"/g;
        let labelMatch;

        while ((labelMatch = labelRegex.exec(labelText)) !== null) {
            labels[labelMatch[1]] = labelMatch[2]
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, "\\");
        }

        metrics.push({
            name: match[1],
            labels,
            value: Number(match[3]),
        });
    }

    return metrics;
}

function sumMetrics(metrics, name, predicate = () => true) {
    return metrics
        .filter((metric) => metric.name === name && predicate(metric))
        .reduce((sum, metric) => sum + (Number.isFinite(metric.value) ? metric.value : 0), 0);
}

function formatNumber(value) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
    }).format(value);
}

function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return "—";
    if (bytes < 1024 * 1024) return `${formatNumber(bytes / 1024)} KB`;
    return `${formatNumber(bytes / (1024 * 1024))} MB`;
}

function formatDuration(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "—";
    if (seconds < 1) return `${formatNumber(seconds * 1000)} ms`;
    return `${formatNumber(seconds)} s`;
}

function StatCard({ label, value, detail }) {
    return (
        <article className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 wrap-break-word text-2xl font-semibold tracking-tight text-slate-100">
                {value}
            </p>
            <p className="mt-2 text-xs text-slate-500">{detail}</p>
        </article>
    );
}

export default function MetricsPage() {
    const [authStatus, setAuthStatus] = useState("checking");
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [lastUpdated, setLastUpdated] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function checkSession() {
            try {
                const response = await fetch("/api/auth/session", {
                    cache: "no-store",
                });

                if (!cancelled) {
                    setAuthStatus(response.ok ? "authenticated" : "unauthenticated");
                }
            } catch {
                if (!cancelled) {
                    setAuthStatus("unauthenticated");
                }
            }
        }

        checkSession();

        return () => {
            cancelled = true;
        };
    }, []);

    const loadMetrics = useCallback(async (manual = false) => {
        if (manual) setRefreshing(true);
        else setLoading(true);

        try {
            const response = await fetch("/api/metrics", {
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error(`Metrics endpoint returned HTTP ${response.status}`);
            }

            const text = await response.text();

            if (!text.includes("# HELP") && !text.includes("# TYPE")) {
                throw new Error("The endpoint did not return Prometheus-formatted metrics.");
            }

            setMetrics(parsePrometheusMetrics(text));
            setError("");
            setLastUpdated(new Date());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load metrics.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        const initialLoad = setTimeout(() => {
            loadMetrics();
        }, 0);

        if (!autoRefresh) return () => clearTimeout(initialLoad);

        const interval = setInterval(() => {
            loadMetrics(true);
        }, 30000);

        return () => {
            clearTimeout(initialLoad);
            clearInterval(interval);
        };
    }, [autoRefresh, loadMetrics]);

    const summary = useMemo(() => {
        const requestCount = sumMetrics(metrics, "http_requests_total");
        const errorCount = sumMetrics(
            metrics,
            "http_requests_total",
            (metric) => {
                const status = metric.labels.status || "";
                return status.startsWith("4") || status.startsWith("5");
            }
        );

        const memory = metrics.find(
            (metric) => metric.name === "process_resident_memory_bytes"
        )?.value;

        const cpuSeconds = metrics.find(
            (metric) => metric.name === "process_cpu_seconds_total"
        )?.value;

        const requestDuration = metrics.filter(
            (metric) =>
                metric.name === "http_request_duration_seconds_sum" &&
                metric.labels.handler &&
                metric.labels.handler !== "none"
        );

        const requestCounts = metrics.filter(
            (metric) =>
                metric.name === "http_request_duration_seconds_count" &&
                metric.labels.handler &&
                metric.labels.handler !== "none"
        );

        const totalDuration = requestDuration.reduce(
            (sum, metric) => sum + metric.value,
            0
        );
        const totalTimedRequests = requestCounts.reduce(
            (sum, metric) => sum + metric.value,
            0
        );

        const averageLatency =
            totalTimedRequests > 0 ? totalDuration / totalTimedRequests : null;

        const routes = new Map();

        for (const metric of metrics) {
            if (
                metric.name !== "http_requests_total" ||
                !metric.labels.handler ||
                metric.labels.handler === "none"
            ) {
                continue;
            }

            const route = metric.labels.handler;
            const current = routes.get(route) || { requests: 0, errors: 0 };

            current.requests += metric.value;

            if (
                metric.labels.status?.startsWith("4") ||
                metric.labels.status?.startsWith("5")
            ) {
                current.errors += metric.value;
            }

            routes.set(route, current);
        }

        return {
            requestCount,
            errorCount,
            memory,
            cpuSeconds,
            averageLatency,
            routes: [...routes.entries()].sort((a, b) =>
                a[0].localeCompare(b[0])
            ),
        };
    }, [metrics]);

    if (authStatus === "checking") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
                <p className="text-sm">Verifying metrics session...</p>
            </main>
        );
    }

    if (authStatus === "unauthenticated") {
        return (
            <MetricsLogin
                onLogin={() => setAuthStatus("authenticated")}
            />
        );
    }

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
            });
        } finally {
            window.location.replace("/metrics");
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
                <header className="flex flex-col gap-5 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
                            CipherVault / Observability
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                            Metrics dashboard
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Live FastAPI process and HTTP request metrics from Prometheus.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-slate-400">
                            <input
                                type="checkbox"
                                checked={autoRefresh}
                                onChange={(event) => setAutoRefresh(event.target.checked)}
                                className="accent-cyan-400"
                            />
                            Auto-refresh · 30s
                        </label>
                        <button
                            type="button"
                            onClick={() => loadMetrics(true)}
                            disabled={refreshing || loading}
                            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium hover:border-cyan-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {refreshing ? "Refreshing…" : "Refresh"}
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-lg border border-rose-900 bg-rose-950/40 px-4 py-2 text-sm font-medium text-rose-300 transition hover:border-rose-700 hover:bg-rose-900/50"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <section className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <span
                            className={`h-2 w-2 rounded-full ${error ? "bg-rose-400" : loading ? "bg-amber-400" : "bg-emerald-400"
                                }`}
                        />
                        {error ? "Metrics unavailable" : loading ? "Connecting…" : "Endpoint reachable"}
                    </div>
                    <p>
                        Last updated:{" "}
                        {lastUpdated ? lastUpdated.toLocaleTimeString() : "Not yet"}
                    </p>
                </section>

                {error && (
                    <div
                        role="alert"
                        className="mt-5 rounded-lg border border-rose-900 bg-rose-950/50 p-4 text-sm text-rose-200"
                    >
                        <p className="font-medium">Unable to load metrics</p>
                        <p className="mt-1 wrap-break-word text-rose-300">{error}</p>
                        <p className="mt-2 text-rose-300/80">
                            Check that the backend is running and the /api/metrics proxy is configured.
                        </p>
                        <button
                            type="button"
                            onClick={() => loadMetrics(true)}
                            className="mt-3 rounded-md border border-rose-800 px-3 py-1.5 hover:bg-rose-900/50"
                        >
                            Try again
                        </button>
                    </div>
                )}

                <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        label="Total HTTP requests"
                        value={loading && metrics.length === 0 ? "…" : formatNumber(summary.requestCount)}
                        detail="Counted since this backend process started"
                    />
                    <StatCard
                        label="4xx / 5xx responses"
                        value={loading && metrics.length === 0 ? "…" : formatNumber(summary.errorCount)}
                        detail="Client and server error responses"
                    />
                    <StatCard
                        label="Process memory"
                        value={summary.memory == null ? "—" : formatBytes(summary.memory)}
                        detail="Resident memory (RSS)"
                    />
                    <StatCard
                        label="Average request latency"
                        value={summary.averageLatency == null ? "—" : formatDuration(summary.averageLatency)}
                        detail="Average from available route duration counters"
                    />
                </section>

                <section className="mt-8 grid gap-5 lg:grid-cols-2">
                    <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                        <div className="border-b border-slate-800 px-5 py-4">
                            <h2 className="font-semibold">Requests by route</h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Cumulative request counters reported by the backend
                            </p>
                        </div>

                        {summary.routes.length === 0 ? (
                            <p className="p-5 text-sm text-slate-500">
                                {loading ? "Loading route metrics…" : "No route metrics available yet."}
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-950/60 text-xs uppercase text-slate-500">
                                        <tr>
                                            <th className="px-5 py-3 font-medium">Route</th>
                                            <th className="px-5 py-3 text-right font-medium">Requests</th>
                                            <th className="px-5 py-3 text-right font-medium">Errors</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {summary.routes.map(([route, data]) => (
                                            <tr key={route}>
                                                <td className="px-5 py-3 font-mono text-cyan-300">{route}</td>
                                                <td className="px-5 py-3 text-right tabular-nums">
                                                    {formatNumber(data.requests)}
                                                </td>
                                                <td className="px-5 py-3 text-right tabular-nums">
                                                    <span className={data.errors ? "text-rose-300" : "text-slate-400"}>
                                                        {formatNumber(data.errors)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </article>

                    <article className="rounded-xl border border-slate-800 bg-slate-900">
                        <div className="border-b border-slate-800 px-5 py-4">
                            <h2 className="font-semibold">Process details</h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Values exposed by the Python process exporter
                            </p>
                        </div>
                        <dl className="divide-y divide-slate-800 px-5">
                            <div className="flex items-center justify-between gap-4 py-4">
                                <dt className="text-sm text-slate-400">CPU time</dt>
                                <dd className="text-sm font-medium tabular-nums">
                                    {summary.cpuSeconds == null ? "—" : formatDuration(summary.cpuSeconds)}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-4 py-4">
                                <dt className="text-sm text-slate-400">Metric samples</dt>
                                <dd className="text-sm font-medium tabular-nums">
                                    {formatNumber(metrics.length)}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-4 py-4">
                                <dt className="text-sm text-slate-400">Refresh interval</dt>
                                <dd className="text-sm font-medium">
                                    {autoRefresh ? "30 seconds" : "Manual"}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-4 py-4">
                                <dt className="text-sm text-slate-400">Data source</dt>
                                <dd className="max-w-[65%] break-all text-right font-mono text-xs text-cyan-300">
                                    /api/metrics
                                </dd>
                            </div>
                        </dl>
                    </article>
                </section>

                <footer className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-600">
                    Metrics are process-local counters. They reset when the backend process restarts.
                </footer>
            </div>
        </main>
    );
}
