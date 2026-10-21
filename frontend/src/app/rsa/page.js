
"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../theme-toggle";

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
        }
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
        "Could not connect to the backend. Check that FastAPI is running."
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

  function clearForm() {
    setText("");
    setError("");
    setResult(null);
    setCopied(false);
  }

  const learningSteps = [
    {
      number: "01",
      title: "Generate a key pair",
      icon: "🔑",
      description:
        "RSA uses two mathematically related keys. The public key can be shared, while the private key must be kept secret.",
    },
    {
      number: "02",
      title: "Encrypt with the public key",
      icon: "🔒",
      description:
        "A sender uses the recipient's public key to encrypt a supported message. The result is ciphertext that is not readable like the original text.",
    },
    {
      number: "03",
      title: "Decrypt with the private key",
      icon: "🔓",
      description:
        "The matching private key is used to decrypt the ciphertext and recover the original message.",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-violet-50 via-white to-purple-100 px-5 py-10 text-slate-800 transition-colors duration-200 dark:from-[#100b1f] dark:via-[#100b1f] dark:to-[#1e1233] dark:text-violet-50 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-200"
          >
            ← Back to CipherVault
          </Link>

          <ThemeToggle />
        </div>

        <header className="mb-8 mt-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-200 text-3xl dark:bg-violet-950">
            🔐
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
            Public-key cryptography
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-violet-50 sm:text-5xl">
            RSA Encryption
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Enter a short message to see how RSA-2048 encryption and decryption
            work with OAEP and SHA-256.
          </p>
        </header>

        <section className="rounded-3xl border border-violet-100 bg-white/90 p-6 shadow-xl shadow-violet-100/70 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-none sm:p-8">
          <form onSubmit={handleEncryptDecrypt}>
            <label
              htmlFor="rsa-message"
              className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
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
              className="w-full resize-y rounded-2xl border border-violet-200 bg-violet-50/50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-50 dark:placeholder:text-slate-400 dark:focus:border-violet-400 dark:focus:ring-violet-950"
              aria-describedby="rsa-hint"
            />

            <div
              id="rsa-hint"
              className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-500 dark:text-slate-400"
            >
              <span>Keep your message short for this RSA demonstration.</span>
              <span>{text.length}/190 characters</span>
            </div>

            {error && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
              >
                {error}
              </div>
            )}

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={clearForm}
                disabled={!text && !result && !error}
                className="rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200 dark:hover:bg-slate-700"
              >
                Clear
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-none"
            >
              {loading ? "Processing..." : "Encrypt & Decrypt Message"}
            </button>
          </form>
        </section>

        {result && (
          <section className="mt-8 space-y-5">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/50">
              <p className="font-bold text-emerald-800 dark:text-emerald-300">
                ✓ RSA operation completed successfully
              </p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
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
                className="rounded-xl border border-violet-200 bg-violet-100 px-4 py-3 text-center text-sm font-semibold text-violet-800 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-200"
              >
                Copied to clipboard!
              </p>
            )}

            <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
              Educational demonstration only. The backend generates a fresh
              RSA key pair for each request; this page is not a persistent
              encryption or key-management service.
            </p>
          </section>
        )}

        {/* RSA learning guide */}
        <section
          aria-labelledby="rsa-learning-title"
          className="mt-8 rounded-3xl border border-violet-100 bg-white/90 p-6 shadow-lg shadow-violet-100/50 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-none sm:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">
            Understand the technology
          </p>

          <h2
            id="rsa-learning-title"
            className="mt-3 text-2xl font-extrabold sm:text-3xl"
          >
            How RSA Works
          </h2>

          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            RSA is an asymmetric cryptographic algorithm. It uses a public
            key and a matching private key for operations such as encryption
            and decryption.
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
              What is OAEP with SHA-256?
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
              OAEP stands for Optimal Asymmetric Encryption Padding. It
              adds randomized padding to RSA encryption. In this project,
              OAEP uses SHA-256 as its hash function, helping provide
              secure encryption when implemented correctly.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
            <h3 className="font-bold text-amber-900 dark:text-amber-200">
              Why is the message limited to 190 bytes?
            </h3>

            <p className="mt-2 text-sm leading-7 text-amber-900/90 dark:text-amber-100/90">
              With a 2048-bit RSA key and OAEP using SHA-256, the maximum
              plaintext size is 190 bytes. UTF-8 characters can use more
              than one byte, so the byte length may differ from the
              character count displayed above.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
            <h3 className="font-bold">Important security principle</h3>

            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Share the public key when others need to encrypt messages
              for you. Keep the private key secret. This demonstration
              generates a new key pair for each request, so it does not
              provide persistent keys or a complete key-management system.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 p-5 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold">Ready to try RSA?</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Enter a short message in the tool above and compare the
                original, encrypted, and decrypted values.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                document.getElementById("rsa-message")?.focus();
              }}
              className="shrink-0 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Try RSA
            </button>
          </div>
        </section>

        <footer className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
          Learn more with{" "}
          <Link
            href="/hash"
            className="font-semibold text-violet-700 hover:underline dark:text-violet-300"
          >
            SHA-256 hashing
          </Link>
          {" "}or{" "}
          <Link
            href="/ecc"
            className="font-semibold text-violet-700 hover:underline dark:text-violet-300"
          >
            ECC digital signatures
          </Link>
          .
        </footer>
      </div>
    </main>
  );
}

function ResultCard({
  title,
  value,
  onCopy,
  preserveWhitespace = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-bold text-slate-800 dark:text-slate-100">
          {title}
        </h2>

        {onCopy && (
          <button
            type="button"
            onClick={onCopy}
            className="rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-800 transition hover:bg-violet-200 dark:bg-violet-950 dark:text-violet-200 dark:hover:bg-violet-900"
          >
            Copy
          </button>
        )}
      </div>

      <pre
        className={`overflow-x-auto rounded-xl bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-700 dark:bg-slate-800 dark:text-slate-200 ${preserveWhitespace ? "whitespace-pre" : "whitespace-pre-wrap"
          }`}
      >
        {value}
      </pre>
    </div>
  );
}
