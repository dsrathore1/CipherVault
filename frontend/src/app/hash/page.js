"use client";

import { useState } from "react";
import Link from "next/link";

export default function HashPage() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copyError, setCopyError] = useState("");

    async function generateHash(event) {
        event.preventDefault();
        setResult(null);
        setError("");

        if (!text.trim()) {
            setError("Please enter some text to hash.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/hash", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail?.[0]?.msg || "Unable to generate hash.");
            }

            setResult(data);
        } catch (err) {
            setError(
                err.message ||
                "Could not reach the backend. Check that FastAPI is running.",
            );
        } finally {
            setLoading(false);
        }
    }


    async function copyHash() {
        try {
            await navigator.clipboard.writeText(result.hash);
            setCopied(true);
            setCopyError("");

            setTimeout(() => setCopied(false), 2500);
        } catch {
            setCopied(false);
            setCopyError("Could not copy. Please copy the hash manually.");
        }
    }

    function clearForm() {
        setText("");
        setResult(null);
        setError("");
        setCopied("");
    }

    return (
        <main className="min-h-screen bg-[#faf8ff] px-6 py-16 text-[#19123d]">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/"
                    className="font-semibold text-violet-700 hover:underline"
                >
                    ← Back to CipherVault
                </Link>

                <section className="mt-8 rounded-3xl border border-violet-100 bg-white p-6 shadow-xl shadow-violet-100/60 sm:p-10">
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Cryptography Tool 01
                    </p>

                    <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                        SHA-256 Hash Generator
                    </h1>

                    <p className="mt-4 leading-7 text-slate-600">
                        Enter text to calculate its SHA-256 digest using the CipherVault
                        Python backend.
                    </p>

                    <form onSubmit={generateHash} className="mt-8">
                        <label htmlFor="hash-input" className="mb-2 block font-semibold">
                            Text to hash
                        </label>

                        <textarea
                            id="hash-input"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            maxLength={10000}
                            rows={5}
                            placeholder="Enter text here..."
                            className="w-full rounded-2xl border border-violet-200 bg-violet-50/40 p-4 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        />

                        <div className="mt-2 text-right text-sm text-slate-500">
                            {text.length}/10000 characters
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Generating..." : "Generate SHA-256 Hash"}
                            </button>
                            <button
                                type="button"
                                onClick={clearForm}
                                disabled={!text && !result && !error}
                                className="mt-4 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Clear
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div
                            role="alert"
                            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    {result && (
                        <section className="mt-8 rounded-2xl border border-violet-200 bg-violet-50/70 p-5">
                            <p className="text-sm font-semibold text-violet-700">
                                {result.algorithm} Result
                            </p>

                            <h2 className="mt-2 font-bold">Your hash</h2>

                            <p className="mt-3 break-all rounded-xl bg-white p-4 font-mono text-sm leading-6">
                                {result.hash}
                            </p>

                            <p className="mt-3 text-sm text-slate-600">
                                Output length: {result.hash.length} hexadecimal characters (256
                                bits).
                            </p>


                            <button
                                type="button"
                                onClick={copyHash}
                                className="mt-4 rounded-lg border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
                            >
                                {copied ? "✓ Copied!" : "Copy hash"}
                            </button>

                            {copied && (
                                <p
                                    role="status"
                                    className="mt-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
                                >
                                    ✓ Hash copied to clipboard successfully!
                                </p>
                            )}

                            {copyError && (
                                <p
                                    role="alert"
                                    className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    {copyError}
                                </p>
                            )}

                        </section>
                    )}
                </section>
            </div>
        </main>
    );
}
