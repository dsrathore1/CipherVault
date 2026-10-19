"use client";

import { useState } from "react";
import Link from "next/link";

export default function ConnectionTestPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkBackend() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/health");

      if (!response.ok) {
        throw new Error(`Backend returned HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch {
      setError(
        "Could not connect. Check that the FastAPI backend is running on port 8000.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8ff] px-6 py-20 text-[#19123d]">
      <div className="mx-auto max-w-2xl rounded-3xl border border-violet-100 bg-white p-8 shadow-xl shadow-violet-100/60">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          CipherVault · Connection Test
        </p>

        <h1 className="mt-4 text-3xl font-extrabold">Frontend ↔ Backend</h1>

        <p className="mt-3 leading-7 text-slate-600">
          Test communication between the Next.js frontend and your Python
          FastAPI server.
        </p>

        <button
          onClick={checkBackend}
          disabled={loading}
          className="mt-7 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
        >
          {loading ? "Connecting..." : "Check Backend Connection"}
        </button>

        {result && (
          <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
            <h2 className="font-bold text-green-800">
              Backend connected successfully!
            </h2>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm text-green-900">
              {JSON.stringify(result, null, 2)}
            </pre>
          </section>
        )}

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {error}
          </p>
        )}

        <Link
          href="/"
          className="mt-8 inline-block font-semibold text-violet-700 hover:underline"
        >
          ← Back to CipherVault homepage
        </Link>
      </div>
    </main>
  );
}
