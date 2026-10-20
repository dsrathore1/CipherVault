"use client";

import { useState } from "react";
import Link from "next/link";

export default function RSAPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleEncryptDecrypt(event) {
    event.preventDefault();

    setError("");
    setResult(null);
    setCopied(false);

    if (!text.trim()) {
      setError("Please enter a message to encrypt.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/rsa/encrypt-decrypt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const detail = Array.isArray(data.detail)
          ? "Please check your input and try again."
          : data.detail || "RSA operation failed.";

        throw new Error(detail);
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
        "Could not connect to the backend. Check that FastAPI is running.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy failed. Please select and copy the text manually.");
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-violet-50 via-white to-purple-100 px-5 py-12 text-slate-800">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
        >
          ← Back to CipherVault
        </Link>

        <header className="mb-8 mt-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-200 text-3xl">
            🔐
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
            Public-key cryptography
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            RSA Encryption
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Enter a short message to see how RSA-2048 encryption and decryption
            work with OAEP and SHA-256.
          </p>
        </header>

        <section className="rounded-3xl border border-violet-100 bg-white/90 p-6 shadow-xl shadow-violet-100/70 sm:p-8">
          <form onSubmit={handleEncryptDecrypt}>
            <label
              htmlFor="rsa-message"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Your message
            </label>

            <textarea
              id="rsa-message"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Type a short message..."
              rows={4}
              maxLength={190}
              className="w-full resize-y rounded-2xl border border-violet-200 bg-violet-50/50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              aria-describedby="rsa-hint"
            />

            <div
              id="rsa-hint"
              className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-500"
            >
              <span>Keep your message short for this RSA demonstration.</span>
              <span>{text.length}/190 characters</span>
            </div>

            {error && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setText("");
                  setError("");
                  setResult(null);
                }}
                disabled={!text}
                className="rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Processing..." : "Encrypt & Decrypt Message"}
            </button>
          </form>
        </section>

        {result && (
          <section className="mt-8 space-y-5">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-bold text-emerald-800">
                ✓ RSA operation completed successfully
              </p>
              <p className="mt-1 text-sm text-emerald-700">
                {result.algorithm} · {result.padding}
              </p>
            </div>

            <ResultCard
              title="Original message"
              value={result.original_message}
            />

            <ResultCard
              title="Encrypted ciphertext (Base64)"
              value={result.encrypted_message}
              onCopy={() => copyText(result.encrypted_message)}
            />

            <ResultCard
              title="Decrypted message"
              value={result.decrypted_message}
            />

            <ResultCard
              title="Public key (PEM)"
              value={result.public_key}
              onCopy={() => copyText(result.public_key)}
              preserveWhitespace
            />

            {copied && (
              <p
                role="status"
                className="rounded-xl bg-violet-100 px-4 py-3 text-center text-sm font-semibold text-violet-800"
              >
                Copied to clipboard!
              </p>
            )}

            <p className="text-center text-xs leading-5 text-slate-500">
              Educational demonstration only. The backend generates a fresh RSA
              key pair for each request; this page is not a persistent
              encryption or key-management service.
            </p>
          </section>
        )}

        <footer className="mt-10 text-center text-sm text-slate-500">
          Learn more with{" "}
          <Link
            href="/hash"
            className="font-semibold text-violet-700 hover:underline"
          >
            SHA-256 hashing
          </Link>
          .
        </footer>
      </div>
    </main>
  );
}

function ResultCard({ title, value, onCopy, preserveWhitespace = false }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold text-slate-800">{title}</h2>

        {onCopy && (
          <button
            type="button"
            onClick={onCopy}
            className="rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-800 transition hover:bg-violet-200"
          >
            Copy
          </button>
        )}
      </div>

      <pre
        className={`overflow-x-auto rounded-xl bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-700 ${preserveWhitespace ? "whitespace-pre" : "whitespace-pre-wrap"
          }`}
      >
        {value}
      </pre>
    </div>
  );
}
