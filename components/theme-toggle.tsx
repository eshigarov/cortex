"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const saved = (document.documentElement.getAttribute("data-theme") as Mode | null) ?? "light";
    setMode(saved);
  }, []);

  const apply = (next: Mode) => {
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("cortex.site.theme", next);
    } catch {
      /* localStorage недоступен */
    }
  };

  return (
    <button
      type="button"
      aria-label={mode === "dark" ? "Светлая тема" : "Тёмная тема"}
      onClick={() => apply(mode === "dark" ? "light" : "dark")}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]/40"
    >
      <span className="font-mono text-[13px] leading-none">{mode === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
