
"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../theme-toggle";

const API_URL = "http://127.0.0.1:8000";

export default function ECCPage() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState("");

    async function handleSign() {
        if (!text.trim()) {
            setError("Please enter a message to sign.");
            setResult(null);
            return;
        }

        if (new TextEncoder().encode(text).length > 1000) {
            setError("Your message must not exceed 1000 UTF-8 bytes.");
            setResult(null);
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);
        setCopied("");

        try {
            const response = await fetch(`${API_URL}/ecc/sign-verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    typeof data.detail === "string"
                        ? data.detail
                        : "The ECC operation failed."
                );
            }

            setResult(data);
        } catch (err) {
            setError(
                err.message || "Unable to connect to the CipherVault API."
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleCopy(value, label) {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(label);
            setTimeout(() => setCopied(""), 2000);
        } catch {
            setError(
                "Could not copy to clipboard. Please copy the text manually."
            );
        }
    }

    function clearForm() {
        setText("");
        setResult(null);
        setError("");
        setCopied("");
    }

    return (
        <main className="min-h-screen bg-linear-to-br from-violet-50 via-white to-purple-100 px-5 py-8 text-slate-800 transition-colors duration-200 dark:from-[#100b1f] dark:via-[#100b1f] dark:to-[#211238] dark:text-slate-100 sm:py-12">
            <div className="mx-auto max-w-4xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-200"
                    >
                        <span aria-hidden="true">←</span> Back to CipherVault
                    </Link>

                    <ThemeToggle />
                </div>

                <section className="mt-8 rounded-3xl border border-violet-100 bg-white/90 p-6 shadow-xl shadow-violet-100/60 transition-colors duration-200 dark:border-slate-700 dark:bg-[#1c1530]/95 dark:shadow-black/20 sm:p-10">
                    <div className="mb-8">
                        <span className="inline-flex rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-900/50 dark:text-violet-200">
                            ECC · Digital Signatures
                        </span>

                        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                            Elliptic Curve Cryptography
                        </h1>

                        <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
                            Sign a message using ECDSA and verify its authenticity
                            with the corresponding public key. This demonstration
                            uses the SECP256R1 curve and SHA-256.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5 dark:border-slate-700 dark:bg-slate-800/60">
                        <div className="flex items-center justify-between gap-3">
                            <label
                                htmlFor="ecc-message"
                                className="text-sm font-bold text-slate-800 dark:text-slate-100"
                            >
                                Message to sign
                            </label>

                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {new TextEncoder().encode(text).length}/1000 bytes
                            </span>
                        </div>

                        <textarea
                            id="ecc-message"
                            value={text}
                            onChange={(event) => {
                                setText(event.target.value);
                                setError("");
                                setResult(null);
                            }}
                            maxLength={1000}
                            rows={5}
                            placeholder="Enter your message here..."
                            className="mt-3 w-full resize-y rounded-xl border border-violet-200 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-violet-400 dark:focus:ring-violet-900/40"
                        />

                        <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            A new temporary ECC key pair is generated for each
                            request. Keys are not saved by this demonstration.
                        </p>

                        {error && (
                            <div
                                role="alert"
                                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                            >
                                {error}
                            </div>
                        )}

                        <div className="mt-5 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={handleSign}
                                disabled={loading || !text.trim()}
                                className="rounded-xl bg-violet-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-none"
                            >
                                {loading ? "Signing message..." : "Sign & Verify"}
                            </button>

                            <button
                                type="button"
                                onClick={clearForm}
                                disabled={!text && !result && !error}
                                className="rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200 dark:hover:bg-slate-700"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {result && (
                        <section
                            aria-live="polite"
                            className="mt-8 space-y-5"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/40">
                                <div>
                                    <p className="text-sm font-bold text-green-800 dark:text-green-300">
                                        {result.signature_verified
                                            ? "Signature verified successfully"
                                            : "Signature verification failed"}
                                    </p>

                                    <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                                        The signature was checked against the original
                                        message.
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-bold ${result.signature_verified
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200"
                                            : "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200"
                                        }`}
                                >
                                    {result.signature_verified
                                        ? "VERIFIED"
                                        : "NOT VERIFIED"}
                                </span>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-violet-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/70">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        Signature algorithm
                                    </p>
                                    <p className="mt-2 font-bold text-violet-800 dark:text-violet-300">
                                        {result.algorithm}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-violet-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/70">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        Elliptic curve
                                    </p>
                                    <p className="mt-2 font-bold text-violet-800 dark:text-violet-300">
                                        {result.curve}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-violet-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/70">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        Hash algorithm
                                    </p>
                                    <p className="mt-2 font-bold text-violet-800 dark:text-violet-300">
                                        {result.hash_algorithm}
                                    </p>
                                </div>
                            </div>

                            <ResultBlock
                                title="Digital signature (Base64)"
                                value={result.signature}
                                copied={copied === "signature"}
                                onCopy={() =>
                                    handleCopy(result.signature, "signature")
                                }
                            />

                            <ResultBlock
                                title="Public key (PEM)"
                                value={result.public_key}
                                copied={copied === "public-key"}
                                onCopy={() =>
                                    handleCopy(result.public_key, "public-key")
                                }
                            />

                            <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5 dark:border-slate-700 dark:bg-slate-800/60">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                    Original message
                                </p>

                                <p className="mt-2 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-700 dark:text-slate-300">
                                    {result.original_message}
                                </p>
                            </div>

                            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                                Educational note: verification here confirms the
                                signature for this request. Because the key pair is
                                temporary, this page does not provide persistent
                                identity verification.
                            </p>
                        </section>
                    )}
                </section>
            </div>
        </main>
    );
}

function ResultBlock({ title, value, copied, onCopy }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white dark:border-slate-700 dark:bg-slate-800/70">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-100 bg-violet-50/70 px-5 py-3 dark:border-slate-700 dark:bg-slate-900/60">
                <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {title}
                </h2>

                <button
                    type="button"
                    onClick={onCopy}
                    className="rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-bold text-violet-700 transition hover:bg-violet-100 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200 dark:hover:bg-slate-700"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all p-5 font-mono text-xs leading-6 text-slate-700 dark:text-slate-300">
                {value}
            </pre>
        </div>
    );
}
