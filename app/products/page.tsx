import Link from "next/link";

const products = [
  {
    n: "01",
    name: "Cortex Core",
    status: "работает",
    statusTone: "ok",
    what: "Ядро: онтология, связи, поиск, журнал",
    text: "Собирает документы и таблицы в граф сущностей, отвечает на вопросы со ссылками на источник. Четыре канала поиска, слияние результатов, локальная модель.",
    inside: [
      "онтология и типы сущностей",
      "граф связей с ключами",
      "гибридный поиск (вектор + полнотекст + точные)",
      "ответ с цитатой и цепочкой",
    ],
    proof: "469 сущностей, 1 526 связей на рабочем корпусе",
    for: "компании, у которых знания есть, а доступа к ним нет",
  },
  {
    n: "02",
    name: "Cortex Memory",
    status: "работает",
    statusTone: "ok",
    what: "Память и журнал решений",
    text: "Три горизонта памяти: задача, история действий, накопленные знания. Каждый вывод пишется в журнал и воспроизводится по команде — это основание для проверки.",
    inside: [
      "рабочая, эпизодическая и семантическая память",
      "журнал: вопрос, источники, цепочка, версия",
      "повтор эпизода",
      "разграничение по роли и источнику",
    ],
    proof: "эпизод воспроизводится тем же вопросом и теми же источниками",
    for: "ИБ, внутренний аудит, руководители",
  },
  {
    n: "03",
    name: "Cortex Agents",
    status: "прототип",
    statusTone: "wip",
    what: "Агенты под роли",
    text: "Один граф — разные рабочие места: у директора сводная картина, у инженера документы и расчёты, у сотрудника на месте подсказки и заявки. Права наследуются от роли.",
    inside: [
      "агент руководителя: сводки и отклонения",
      "агент инженера: регламенты и история",
      "агент на месте: заявки и справки",
      "права и границы контура",
    ],
    proof: "прототип на нашем корпусе; промышленный пилот не проводился",
    for: "компании с несколькими ролями и разными правами",
  },
  {
    n: "04",
    name: "Cortex Map",
    status: "прототип",
    statusTone: "wip",
    what: "Карта знаний",
    text: "Интерактивный граф: узлы по типам, связи, досье на сущность, переход по связям. Нужен, чтобы увидеть структуру корпуса и найти разрывы, а не читать отчёт.",
    inside: [
      "визуализация графа с фильтрами",
      "досье узла: тип, источник, связи",
      "поиск по названиям",
      "выявление сирот и разрывов",
    ],
    proof: "рабочий прототип на 469 узлах и 1 485 связях",
    for: "аналитики, владельцы данных, руководители проектов",
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">продукты</span>
          <h1 className="display mt-5 max-w-[19ch]">Три упаковки одного ядра</h1>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Ядро одно. Продукты — это то, с чего начинает заказчик: ответы по документам, память и
            журнал для проверки, агенты под роли. Ниже — что уже работает, а что пока прототип.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="space-y-8">
          {products.map((p) => (
            <article key={p.n} className="grid gap-10 border border-[var(--color-line)] p-8 md:p-10 lg:grid-cols-[0.45fr_0.55fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[12px] text-[var(--color-mute)]">{p.n}</span>
                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                      p.statusTone === "ok"
                        ? "border-[var(--color-ink)]/20 text-[var(--color-ink)]"
                        : "border-[var(--color-acid)] text-[var(--color-acid)]"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <h2 className="h3 mt-6 text-[28px]">{p.name}</h2>
                <p className="mt-2 text-[14px] font-medium text-[var(--color-ink)]/70">{p.what}</p>
                <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-[var(--color-mute)]">{p.text}</p>
                <div className="mt-6 border-t border-[var(--color-line)] pt-4 text-[12px] leading-relaxed text-[var(--color-mute)]">
                  {p.proof}
                </div>
                <div className="mt-3 text-[12px] text-[var(--color-mute)]">для: {p.for}</div>
              </div>
              <div className="border-t border-[var(--color-line)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="eyebrow mb-4">что внутри</div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {p.inside.map((i) => (
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
          <div className="grid gap-12 md:grid-cols-[0.4fr_0.6fr]">
            <div>
              <span className="eyebrow">как выбирать</span>
              <h2 className="h2 mt-4">С чего начать</h2>
            </div>
            <div className="space-y-6">
              {[
                ["Знания есть, доступа нет", "Cortex Core — ответы по документам со ссылками."],
                ["Нужно доказать проверке", "Cortex Memory — журнал решений и повтор."],
                ["Разные роли, разные права", "Cortex Agents — рабочее место под роль."],
                ["Нужно увидеть структуру", "Cortex Map — граф и разрывы."],
              ].map(([t, d]) => (
                <div key={t} className="border-t border-[var(--color-line)] pt-4">
                  <div className="text-[15px] font-semibold">{t}</div>
                  <div className="mt-1 text-[13.5px] text-[var(--color-mute)]">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Показать продукты на ваших данных</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Пилот: две недели, десять вопросов, журнал решений.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Запросить пилот →</Link>
        </div>
      </section>
    </>
  );
}
