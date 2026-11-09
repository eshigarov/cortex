import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <h1 className="display mt-5 max-w-[17ch]">Мы строим основание доверять</h1>
          <p className="mt-8 max-w-[56ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Cortex вырос из практики: работа с данными промышленных предприятий, разбор legacy-систем,
            проверка гипотез на живых корпусах. Мы не верим в ИИ, который всё умеет.
            Мы верим в систему, которая помнит, связывает и отчитывается.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-16 md:grid-cols-[0.34fr_0.66fr]">
          <div>
          </div>
          <div className="space-y-10">
            {[
              ["Сначала факт, потом вывод", "Любое утверждение в ответе имеет источник. Нет источника, нет утверждения."],
              ["Данные остаются у заказчика", "Локальная модель, закрытый контур, без внешних вызовов с корпусом."],
              ["Отчётность как продукт", "Журнал решений не побочный лог, а то, что делает ИИ допустимым к работе."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-[var(--color-line)] pt-5">
                <h2 className="text-[19px] font-semibold tracking-[-0.02em]">{t}</h2>
                <p className="mt-2 max-w-[60ch] text-[14px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <div className="grid gap-16 md:grid-cols-[0.4fr_0.6fr]">
            <div>
              <h2 className="h2 mt-4">Без презентаций вместо результата</h2>
            </div>
            <div className="space-y-5">
              {[
                "Начинаем с данных заказчика, а не с демо.",
                "Фиксируем критерии эффекта до старта пилота.",
                "Показываем замеры, а не обещания.",
                "Если не сходится, говорим об этом первыми.",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3 border-t border-[var(--color-line)] pt-4">
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-acid)]" />
                  <span className="text-[14.5px] leading-relaxed text-[var(--color-ink)]/85">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Познакомиться ближе</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Покажем ядро на вашем примере, без слайдов.</p>
          </div>
          <Link href="/pilot" className="btn btn-primary">Связаться</Link>
        </div>
      </section>
    </>
  );
}
