import Link from "next/link";

const directions = [
  {
    n: "01",
    tag: "основное",
    title: "Проектирование и внедрение автоматизации",
    lead: "Cortex + агенты: от данных до работающего контура",
    text: "Собираем ядро на ваших данных, подключаем агентов к реальным задачам, разворачиваем в контуре заказчика. На выходе — не демо, а система, которой пользуются каждый день: онтология, память, граф, журнал решений.",
    items: [
      "аудит корпуса и сборка онтологии",
      "граф знаний и связи между системами",
      "агенты под роли: руководитель, инженер, сотрудник на месте",
      "журнал решений и права доступа",
      "развёртывание on-premise и обучение",
    ],
    term: "пилот 2 недели · внедрение 4–8 недель",
  },
  {
    n: "02",
    tag: "проект или часть",
    title: "Реимплементация ПО",
    lead: "Заменить систему, не остановив производство",
    text: "Переносим логику legacy-системы в новую архитектуру: извлекаем правила из данных и поведения, описываем их в онтологии, проверяем на исторических данных. Работает и как отдельный проект, и как часть большой автоматизации.",
    items: [
      "инвентаризация правил и зависимостей",
      "онтология переделов, оборудования, ограничений",
      "проверка parity на исторических данных",
      "постепенный перенос без остановки",
      "документирование того, что раньше жило в головах",
    ],
    term: "от 6 недель, зависит от контура",
  },
  {
    n: "03",
    tag: "консалтинг",
    title: "Повышение операционной эффективности",
    lead: "Найти, где теряется время и деньги",
    text: "Разбираем процессы, считаем потери, находим узкие места. Может идти самостоятельно — как консалтинговый проект, — или как подготовка к автоматизации: тогда результат сразу становится техническим заданием.",
    items: [
      "карта процессов и точек потерь",
      "расчёт эффекта в часах и деньгах заказчика",
      "приоритеты: что автоматизировать первым",
      "ТЗ на автоматизацию или реимплементацию",
      "сопровождение внедрения",
    ],
    term: "2–6 недель",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">решения · b2b</span>
          <h1 className="display mt-5 max-w-[19ch]">Три направления, один принцип</h1>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Мы не продаём лицензию на коробку. Есть три типа работ: построить систему автоматизации,
            заменить legacy без остановки и найти потери до того, как что-то автоматизировать.
            Второе и третье могут идти отдельно или как часть первого.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="space-y-8">
          {directions.map((d) => (
            <article key={d.n} className="grid gap-10 border border-[var(--color-line)] p-8 md:p-10 lg:grid-cols-[0.42fr_0.58fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] text-[var(--color-mute)]">{d.n}</span>
                  <span className="rounded-full border border-[var(--color-line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-mute)]">
                    {d.tag}
                  </span>
                </div>
                <h2 className="h3 mt-6 text-[26px] leading-tight">{d.title}</h2>
                <p className="mt-3 text-[14px] font-medium text-[var(--color-ink)]/70">{d.lead}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-mute)]">{d.text}</p>
                <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-mute)]">
                  {d.term}
                </div>
              </div>
              <div className="border-t border-[var(--color-line)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="eyebrow mb-4">что входит</div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {d.items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--color-ink)]/80">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-acid)]" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">как идёт работа</span>
          <h2 className="h2 mt-4 max-w-[24ch]">Четыре шага, одинаковые для любого направления</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              ["01", "Аудит", "Смотрим данные, процессы, системы. Считаем объём и потери."],
              ["02", "Пилот", "2 недели на вашем корпусе: десять вопросов, журнал, метрики."],
              ["03", "Внедрение", "Развёртывание в контуре, интеграции, права, регламент."],
              ["04", "Сопровождение", "Обновление онтологии, разбор ошибок, развитие сценариев."],
            ].map(([n, t, d]) => (
              <div key={n} className="border-t border-[var(--color-ink)] pt-5">
                <span className="font-mono text-[11px] text-[var(--color-mute)]">{n}</span>
                <h3 className="mt-3 text-[16px] font-semibold">{t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="border border-[var(--color-line)] p-7 md:p-9">
          <div className="eyebrow">границы</div>
          <h2 className="h3 mt-4">Чего эти работы не дают</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Не обещаем окупаемость в конкретный срок — её считает заказчик по своим ставкам.",
              "Не заменяем внедрение ERP или ECM: ядро работает поверх данных.",
              "Не гарантируем стопроцентную точность разбора: ошибки видны и исправляются.",
              "Не проходим аттестацию ИБ вместо вас — даём журнал и локальный контур.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 border-t border-[var(--color-line)] pt-4 text-[13.5px] text-[var(--color-mute)]">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-ink)]/40" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">С чего начать?</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">
              Если неясно, где потери — начинаем с консалтинга. Если система есть — с реимплементации. Если данных много, а порядка нет — с автоматизации.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">Обсудить →</Link>
        </div>
      </section>
    </>
  );
}
