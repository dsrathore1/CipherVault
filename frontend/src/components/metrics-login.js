
"use client";

import { useState } from "react";

export default function MetricsLogin({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Authentication failed.");
                return;
            }

            setPassword("");
            onLogin();
        } catch {
            setError("Unable to connect. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b14] px-5 py-12 text-slate-100">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(8,145,178,0.16),transparent_55%)]" />

            <section className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/90 p-7 shadow-2xl shadow-cyan-950/20 sm:p-9">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 font-mono text-sm font-bold text-cyan-300">
                        256
                    </div>
                    <div>
                        <p className="text-lg font-semibold tracking-tight">
                            CipherVault
                        </p>
                        <p className="text-xs text-slate-500">
                            Secure observability
                        </p>
                    </div>
                </div>

                <div className="mb-7">
                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-cyan-400">
                        SHA-256 · Restricted access
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Metrics sign in
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Authenticate to view service health, request statistics, and
                        runtime metrics.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="metrics-username"
                            className="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Username
                        </label>
                        <input
                            id="metrics-username"
                            autoComplete="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                            maxLength={128}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="metrics-password"
                            className="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Password
                        </label>
                        <input
                            id="metrics-password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            maxLength={1024}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg border border-rose-900 bg-rose-950/50 px-3 py-2.5 text-sm text-rose-300"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Verifying credentials..." : "Unlock metrics"}
                    </button>
                </form>

                <div className="mt-7 flex items-center gap-2 border-t border-slate-800 pt-5 text-xs text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    SHA-256-inspired security interface
                </div>
            </section>
        </main>
    );
}
