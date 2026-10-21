
"use client";

import { useEffect } from "react";

export default function LearningModal({ content, onClose }) {
    useEffect(() => {
        if (!content) return;

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [content, onClose]);

    if (!content) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="learning-modal-title"
                className="relative my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-violet-200 bg-white p-6 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-violet-50 sm:p-8"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close explanation"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 text-xl text-violet-700 transition hover:bg-violet-100 dark:border-slate-600 dark:text-violet-200 dark:hover:bg-slate-800"
                >
                    ×
                </button>

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-2xl text-violet-700 dark:bg-violet-950 dark:text-violet-200">
                    ◈
                </div>

                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
                    CipherVault Learning Guide
                </p>

                <h2
                    id="learning-modal-title"
                    className="pr-10 text-2xl font-extrabold sm:text-3xl"
                >
                    {content.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                    {content.description}
                </p>

                {content.examples?.length > 0 && (
                    <div className="mt-6 space-y-4">
                        {content.examples.map((example, index) => (
                            <article
                                key={`${example.heading}-${index}`}
                                className="rounded-2xl border border-violet-100 bg-violet-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/70 sm:p-5"
                            >
                                <h3 className="font-bold text-violet-800 dark:text-violet-200">
                                    {example.heading}
                                </h3>

                                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    {example.text}
                                </p>
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-7 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
                    >
                        Got it
                    </button>
                </div>
            </section>
        </div>
    );
}
