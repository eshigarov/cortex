import Link from "next/link";

const rows = [
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

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap py-24 md:py-36">
          <span className="eyebrow">отрасли</span>
          <h1 className="display mt-5 max-w-[18ch]">Там, где знания дороже софта</h1>
          <p className="mt-7 max-w-[56ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Cortex не привязан к отрасли — он привязан к типу задачи: много документов, сложные связи,
            высокая цена ошибки. Ниже — где это проявляется сильнее всего.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="space-y-4">
          {rows.map((r) => (
            <article key={r.name} className="group relative grid gap-6 border border-[var(--color-line)] p-7 transition-colors hover:bg-white md:grid-cols-[0.35fr_0.35fr_0.3fr]">
              <span
                className="absolute left-0 top-0 h-full w-[3px]"
                style={{ background: 'var(--color-acid)' }}
              />
              <div>
                <h2 className="h3">{r.name}</h2>
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

      <section className="wrap pb-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Вашей отрасли нет в списке?</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Проверим на вашем корпусе — это и есть пилот.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Написать →</Link>
        </div>
      </section>
    </>
  );
}
