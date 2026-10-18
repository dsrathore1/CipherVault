import Link from "next/link";

export default function Home() {
  const features = [
    {
      number: "01",
      title: "SHA-256 Hashing",
      description:
        "Generate a secure hash from text and learn how digital fingerprints work.",
      status: "Available soon",
    },
    {
      number: "02",
      title: "RSA Cryptography",
      description:
        "Explore public and private keys, digital signatures, and verification.",
      status: "Coming next",
    },
    {
      number: "03",
      title: "Elliptic Curve Cryptography",
      description:
        "Learn about EC keys, digital signatures, and secure key agreement.",
      status: "Coming next",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Cipher<span className="text-cyan-400">Vault</span>
          </Link>

          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
            Learning Edition
          </span>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Practical Cryptography Lab
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          Understand cryptography.
          <span className="block text-cyan-400">Build it step by step.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          A beginner-friendly workspace for exploring SHA-256 hashing, RSA
          public-key cryptography, and Elliptic Curve Cryptography.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">
            SHA-256
          </span>
          <span className="rounded-lg border border-slate-700 px-4 py-2">
            RSA
          </span>
          <span className="rounded-lg border border-slate-700 px-4 py-2">
            ECC
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Explore the tools</h2>
          <p className="mt-2 text-slate-400">
            Three core topics. One simple learning platform.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500/60"
            >
              <p className="text-sm font-semibold text-cyan-400">
                TOOL {feature.number}
              </p>

              <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>

              <p className="mt-3 min-h-20 leading-7 text-slate-400">
                {feature.description}
              </p>

              <p className="mt-6 border-t border-slate-800 pt-4 text-sm text-slate-300">
                {feature.status}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-500">
        CipherVault · Built for learning and experimentation
      </footer>
    </main>
  );
}
