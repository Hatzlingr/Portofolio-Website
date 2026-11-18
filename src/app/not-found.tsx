import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — MirrDev",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-[var(--background)] text-[var(--text-primary)]">
      <div className="flex flex-col items-start gap-5 max-w-md">
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
          {"// 404 · Signal Lost"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-pretty">
          This sector is uncharted
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          The page you requested does not exist or has been moved. Return to the main
          interface to continue exploring.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono font-medium border border-[var(--border)] text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--surface)] transition-[color,border-color,background-color,transform] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}