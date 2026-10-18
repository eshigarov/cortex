import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap py-24 md:py-36">
          <span className="eyebrow">компания</span>
          <h1 className="display mt-5 max-w-[17ch]">Мы строим основание доверять</h1>
          <p className="mt-7 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Cortex вырос из практики: работа с данными промышленных предприятий, разбор legacy-систем,
            проверка гипотез на живых корпусах. Мы не верим в «ИИ, который всё умеет». Мы верим в
            систему, которая помнит, связывает и отчитывается.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-12 md:grid-cols-[0.35fr_0.65fr]">
          <div>
            <span className="eyebrow">принципы</span>
          </div>
          <div className="space-y-8">
            {[
              ["Сначала факт, потом вывод", "Любое утверждение в ответе имеет источник. Нет источника — нет утверждения."],
              ["Данные остаются у заказчика", "Локальная модель, закрытый контур, никаких внешних вызовов с корпусом."],
              ["Дёшево убивать гипотезы", "Пилот за две недели показывает, работает ли это. Не работает — говорим прямо."],
              ["Отчётность как продукт", "Журнал решений — не побочный лог, а то, что делает ИИ допустимым к работе."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-[var(--color-line)] pt-5">
                <h2 className="text-[18px] font-semibold tracking-[-0.02em]">{t}</h2>
                <p className="mt-2 max-w-[60ch] text-[14px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <div className="grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["469", "сущностей в рабочем графе"],
              ["1 526", "связей"],
              ["14", "типов сущностей"],
              ["0,3 с", "медиана ответа"],
            ].map(([v, l]) => (
              <div key={l} className="bg-[var(--color-paper)] p-6">
                <div className="font-mono text-[24px] tracking-[-0.03em]">{v}</div>
                <div className="mt-1 text-[12px] text-[var(--color-mute)]">{l}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11.5px] text-[var(--color-mute)]">
            Замеры на собственном корпусе: два источника, 1,63 млн символов. Это не клиентские внедрения.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Познакомиться ближе</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Покажем ядро на вашем примере — без слайдов.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Связаться →</Link>
        </div>
      </section>
    </>
  );
}
