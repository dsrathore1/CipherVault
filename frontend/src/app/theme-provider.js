
"use client";

import { ThemeProvider } from "next-themes";

export default function AppThemeProvider({ children }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="cipher-vault-theme"
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
