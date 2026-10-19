import Link from "next/link";

const entities = [
  { type: "Передел", key: "stage_id", ex: "БВР, ЭКС, АС, обогащение", role: "станция производства" },
  { type: "Материал", key: "material_id", ex: "кварцит, скала, вскрыша, концентрат", role: "что движется между переделами" },
  { type: "Оборудование", key: "asset_id", ex: "экскаватор, самосвал, мельница", role: "чем выполняется работа" },
  { type: "Проект", key: "project_id", ex: "сменное планирование", role: "зачем это всё" },
  { type: "Человек", key: "person_id", ex: "РП, диспетчер, инженер", role: "кто отвечает" },
  { type: "Организация", key: "org_id", ex: "заказчик, подрядчик, холдинг", role: "с кем работаем" },
  { type: "Документ", key: "doc_id", ex: "ТЗ, регламент, письмо", role: "на основании чего" },
  { type: "Событие", key: "event_id", ex: "встреча, изменение плана", role: "что произошло" },
];

export default function OntologyPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">онтология</span>
          <h1 className="display mt-5 max-w-[17ch]">Как компания описывает себя</h1>
          <p className="mt-8 max-w-[56ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Онтология — это система организации знаний. Не схема в презентации, а рабочая модель:
            какие сущности есть в компании, по какому ключу они склеиваются и как связаны между собой.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Показать на ваших данных <span aria-hidden>→</span></Link>
            <Link href="/platform" className="btn btn-ghost">Как устроено ядро</Link>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="eyebrow">пример</span>
            <h2 className="h2 mt-4 max-w-[22ch]">Восемь типов для производственного контура</h2>
          </div>
          <p className="max-w-[40ch] text-[13.5px] leading-relaxed text-[var(--color-mute)]">
            Только то, что нужно, чтобы отвечать на рабочие вопросы и проверять решения.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {entities.map((e) => (
            <article key={e.type} className="bg-[var(--color-paper)] p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-mute)]">{e.role}</div>
              <h3 className="mt-3 text-[17px] font-semibold">{e.type}</h3>
              <div className="mt-2 font-mono text-[11px] text-[var(--color-acid)]">{e.key}</div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--color-mute)]">{e.ex}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">как собирается</span>
          <h2 className="h2 mt-4 max-w-[24ch]">Четыре шага</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              ["01", "Данные", "Таблицы, файлы, переписка. Ядро читает то, что уже есть."],
              ["02", "Сущности", "Находит объекты и предлагает типы. Спорные подтверждает человек."],
              ["03", "Ключи", "Определяет, по чему склеивать записи."],
              ["04", "Связи", "Строит рёбра и показывает сирот."],
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
        <div className="grid gap-16 md:grid-cols-[0.4fr_0.6fr]">
          <div>
            <span className="eyebrow">пример запроса</span>
            <h2 className="h2 mt-4">Кто отвечает за пилот?</h2>
          </div>
          <div className="space-y-6">
            {[
              ["Запрос", "Агент находит сущность и её тип."],
              ["Обход", "Проект → роль → человек. Путь по связям, а не поиск слов."],
              ["Ответ", "Имя, роль, ссылка на документ и связь."],
            ].map(([t, d], i) => (
              <div key={t} className="border-t border-[var(--color-line)] pt-4">
                <div className="font-mono text-[11px] text-[var(--color-mute)]">0{i + 1}</div>
                <div className="mt-2 text-[15px] font-semibold">{t}</div>
                <div className="mt-1 text-[13.5px] text-[var(--color-mute)]">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pb-24">
        <div className="border border-[var(--color-line)] p-7 md:p-9">
          <div className="eyebrow">границы</div>
          <h2 className="h3 mt-4">Чего онтология не делает</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Не заменяет ERP и мастер-данные: описывает их, а не подменяет.",
              "Не гарантирует чистоту исходных данных: мусор видно как сироты и разрывы.",
              "Не строится без человека: спорные типы подтверждает владелец данных.",
              "Не даёт юридической силы: это модель знаний, а не документ.",
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
            <h2 className="h3">Собрать онтологию на вашем корпусе</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Две недели, десять вопросов, журнал решений.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Запросить пилот →</Link>
        </div>
      </section>
    </>
  );
}
