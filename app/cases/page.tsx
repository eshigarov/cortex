import Link from "next/link";

const cases = [
  {
    tag: "сценарий · ГМК",
    title: "Единая картина проекта планирования",
    context: "Проектные документы, ТЗ, письма и встречи живут в разных местах. Новый участник неделю выясняет, кто за что отвечает.",
    what: "Корпус собран в граф: проект, заказчик, РП, система, подрядчики, документы. Вопрос «кто отвечает за модуль» решается обходом связей за доли секунды.",
    result: "0,4 с до ответа со ссылками; онбординг сокращается с недель до часов.",
  },
  {
    tag: "сценарий · промышленное ПО",
    title: "Извлечение правил из legacy",
    context: "Старая система планирования держит процесс, но её логика не описана: только данные и поведение.",
    what: "Онтология переделов и ограничений, граф зависимостей, проверки на исторических данных. Перенос идёт по фактам, а не по презентации вендора.",
    result: "Правила и расхождения видны до начала замены — дешевле, чем найти потери уже в производстве.",
  },
  {
    tag: "сценарий · финансы",
    title: "Ответ, который принимает комплаенс",
    context: "ИИ отвечает на вопросы по регламентам, но служба внутреннего контроля не принимает ответ без основания.",
    what: "Каждый ответ: цитата из документа, цепочка ранжирования, запись в журнал. Тот же вопрос воспроизводит тот же ответ.",
    result: "Доля ответов с цитатой — 100%; журнал пригоден для проверки.",
  },
  {
    tag: "сценарий · холдинг",
    title: "Сводная картина без смешивания данных",
    context: "Десятки юрлиц, разные системы, разные права. Общий поиск либо не работает, либо показывает лишнее.",
    what: "Источники разделены, права наследуются, ответы собираются по группе с указанием, откуда факт.",
    result: "Один интерфейс, разные контуры; утечки между юрлицами исключены на уровне модели данных.",
  },
];

export default function CasesPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap py-24 md:py-36">
          <span className="eyebrow">кейсы и сценарии</span>
          <h1 className="display mt-5 max-w-[20ch]">Механика, а не витрина</h1>
          <p className="mt-7 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Ниже — сценарии, собранные на реальном корпусе: 469 сущностей, 1 526 связей, 1,63 млн символов.
            Мы не выдаём их за завершённые внедрения: это описание того, как ядро ведёт себя на данных,
            и какие метрики при этом получаются.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="space-y-6">
          {cases.map((c, i) => (
            <article key={c.title} className="grid gap-8 border border-[var(--color-line)] p-7 md:grid-cols-[0.3fr_0.7fr]">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-mute)]">{c.tag}</span>
                <h2 className="h3 mt-4">{c.title}</h2>
                <div className="mt-4 font-mono text-[11px] text-[var(--color-mute)]">0{i + 1} / 04</div>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <div className="eyebrow mb-2">контекст</div>
                  <p className="text-[13px] leading-relaxed text-[var(--color-mute)]">{c.context}</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">что делает ядро</div>
                  <p className="text-[13px] leading-relaxed text-[var(--color-ink)]/80">{c.what}</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">что измерим в пилоте</div>
                  <p className="text-[13px] leading-relaxed text-[var(--color-ink)]">{c.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap pb-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Хотите увидеть на своих данных?</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Пилот: две недели, десять вопросов, журнал решений.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Запросить пилот →</Link>
        </div>
      </section>
    </>
  );
}
