export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen flex items-center justify-center bg-[var(--background)]"
    >
      <span className="sr-only">Loading content</span>
      <div className="flex flex-col items-center gap-4" aria-hidden="true">
        <div className="h-10 w-10 rounded-full border border-[var(--border)] border-t-[var(--accent)] animate-spin" />
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-muted)]">
          Initializing
        </span>
      </div>
    </div>
  );
}