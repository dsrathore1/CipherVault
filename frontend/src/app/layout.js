
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "./theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cipher Vault",
  description:
    "A simple web application for exploring SHA-256 hashing, RSA cryptography, and Elliptic Curve Cryptography.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
