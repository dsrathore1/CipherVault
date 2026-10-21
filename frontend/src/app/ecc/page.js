
"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../theme-toggle";

const API_URL = "/api";

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

    const learningSteps = [
        {
            number: "01",
            icon: "🔑",
            title: "Create a key pair",
            description:
                "ECC uses elliptic-curve mathematics to support public-key cryptography. The private key stays secret, while the corresponding public key can be shared.",
        },
        {
            number: "02",
            icon: "✍️",
            title: "Sign the message",
            description:
                "ECDSA uses the private key to create a digital signature for a message. CipherVault uses SHA-256 as part of this signing process.",
        },
        {
            number: "03",
            icon: "✓",
            title: "Verify the signature",
            description:
                "The verifier uses the corresponding public key, the message, and the signature to check whether the signature is valid.",
        },
    ];

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

                {/* ECC learning guide */}
                <section
                    aria-labelledby="ecc-learning-title"
                    className="mt-8 rounded-3xl border border-violet-100 bg-white/90 p-6 shadow-lg shadow-violet-100/50 transition-colors duration-200 dark:border-slate-700 dark:bg-[#1c1530]/95 dark:shadow-none sm:p-8"
                >
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
                        Understand the technology
                    </p>

                    <h2
                        id="ecc-learning-title"
                        className="mt-3 text-2xl font-extrabold sm:text-3xl"
                    >
                        How ECC Digital Signatures Work
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                        Elliptic Curve Cryptography (ECC) is a family of public-key
                        cryptographic techniques based on elliptic-curve mathematics.
                        This CipherVault demonstration uses ECDSA, the Elliptic Curve
                        Digital Signature Algorithm, to sign and verify messages.
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

                    <div className="mt-6 overflow-hidden rounded-2xl border border-violet-200 dark:border-violet-800">
                        <div className="bg-violet-100 px-5 py-3 dark:bg-violet-950/70">
                            <h3 className="font-bold text-violet-900 dark:text-violet-200">
                                The signature process
                            </h3>
                        </div>

                        <div className="space-y-3 p-5">
                            <div className="rounded-xl border border-violet-100 bg-white p-4 text-center dark:border-slate-700 dark:bg-slate-800">
                                <p className="font-bold">Original message</p>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    The data you want to sign
                                </p>
                            </div>

                            <div className="text-center text-xl font-bold text-violet-500" aria-hidden="true">
                                ↓
                            </div>

                            <div className="rounded-xl border border-violet-100 bg-white p-4 text-center dark:border-slate-700 dark:bg-slate-800">
                                <p className="font-bold">SHA-256 + ECDSA signing</p>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    The private key is used to produce a digital signature
                                </p>
                            </div>

                            <div className="text-center text-xl font-bold text-violet-500" aria-hidden="true">
                                ↓
                            </div>

                            <div className="rounded-xl border border-violet-100 bg-white p-4 text-center dark:border-slate-700 dark:bg-slate-800">
                                <p className="font-bold">Signature verification</p>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    The public key checks the signature against the message
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5 dark:border-violet-800 dark:bg-violet-950/40">
                        <h3 className="font-bold text-violet-900 dark:text-violet-200">
                            What are ECDSA and SECP256R1?
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                            ECDSA is the algorithm that creates and verifies digital
                            signatures. SECP256R1 is the elliptic curve used by this
                            demonstration. SHA-256 is the hash function used in the
                            signature process.
                        </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
                        <h3 className="font-bold text-amber-900 dark:text-amber-200">
                            What does a valid signature prove?
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-amber-900/90 dark:text-amber-100/90">
                            A valid signature indicates that the signature matches the
                            message and the public key used for verification. If the
                            signed message changes, verification should fail. A public
                            key alone does not prove a real-world identity; that
                            requires a trusted way to associate the key with its owner.
                        </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                        <h3 className="font-bold">Why use ECC?</h3>

                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            ECC can provide strong security with comparatively small
                            keys. It is used in various public-key cryptographic
                            systems, including digital signatures and key agreement.
                            This page demonstrates digital signatures, not ECC
                            encryption.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 p-5 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="font-bold">Ready to try ECC?</h3>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Enter a message above and observe the signature and
                                verification result.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                document.getElementById("ecc-message")?.focus();
                            }}
                            className="shrink-0 rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-800"
                        >
                            Try ECC
                        </button>
                    </div>
                </section>

                <footer className="mt-10 flex flex-wrap justify-center gap-5 text-sm text-slate-500 dark:text-slate-400">
                    <Link
                        href="/hash"
                        className="font-semibold text-violet-700 hover:underline dark:text-violet-300"
                    >
                        SHA-256 hashing
                    </Link>

                    <Link
                        href="/rsa"
                        className="font-semibold text-violet-700 hover:underline dark:text-violet-300"
                    >
                        RSA encryption
                    </Link>
                </footer>
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
