"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    // Surface the digest so it can be matched against server-side logs.
    console.error(error);
  }, [error]);

  const digest =
    error instanceof Error && "digest" in error
      ? String((error as { digest?: string }).digest ?? "")
      : "";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-[var(--background)] text-[var(--text-primary)]">
      <div className="flex flex-col items-start gap-5 max-w-md">
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
          {"// SYSTEM · Fault Detected"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-pretty">
          Something interrupted the reactor
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          An unexpected error occurred while rendering this view. You can retry the
          current segment without leaving the page.
        </p>
        {digest && (
          <p className="text-[11px] font-mono text-[var(--text-muted)] break-all">
            Reference: {digest}
          </p>
        )}
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono font-medium border border-[var(--border)] text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--surface)] transition-[color,border-color,background-color,transform] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}