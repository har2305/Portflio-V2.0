"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#2a4b6f] bg-[#041a2d]/95 backdrop-blur-lg wave-divider">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f7e0a6,#c48d28_70%)] text-base font-bold text-[#221304] shadow-[inset_0_0_0_3px_rgba(34,19,4,0.18),0_0_24px_rgba(243,207,132,0.24)]">
            {"\u2620"}
          </span>
          <span>
            <small className="block font-mono text-[11px] uppercase tracking-[0.35em] text-[color:var(--color-accent-2)]">
              Grand Line Dossier
            </small>
            <strong className="block text-[28px] font-semibold uppercase tracking-[0.04em] text-white max-sm:text-base">
              Sai Sree Harsha Idarapalli
            </strong>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  active
                    ? "bg-[color:var(--color-accent)] text-[#241608]"
                    : "border border-[color:var(--color-border)] bg-white/5 text-[color:var(--color-text)] hover:translate-y-[-2px]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
