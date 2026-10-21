
"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../theme-toggle";

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
        setCopied(false);
        setCopyError("");

        if (!text.trim()) {
            setError("Please enter some text to hash.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/hash", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail?.[0]?.msg || "Unable to generate hash."
                );
            }

            setResult(data);
        } catch (err) {
            setError(
                err.message ||
                "Could not reach the backend. Check that FastAPI is running."
            );
        } finally {
            setLoading(false);
        }
    }

    async function copyHash() {
        if (!result?.hash) return;

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
        setCopied(false);
        setCopyError("");
    }

    const learningSteps = [
        {
            number: "01",
            title: "Your input",
            description:
                "Start with any text, such as Hello CipherVault. Even a tiny change in the input produces a different hash.",
            icon: "✍️",
        },
        {
            number: "02",
            title: "SHA-256 processes it",
            description:
                "SHA-256 processes the input according to its hashing algorithm. It does not use an encryption key.",
            icon: "⚙️",
        },
        {
            number: "03",
            title: "A fixed-size digest",
            description:
                "The result is a 256-bit digest, normally displayed as 64 hexadecimal characters.",
            icon: "🔐",
        },
    ];

    return (
        <main className="min-h-screen bg-[#faf8ff] px-6 py-10 text-[#19123d] transition-colors duration-200 dark:bg-[#100b1f] dark:text-violet-50 sm:py-16">
            <div className="mx-auto max-w-3xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="font-semibold text-violet-700 hover:underline dark:text-violet-300"
                    >
                        ← Back to CipherVault
                    </Link>

                    <ThemeToggle />
                </div>

                <section className="mt-8 rounded-3xl border border-violet-100 bg-white p-6 shadow-xl shadow-violet-100/60 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none sm:p-10">
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
                        Cryptography Tool 01
                    </p>

                    <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                        SHA-256 Hash Generator
                    </h1>

                    <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                        Enter text to calculate its SHA-256 digest using the CipherVault
                        Python backend.
                    </p>

                    <form onSubmit={generateHash} className="mt-8">
                        <label
                            htmlFor="hash-input"
                            className="mb-2 block font-semibold"
                        >
                            Text to hash
                        </label>

                        <textarea
                            id="hash-input"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            maxLength={10000}
                            rows={5}
                            placeholder="Enter text here..."
                            className="w-full rounded-2xl border border-violet-200 bg-violet-50/40 p-4 text-[#19123d] outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-50 dark:placeholder:text-slate-400 dark:focus:border-violet-400 dark:focus:ring-violet-950"
                        />

                        <div className="mt-2 text-right text-sm text-slate-500 dark:text-slate-400">
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
                                disabled={!text && !result && !error && !copyError}
                                className="mt-4 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200 dark:hover:bg-slate-700"
                            >
                                Clear
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div
                            role="alert"
                            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
                        >
                            {error}
                        </div>
                    )}

                    {result && (
                        <section className="mt-8 rounded-2xl border border-violet-200 bg-violet-50/70 p-5 dark:border-violet-800 dark:bg-violet-950/40">
                            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                                {result.algorithm} Result
                            </p>

                            <h2 className="mt-2 font-bold">Your hash</h2>

                            <p className="mt-3 break-all rounded-xl bg-white p-4 font-mono text-sm leading-6 text-slate-800 dark:bg-slate-800 dark:text-violet-100">
                                {result.hash}
                            </p>

                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                                Output length: {result.hash.length} hexadecimal characters
                                (256 bits).
                            </p>

                            <button
                                type="button"
                                onClick={copyHash}
                                className="mt-4 rounded-lg border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200 dark:hover:bg-slate-700"
                            >
                                {copied ? "✓ Copied!" : "Copy hash"}
                            </button>

                            {copied && (
                                <p
                                    role="status"
                                    className="mt-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300"
                                >
                                    ✓ Hash copied to clipboard successfully!
                                </p>
                            )}

                            {copyError && (
                                <p
                                    role="alert"
                                    className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
                                >
                                    {copyError}
                                </p>
                            )}
                        </section>
                    )}
                </section>

                {/* SHA-256 learning section */}
                <section
                    aria-labelledby="sha-learning-title"
                    className="mt-8 rounded-3xl border border-violet-100 bg-white p-6 shadow-lg shadow-violet-100/50 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none sm:p-8"
                >
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
                        Understand the technology
                    </p>

                    <h2
                        id="sha-learning-title"
                        className="mt-3 text-2xl font-extrabold sm:text-3xl"
                    >
                        How SHA-256 Works
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                        SHA-256 is a cryptographic hash function. It transforms input
                        data into a fixed-size digest that can help identify changes
                        in that data.
                    </p>

                    <div className="mt-7 grid gap-4 sm:grid-cols-3">
                        {learningSteps.map((step) => (
                            <article
                                key={step.number}
                                className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5 dark:border-slate-700 dark:bg-slate-800/70"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl" aria-hidden="true">
                                        {step.icon}
                                    </span>
                                    <span className="text-xs font-extrabold tracking-widest text-violet-500 dark:text-violet-300">
                                        STEP {step.number}
                                    </span>
                                </div>

                                <h3 className="mt-4 font-bold">{step.title}</h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    {step.description}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-800 dark:bg-violet-950/40">
                        <h3 className="font-bold text-violet-800 dark:text-violet-200">
                            Remember: hashing is not encryption
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                            Hashing is designed to be one-way: you do not decrypt a
                            SHA-256 digest to recover the original input. Encryption,
                            by contrast, is designed to allow authorized recovery of
                            the original data with the appropriate key.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 p-5 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="font-bold">Ready to try it?</h3>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Enter a message in the tool above and observe its digest.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                document.getElementById("hash-input")?.focus();
                            }}
                            className="shrink-0 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
                        >
                            Try SHA-256
                        </button>
                    </div>
                </section>

                <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    CipherVault · Learn cryptography by doing
                </footer>
            </div>
        </main>
    );
}
