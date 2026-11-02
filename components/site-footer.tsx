import Link from "next/link";
import { CortexMark } from "./cortex-mark";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)]">
      <div className="wrap py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <CortexMark size={26} className="text-[var(--color-ink)]" />
              <span className="text-[19px] font-semibold tracking-[-0.04em]">Cortex</span>
            </div>
            <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-[var(--color-mute)]">
              Ядро для ИИ-агентов: онтология, память, граф знаний, журнал решений.
            </p>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-mute)]">
              Москва · демо в вашем контуре
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3">Продукт</div>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/core" className="hover:underline">Cortex Core</Link></li>
              <li><Link href="/core#platform" className="hover:underline">Как устроено</Link></li>
              <li><Link href="/core#ontology" className="hover:underline">Онтология</Link></li>
              <li><Link href="/core#limits" className="hover:underline">Границы</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Работа</div>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/solutions" className="hover:underline">Решения</Link></li>
              <li><Link href="/scenarios" className="hover:underline">Сценарии</Link></li>
              <li><Link href="/pilot" className="hover:underline">Пилот</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Компания</div>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/about" className="hover:underline">О нас</Link></li>
              <li><Link href="/security" className="hover:underline">Безопасность и ИБ</Link></li>
              <li><Link href="/pilot" className="hover:underline">Контакты</Link></li>
              <li><a href="mailto:hello@cortex.ai" className="hover:underline">hello@cortex.ai</a></li>
            </ul>
          </div>
        </div>

        <div className="rule mt-10 flex flex-col gap-3 pt-6 text-[12px] text-[var(--color-mute)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Cortex. Все права защищены.</span>
          <span className="font-mono uppercase tracking-[0.14em]">данные остаются в вашем контуре</span>
        </div>
      </div>
    </footer>
  );
}
