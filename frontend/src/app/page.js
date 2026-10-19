import Link from "next/link";

const features = [
  {
    number: "01",
    symbol: "#",
    title: "SHA-256 Hashing",
    description:
      "Generate secure hashes and understand how digital fingerprints work.",
    status: "Explore Now",
  },
  {
    number: "02",
    symbol: "⚿",
    title: "RSA Cryptography",
    description:
      "Explore public and private keys, digital signatures, and verification.",
    status: "Coming next",
  },
  {
    number: "03",
    symbol: "∿",
    title: "Elliptic Curve Cryptography",
    description:
      "Discover EC keys, digital signatures, and secure key agreement.",
    status: "Coming next",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf8ff] text-[#19123d]">
      <nav className="border-b border-violet-100 bg-white/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-extrabold"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-purple-800 text-xl text-white shadow-lg shadow-violet-200">
              ◈
            </span>
            Cipher<span className="-ml-3 text-violet-700">Vault</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="#home" className="text-violet-700">
              Home
            </Link>
            <Link href="#about" className="transition hover:text-violet-700">
              About
            </Link>
            <Link href="#tools" className="transition hover:text-violet-700">
              Tools
            </Link>
            <Link href="#learn" className="transition hover:text-violet-700">
              Learn
            </Link>
          </div>

          <span className="rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
            ✦ Learning Edition
          </span>
        </div>
      </nav>

      <section
        id="home"
        className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24"
      >
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />

        <div className="relative z-10">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-violet-700">
            Practical Cryptography Lab
          </p>

          <h1 className="text-4xl font-black leading-[1.12] tracking-tight sm:text-6xl">
            Understand
            <br />
            cryptography.
            <br />
            <span className="bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Build it step by step.
            </span>
          </h1>

          <p
            id="about"
            className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
          >
            A beginner-friendly workspace for exploring SHA-256 hashing, RSA
            public-key cryptography, and Elliptic Curve Cryptography.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#tools"
              className="rounded-2xl bg-linear-to-r from-violet-600 to-purple-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              ✦ Explore Tools →
            </Link>
            <Link
              href="#learn"
              className="rounded-2xl border border-violet-200 bg-white px-6 py-3.5 font-semibold text-violet-800 transition hover:bg-violet-50"
            >
              ♧ Learn the Basics
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            <span>✦ Hands-on examples</span>
            <span>♙ Real cryptography concepts</span>
            <span>↗ Step-by-step learning</span>
          </div>
        </div>

        <div className="relative flex min-h-87.5 items-center justify-center sm:min-h-110">
          <div className="absolute h-72 w-72 rounded-full bg-violet-200/60 blur-3xl" />
          <div className="absolute h-72 w-72 rounded-full border border-violet-200 sm:h-96 sm:w-96" />
          <div className="absolute h-56 w-56 rounded-full border border-dashed border-purple-300 sm:h-72 sm:w-72" />

          <div className="relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-[2.5rem] border border-white bg-linear-to-br from-violet-500 via-purple-600 to-indigo-800 text-white shadow-2xl shadow-violet-300/70 sm:h-56 sm:w-56">
            <span className="text-7xl drop-shadow-lg">♙</span>
            <span className="mt-3 text-sm font-semibold tracking-[0.2em]">
              SECURE BY DESIGN
            </span>
          </div>

          <div className="absolute left-0 top-10 rounded-2xl border border-white bg-white/90 p-4 shadow-xl shadow-violet-100 backdrop-blur">
            <span className="text-2xl font-bold text-violet-600">#</span>
            <p className="mt-1 text-sm font-bold">SHA-256</p>
            <p className="text-xs text-slate-500">Hashing</p>
          </div>

          <div className="absolute right-0 top-16 rounded-2xl border border-white bg-white/90 p-4 shadow-xl shadow-violet-100 backdrop-blur">
            <span className="text-2xl text-purple-600">⚿</span>
            <p className="mt-1 text-sm font-bold">RSA</p>
            <p className="text-xs text-slate-500">Public keys</p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-2xl border border-white bg-white/95 px-5 py-3 shadow-xl shadow-purple-100 backdrop-blur">
            <p className="text-sm font-bold text-violet-800">
              ∿ Elliptic Curve Cryptography
            </p>
          </div>

          <span className="absolute right-12 top-0 h-4 w-4 rounded-full bg-linear-to-br from-fuchsia-400 to-violet-600 shadow-md" />
          <span className="absolute bottom-20 left-8 h-3 w-3 rounded-full bg-violet-400" />
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            Your learning toolkit
          </p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Explore the core concepts
          </h2>
          <p className="mt-2 text-slate-600">
            Three essential topics, one practical learning space.
          </p>
        </div>



        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const isSha = feature.number === "01";

            const cardClass =
              "group rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/80";

            return (
              <article key={feature.number} className={cardClass}>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 font-bold text-violet-700">
                    {feature.number}
                  </span>

                  {isSha ? (
                    <Link
                      href="/hash"
                      aria-label="Open SHA-256 hash generator"
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-100 to-purple-200 text-3xl text-violet-700 shadow-inner transition hover:scale-105"
                    >
                      {feature.symbol}
                    </Link>
                  ) : (
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-100 to-purple-200 text-3xl text-violet-700 shadow-inner">
                      {feature.symbol}
                    </span>
                  )}
                </div>

                <h3 className="mt-6 text-xl font-extrabold">
                  {feature.title}
                </h3>

                <p className="mt-3 min-h-14 leading-7 text-slate-600">
                  {feature.description}
                </p>

                {isSha ? (
                  <Link
                    href="/hash"
                    className="mt-5 inline-flex rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
                  >
                    Explore Now <span className="ml-2">→</span>
                  </Link>
                ) : (
                  <p className="mt-5 inline-flex rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                    {feature.status} <span className="ml-2">→</span>
                  </p>
                )}
              </article>
            );
          })}
        </div>

      </section>

      <section
        id="learn"
        className="mx-auto mb-12 grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          ["◇", "Beginner Friendly", "Clear explanations and real examples"],
          ["▤", "Three Core Topics", "SHA-256, RSA, and ECC in one place"],
          ["♢", "Practical Learning", "Build, experiment, and understand"],
          ["↗", "Future Ready", "A foundation for real-world cryptography"],
        ].map(([symbol, title, description]) => (
          <div
            key={title}
            className="rounded-2xl border border-violet-100 bg-white/80 p-5"
          >
            <span className="text-2xl text-violet-600">{symbol}</span>
            <h3 className="mt-3 font-bold">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>
        ))}
      </section>

      <footer className="border-t border-violet-100 bg-white/70 px-6 py-6 text-center text-sm text-slate-500">
        © CipherVault · Learn cryptography, one step at a time.
      </footer>
    </main>
  );
}
