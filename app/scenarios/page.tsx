import Link from "next/link";

const industries = [
  {
    name: "Металлургия и ГМК",
    pain: "Планы в Excel, регламенты в PDF, знания у ушедших инженеров. Замена системы планирования страшна простоем.",
    value: "Онтология переделов и оборудования, граф «кто на что влияет», ответы по регламентам со ссылкой на пункт.",
  },
  {
    name: "Энергетика",
    pain: "Режимы, допуски и аварийные процедуры разбросаны по десяткам документов.",
    value: "Связка «объект → режим → документ → ответственный». Проверка ответа по первоисточнику.",
  },
  {
    name: "Логистика",
    pain: "Тарифы и маршруты меняются быстрее, чем обновляются инструкции.",
    value: "Единая картина маршрутов и контрагентов; ответ с датой и источником последнего изменения.",
  },
  {
    name: "Финансы и страхование",
    pain: "Комплаенс требует объяснить решение, а не «так сказала модель».",
    value: "Журнал решений и цепочка источников; воспроизводимость ответа для аудита.",
  },
  {
    name: "Промышленное ПО",
    pain: "Legacy-системы держат процессы, их поведение нигде не описано.",
    value: "Извлечение правил из данных и проверок; перенос по фактам, а не по презентациям.",
  },
  {
    name: "Холдинги и группы компаний",
    pain: "Десятки юрлиц, разные системы, нет единой картины.",
    value: "Разделение источников и прав; сводные ответы по группе без смешивания данных.",
  },
];

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
    result: "Правила и расхождения видны до начала замены — дешевле, чем искать потери в производстве.",
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

export default function ScenariosPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">сценарии по отраслям</span>
          <h1 className="display mt-5 max-w-[20ch]">Механика, а не витрина</h1>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Ниже — отрасли и сценарии на реальном корпусе: 469 сущностей, 1 526 связей, 1,63 млн символов.
            Мы не выдаём их за завершённые внедрения: это описание того, как ядро ведёт себя на данных,
            и какие метрики при этом получаются.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="eyebrow">отрасли</span>
            <h2 className="h2 mt-4 max-w-[22ch]">Там, где знания дороже софта</h2>
          </div>
          <p className="max-w-[40ch] text-[13.5px] leading-relaxed text-[var(--color-mute)]">
            Формат один: боль отрасли → что даёт ядро.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {industries.map((r) => (
            <article key={r.name} className="group relative grid gap-6 border border-[var(--color-line)] p-7 transition-colors hover:bg-white md:grid-cols-[0.3fr_0.35fr_0.35fr]">
              <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--color-acid)] opacity-0 transition-opacity group-hover:opacity-100" />
              <div>
                <h3 className="h3">{r.name}</h3>
              </div>
              <div>
                <div className="eyebrow mb-2">боль</div>
                <p className="text-[13.5px] leading-relaxed text-[var(--color-mute)]">{r.pain}</p>
              </div>
              <div>
                <div className="eyebrow mb-2">что даёт ядро</div>
                <p className="text-[13.5px] leading-relaxed text-[var(--color-ink)]/80">{r.value}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">сценарии · это не внедрения</span>
          <h2 className="h2 mt-4 max-w-[22ch]">Четыре сценария с механикой</h2>
          <div className="mt-16 space-y-6">
            {cases.map((c, i) => (
              <article key={c.title} className="grid gap-8 border border-[var(--color-line)] bg-[var(--color-paper)] p-7 md:grid-cols-[0.3fr_0.7fr]">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-mute)]">{c.tag}</span>
                  <h3 className="h3 mt-4">{c.title}</h3>
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
          <p className="mt-8 text-[11.5px] text-[var(--color-mute)]">
            Завершённых внедрений, логотипов и публичных кейсов нет. Всё измерено на нашем рабочем корпусе.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
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
