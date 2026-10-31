import Link from "next/link";

export function Announcement() {
  return (
    <div className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="wrap flex h-9 items-center justify-between gap-4 text-[12px]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-acid)]" />
          <span className="text-[var(--color-paper)]/85">Открыт пилот: 2 недели на ваших данных</span>
        </div>
        <Link href="/pilot" className="hidden items-center gap-1.5 font-medium text-[var(--color-acid)] hover:underline sm:flex">
          Записаться <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
