"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  { href: "/core", label: "Cortex Core" },
  { href: "/solutions", label: "Решения" },
  { href: "/scenarios", label: "Сценарии" },
  { href: "/about", label: "Компания" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-paper)]/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-[19px] font-semibold tracking-[-0.04em]">Cortex</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-mute)] sm:inline">
            cognitive core
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-[13.5px] text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-ink)]"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/pilot" className="btn btn-primary hidden sm:inline-flex">
            Запросить пилот <span aria-hidden>→</span>
          </Link>
          <button
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] md:hidden"
          >
            <span className="font-mono text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-paper)] md:hidden">
          <div className="wrap flex flex-col py-3">
            {items.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--color-line)] py-3 text-[15px] last:border-0"
              >
                {i.label}
              </Link>
            ))}
            <Link href="/pilot" onClick={() => setOpen(false)} className="btn btn-primary mt-4 justify-center">
              Запросить пилот
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
