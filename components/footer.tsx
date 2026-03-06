export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-[color:var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <p>Built with Next.js 16, TypeScript, and motion with purpose.</p>
        <p className="font-mono text-xs uppercase tracking-[0.24em]">
          Available for software engineering roles
        </p>
      </div>
    </footer>
  );
}
