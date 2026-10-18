import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)]">
      <div className="wrap py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="text-[19px] font-semibold tracking-[-0.04em]">Cortex</div>
            <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-[var(--color-mute)]">
              Ядро для ИИ-агентов: онтология, память, граф знаний, отчётность. Работает в контуре заказчика.
            </p>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-mute)]">
              Москва · по запросу — демо в вашем контуре
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3">Платформа</div>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/ontology" className="hover:underline">Онтология</Link></li>
              <li><Link href="/platform" className="hover:underline">Память</Link></li>
              <li><Link href="/platform" className="hover:underline">Граф знаний</Link></li>
              <li><Link href="/platform" className="hover:underline">Отчётность</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Решения</div>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/solutions" className="hover:underline">Автоматизация</Link></li>
              <li><Link href="/solutions" className="hover:underline">Реимплементация ПО</Link></li>
              <li><Link href="/solutions" className="hover:underline">Оперэффективность</Link></li>
              <li><Link href="/scenarios" className="hover:underline">Сценарии</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Компания</div>
            <ul className="space-y-2 text-[14px]">
              <li><Link href="/security" className="hover:underline">Безопасность</Link></li>
              <li><Link href="/about" className="hover:underline">О нас</Link></li>
              <li><Link href="/scenarios" className="hover:underline">Отрасли и сценарии</Link></li>
              <li><Link href="/contact" className="hover:underline">Контакты</Link></li>
            </ul>
          </div>
        </div>

        <div className="rule mt-10 flex flex-col gap-3 pt-6 text-[12px] text-[var(--color-mute)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Cortex. Все права защищены.</span>
          <span className="font-mono uppercase tracking-[0.14em]">данные не покидают контур</span>
        </div>
      </div>
    </footer>
  );
}
