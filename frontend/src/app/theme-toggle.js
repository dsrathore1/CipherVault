"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setMounted(true);
        });

        return () => cancelAnimationFrame(frame);
    }, []);

    if (!mounted) {
        return (
            <button
                type="button"
                disabled
                aria-label="Loading color theme"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 opacity-70 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200"
            >
                ◐ Theme
            </button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            aria-pressed={isDark}
            className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm transition hover:bg-violet-50 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200 dark:hover:bg-slate-700"
        >
            <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
            {isDark ? "Light mode" : "Dark mode"}
        </button>
    );
}
