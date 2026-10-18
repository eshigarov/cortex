import Link from "next/link";

const facts = [
  {
    t: "Данные не покидают контур",
    d: "Корпус, граф и журнал хранятся на инфраструктуре заказчика. Обработка идёт локальной моделью; внешние API для работы с данными не используются.",
  },
  {
    t: "Источники разделены",
    d: "Каждый корпус помечен источником. Права наследуются по ролям: сотрудник одного юрлица не увидит данные другого, даже если они лежат в одном графе.",
  },
  {
    t: "Каждый ответ объясним",
    d: "В ответе — цитата, документ-источник и цепочка ранжирования: почему именно этот фрагмент. Тот же вопрос воспроизводит тот же ответ.",
  },
  {
    t: "Журнал для проверки",
    d: "Фиксируются вопрос, найденные источники, цепочка вывода, ответ, версия модели и время. Журнал можно выгрузить и передать внутреннему аудиту.",
  },
];

const limits = [
  ["Нет аттестации ФСТЭК и сертификатов", "Мы не заявляем соответствие ГОСТ или требованиям regulator'а. Журнал и локальный контур помогают пройти проверку, но не заменяют её."],
  ["Не заменяем средства защиты", "Cortex не является СЗИ, DLP или SIEM. Он встраивается в ваш периметр, а не вместо него."],
  ["Не работаем с данными без доступа", "Если у ядра нет прав на источник, оно честно скажет, чего не хватает, вместо догадки."],
  ["Не даём юридической значимости", "Ответ — основание для решения, а не сам документ. Подпись и ответственность остаются за человеком."],
];

export default function SecurityPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">безопасность · для ИБ и аудита</span>
          <h1 className="display mt-5 max-w-[18ch]">Что мы делаем, чего не делаем и как это проверить</h1>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Этот раздел написан для службы безопасности и внутреннего аудита. Здесь нет обещаний
            «полной защищённости» — только механика: где лежат данные, кто имеет доступ, что пишется
            в журнал и какие вопросы мы не закрываем.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Запросить опросник ИБ <span aria-hidden>→</span></Link>
            <Link href="/platform" className="btn btn-ghost">Как устроено ядро</Link>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {facts.map((f) => (
            <article key={f.t} className="card p-7">
              <h2 className="h3">{f.t}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-mute)]">{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">потоки данных</span>
          <h2 className="h2 mt-4 max-w-[26ch]">Что куда идёт</h2>
          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-4">
            {[
              ["01", "Источники", "Файлы, таблицы, почта, системы заказчика. Подключаются с правами на чтение."],
              ["02", "Ядро", "Онтология и граф в контуре заказчика. Локальная модель, без внешних вызовов."],
              ["03", "Агенты", "Люди и боты получают доступ по роли. Каждый запрос проходит проверку прав."],
              ["04", "Журнал", "Ответ, источники и цепочка вывода пишутся в неизменяемый лог."],
            ].map(([n, t, d]) => (
              <div key={n} className="bg-[var(--color-paper)] p-6">
                <div className="font-mono text-[11px] text-[var(--color-mute)]">{n}</div>
                <h3 className="mt-3 text-[16px] font-semibold">{t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[12px] text-[var(--color-mute)]">
            Схема развёртывания и перечень потоков данных передаются до начала пилота — для согласования с ИБ.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-16 md:grid-cols-[0.4fr_0.6fr]">
          <div>
            <span className="eyebrow">доступы и журнал</span>
            <h2 className="h2 mt-4">Кто что видит</h2>
          </div>
          <div className="space-y-6">
            {[
              ["Роли", "Права задаются по роли и подразделению. Агент действует в пределах прав своего владельца — не шире."],
              ["Источники", "Каждый документ помечен источником. Запрос по одному контуру не возвращает данные другого."],
              ["Журнал", "Хранит вопрос, источники, цепочку, ответ, версию модели и время. Срок хранения и выгрузка — по регламенту заказчика."],
              ["Модель", "Локальная. При необходимости подключается модель заказчика; данные в облако не уходят."],
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
          <span className="eyebrow">границы</span>
          <h2 className="h2 mt-4 max-w-[24ch]">Чего мы не утверждаем</h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {limits.map(([t, d]) => (
              <div key={t} className="border border-[var(--color-line)] p-6">
                <h3 className="text-[15px] font-semibold">{t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-16 md:grid-cols-[0.4fr_0.6fr]">
          <div>
            <span className="eyebrow">проверка</span>
            <h2 className="h2 mt-4">Как пройти пилот с ИБ</h2>
          </div>
          <ol className="space-y-5">
            {[
              "Согласуем схему развёртывания и перечень потоков данных.",
              "Определяем роли, права и границы контура до загрузки корпуса.",
              "Разворачиваем в изолированном сегменте заказчика.",
              "Проводим пилот на ограниченном наборе документов.",
              "Передаём журнал и отчёт: что запрашивали, какие источники, какие ответы.",
              "По итогам — решение о расширении или остановке.",
            ].map((s, i) => (
              <li key={s} className="flex gap-4 border-t border-[var(--color-line)] pt-4">
                <span className="font-mono text-[12px] text-[var(--color-mute)]">0{i + 1}</span>
                <span className="text-[14px] leading-relaxed text-[var(--color-ink)]/85">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Нужен опросник или схема для ИБ?</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Пришлём до пилота: архитектуру, потоки данных, модель угроз и границы.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Запросить →</Link>
        </div>
      </section>
    </>
  );
}
