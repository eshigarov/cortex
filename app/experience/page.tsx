import Link from "next/link";

const cases = [
  {
    tag: "горно-металлургический комбинат",
    title: "Замещение системы планирования горных работ",
    scale: "15 функциональных блоков · 6 слоёв данных · 3,8 ГБ реальной выгрузки",
    before: "Планирование держалось на одной зарубежной системе и одном специалисте, который умел с ней работать. Любая смена вендора или уход человека останавливали процесс.",
    did: "Разобрали данные заказчика, описали модель блоков, забоев и экскаваторов, собрали прототип планирования на реальной выгрузке. Проверили гипотезу на исторических данных, а не на презентации.",
    result: "Прототип просчитал 1 090 блоков, 7 экскаваторов, 1,49 млн м³ и 4,76 млн т. Заказчик увидел расчёт на своих данных до начала разработки.",
    facts: ["реальная выгрузка 3,8 ГБ", "прототип за 3 недели", "проверка на истории"],
  },
  {
    tag: "горно-металлургический комбинат",
    title: "Пилот сменного планирования",
    scale: "от бизнес-постановки до прототипа и согласования с производством",
    before: "Планирование велось укрупнённо: смена начиналась с ручной сверки и правок в таблицах. Отклонения выяснялись по факту, а не заранее.",
    did: "Собрали бизнес-постановку, согласовали её с производством и заказчиком, сделали интерактивный прототип сменного плана. Прогнали на реальных данных, показали диспетчерам.",
    result: "Появился рабочий прототип, который можно показать производству и обсудить на его языке — до разработки промышленной версии.",
    facts: ["бизнес-постановка", "интерактивный прототип", "согласование с производством"],
  },
  {
    tag: "железнодорожная логистика предприятия",
    title: "Советчик диспетчера",
    scale: "бизнес-постановка + интерактивный прототип",
    before: "Диспетчер принимал решения по движению составов, опираясь на опыт и разрозненные документы. Логика решений не была описана.",
    did: "Разобрали, какие данные и правила использует диспетчер, описали их и собрали прототип советчика: он подсказывает вариант и показывает, на чём основан.",
    result: "Прототип показал, что логику диспетчера можно описать и передать — она перестаёт быть личным опытом одного человека.",
    facts: ["описание правил", "прототип-советчик", "основание для подсказки"],
  },
];

const industries = [
  { name: "Металлургия и ГМК", pain: "планы в таблицах, регламенты в PDF, знания у ушедших инженеров", value: "онтология переделов и оборудования, ответы по регламентам со ссылкой" },
  { name: "Энергетика", pain: "режимы и аварийные процедуры разбросаны по десяткам документов", value: "связка «объект → режим → документ → ответственный»" },
  { name: "Логистика", pain: "тарифы и маршруты меняются быстрее инструкций", value: "единая картина маршрутов и контрагентов с датой источника" },
  { name: "Финансы и страхование", pain: "комплаенс требует объяснить решение, а не «так сказала модель»", value: "журнал решений и цепочка источников" },
  { name: "Промышленное ПО", pain: "legacy держит процессы, его поведение нигде не описано", value: "извлечение правил из данных и проверка на истории" },
  { name: "Холдинги", pain: "десятки юрлиц, разные системы, нет единой картины", value: "разделение источников и прав, сводные ответы по группе" },
];

export default function ExperiencePage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">опыт</span>
          <h1 className="display mt-5 max-w-[19ch]">Работали с этим руками</h1>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Ниже — примеры работ команды. Названия компаний, систем и людей не раскрываем:
            это условие работы с заказчиками. Механика, объём и результат — настоящие.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="space-y-8">
          {cases.map((c, i) => (
            <article key={c.title} className="border border-[var(--color-line)] p-8 md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-mute)]">{c.tag}</span>
                <span className="font-mono text-[11px] text-[var(--color-mute)]">0{i + 1} / 03</span>
              </div>
              <h2 className="h3 mt-5 text-[26px]">{c.title}</h2>
              <p className="mt-2 text-[13px] text-[var(--color-mute)]">{c.scale}</p>

              <div className="mt-8 grid gap-8 md:grid-cols-3">
                <div>
                  <div className="eyebrow mb-2">как было</div>
                  <p className="text-[13.5px] leading-relaxed text-[var(--color-mute)]">{c.before}</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">что делали</div>
                  <p className="text-[13.5px] leading-relaxed text-[var(--color-ink)]/80">{c.did}</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">что получилось</div>
                  <p className="text-[13.5px] leading-relaxed text-[var(--color-ink)]">{c.result}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-5">
                {c.facts.map((f) => (
                  <span key={f} className="rounded-full border border-[var(--color-line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-mute)]">
                    {f}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <span className="eyebrow">сценарии</span>
              <h2 className="h2 mt-4 max-w-[22ch]">Как это работает в отрасли</h2>
            </div>
            <p className="max-w-[40ch] text-[13.5px] leading-relaxed text-[var(--color-mute)]">
              Не обещания, а механика: с какой проблемой приходят и что делает ядро.
            </p>
          </div>

          <div className="mt-16 space-y-4">
            {industries.map((r) => (
              <article key={r.name} className="grid gap-6 border border-[var(--color-line)] p-7 md:grid-cols-[0.28fr_0.36fr_0.36fr]">
                <div>
                  <h3 className="text-[17px] font-semibold">{r.name}</h3>
                </div>
                <div>
                  <div className="eyebrow mb-2">боль</div>
                  <p className="text-[13.5px] leading-relaxed text-[var(--color-mute)]">{r.pain}</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">что делает ядро</div>
                  <p className="text-[13.5px] leading-relaxed text-[var(--color-ink)]/80">{r.value}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-12 md:grid-cols-[0.4fr_0.6fr]">
          <div>
            <span className="eyebrow">что можно измерить</span>
            <h2 className="h2 mt-4">В пилоте</h2>
          </div>
          <div className="space-y-5">
            {[
              ["Сколько знаний собрано", "сущности, связи, доля связей, ведущих в узлы"],
              ["Сколько вопросов закрыто", "из вашего списка: ответ найден / не найден / требует человека"],
              ["Сколько времени сэкономлено", "время ответа против времени поиска руками"],
              ["Можно ли повторить", "тот же вопрос — те же источники и тот же ответ"],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-[var(--color-line)] pt-4">
                <div className="text-[15px] font-semibold">{t}</div>
                <div className="mt-1 text-[13.5px] text-[var(--color-mute)]">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Показать на ваших данных</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Пилот: две недели, десять вопросов, журнал решений.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Запросить пилот →</Link>
        </div>
      </section>
    </>
  );
}
