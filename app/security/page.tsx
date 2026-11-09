import Link from "next/link";

const limits = [
  ["Не заменяем средства защиты", "Ядро не является СЗИ, DLP или SIEM. Оно встраивается в ваш периметр, а не вместо него."],
  ["Не работаем с закрытыми данными", "Если у ядра нет прав на источник, оно скажет, чего не хватает, вместо догадки."],
  ["Не даём юридической силы", "Ответ, основание для решения, а не сам документ. Подпись и ответственность остаются за человеком."],
];

export default function SecurityPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <h1 className="display mt-5 max-w-[18ch]">Что мы делаем и чего не делаем</h1>
          <p className="mt-8 max-w-[56ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Раздел для службы безопасности и внутреннего аудита. Здесь только механика:
            где лежат данные, кто имеет доступ, что попадает в журнал и какие вопросы мы не закрываем.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/pilot" className="btn btn-primary">Запросить опросник ИБ <span aria-hidden>→</span></Link>
            <Link href="/platform" className="btn btn-ghost">Как устроено ядро</Link>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="border border-[var(--color-line)] p-7 md:p-9">
          <div className="eyebrow">границы</div>
          <h2 className="h3 mt-4">Чего мы не утверждаем</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {limits.map(([t, d]) => (
              <div key={t} className="border-t border-[var(--color-line)] pt-4">
                <h3 className="text-[15px] font-semibold">{t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <h2 className="h2 mt-4 max-w-[26ch]">Данные остаются у вас</h2>
          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-4">
            {[
              ["Источники", "Файлы, таблицы, почта и системы заказчика. Доступ только на чтение."],
              ["Ядро", "Онтология и граф в вашем контуре. Локальная модель, без внешних вызовов."],
              ["Агенты", "Доступ по роли. Каждый запрос проходит проверку прав."],
              ["Журнал", "Ответ, источники и цепочка пишутся в лог с версией и временем."],
            ].map(([t, d]) => (
              <div key={t} className="bg-[var(--color-paper)] p-6">
                <h3 className="text-[16px] font-semibold">{t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[12px] text-[var(--color-mute)]">
            Схему развёртывания и перечень потоков данных передаём до начала пилота.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-16 md:grid-cols-[0.4fr_0.6fr]">
          <div>
            <h2 className="h2 mt-4">Кто что видит</h2>
          </div>
          <div className="space-y-6">
            {[
              ["Роли", "Права задаются по роли и подразделению. Агент действует в пределах прав владельца."],
              ["Источники", "Каждый документ помечен источником. Запрос по одному контуру не возвращает данные другого."],
              ["Журнал", "Вопрос, источники, цепочка, ответ, версия модели и время. Срок хранения задаёт заказчик."],
              ["Модель", "Локальная. При необходимости подключается модель заказчика. Данные в облако не уходят."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-[var(--color-line)] pt-5">
                <h3 className="text-[16px] font-semibold">{t}</h3>
                <p className="mt-2 max-w-[62ch] text-[13.5px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <div className="grid gap-16 md:grid-cols-[0.4fr_0.6fr]">
            <div>
              <h2 className="h2 mt-4">Как пройти пилот с ИБ</h2>
            </div>
            <ol className="space-y-5">
              {[
                "Согласуем схему развёртывания и потоки данных.",
                "Определяем роли, права и границы контура.",
                "Разворачиваем в изолированном сегменте заказчика.",
                "Проводим пилот на ограниченном наборе документов.",
                "Передаём журнал и отчёт: вопросы, источники, ответы.",
                "По итогам решаем, расширять или остановить.",
              ].map((s, i) => (
                <li key={s} className="flex gap-4 border-t border-[var(--color-line)] pt-4">
                  <span className="text-[14px] leading-relaxed text-[var(--color-ink)]/85">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Нужен опросник или схема для ИБ?</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Пришлём до пилота: архитектуру, потоки данных, границы.</p>
          </div>
          <Link href="/pilot" className="btn btn-primary">Запросить</Link>
        </div>
      </section>
    </>
  );
}
