import Link from "next/link";

const layers = [
  {
    n: "01",
    title: "Онтология",
    text: "Превращает файлы и таблицы в сущности: люди, проекты, оборудование, контрагенты. С ключами, типами и связями — без ручной разметки.",
    tag: "картина мира",
  },
  {
    n: "02",
    title: "Память",
    text: "Три горизонта: рабочий контекст, история действий и накопленные знания. Агент помнит, что делал, и повторяет ход мысли.",
    tag: "не амнезия",
  },
  {
    n: "03",
    title: "Граф знаний",
    text: "Связи между сущностями типизированы и объяснимы: кто, с чем, на основании чего. Ответ находится обходом, а не совпадением слов.",
    tag: "связность",
  },
  {
    n: "04",
    title: "Харнес",
    text: "Цикл «думай → действуй → проверяй»: инструменты, ограничения, лимиты бюджета, откат. Агент не выходит за рамки регламента.",
    tag: "действие",
  },
  {
    n: "05",
    title: "Отчётность",
    text: "Журнал решений: что агент смотрел, на каком документе основал вывод и как это повторить. Пригодно для ИБ и внутреннего аудита.",
    tag: "допуск",
  },
];

const industries = [
  { name: "Металлургия и ГМК", pain: "знания в legacy, планирование в Excel" },
  { name: "Энергетика", pain: "регламенты и режимы в разных системах" },
  { name: "Логистика", pain: "тарифы и маршруты меняются быстрее документов" },
  { name: "Финансы", pain: "аудит решений и требования комплаенса" },
  { name: "Промышленное ПО", pain: "замена систем без остановки производства" },
  { name: "Холдинги", pain: "единая картина по десяткам юрлиц" },
];

const cases = [
  {
    tag: "сценарий",
    title: "Единая картина проекта",
    text: "Проектные документы, письма и встречи сводятся в один граф: кто РП, какие системы, какие решения, что изменилось за неделю.",
    metric: "0,4 с",
    metricLabel: "до ответа со ссылками",
  },
  {
    tag: "сценарий",
    title: "Аудит действий агента",
    text: "Каждый ответ сопровождается цепочкой: источники, связи, ранжирование. Внутренний аудит видит, на чём основано решение.",
    metric: "100%",
    metricLabel: "ответов с цитатой",
  },
  {
    tag: "сценарий",
    title: "Замена legacy без пауз",
    text: "Онтология собирает поведение старой системы в правила и проверки, чтобы перенос шёл по фактам, а не по презентациям.",
    metric: "2 нед",
    metricLabel: "до первого результата",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="wrap relative pb-28 pt-16 md:pt-24">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-paper)]/50">
                b2b · средний и крупный бизнес
              </span>
              <span className="h-px w-10 bg-white/20" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-paper)]/50">
                данные не покидают контур
              </span>
            </div>

            <h1 className="display reveal mt-8 max-w-[17ch]">
              Связанные данные, память и{" "}
              <span className="text-[var(--color-acid)]">журнал решений</span>{" "}
              для ИИ-агентов
            </h1>

            <p className="reveal reveal-2 mt-10 max-w-[54ch] text-[17px] leading-relaxed text-[var(--color-paper)]/70">
              Cortex собирает сущности и связи из ваших файлов и таблиц, хранит историю действий агента
              и показывает, на чём основан каждый ответ. Работает в контуре заказчика: без внешних вызовов
              и без выгрузки корпуса.
            </p>

            <div className="reveal reveal-3 mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-acid">Пилот на ваших данных <span aria-hidden>→</span></Link>
              <Link href="/platform" className="btn border-white/25 text-[var(--color-paper)] hover:bg-white/10">Как устроено</Link>
            </div>
          </div>

          <div className="reveal reveal-4 mt-20">
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-4">
              {[
                ["469", "сущностей в графе"],
                ["1 526", "типизированных связей"],
                ["0,3 с", "ответ без генерации"],
                ["14", "типов сущностей"],
              ].map(([v, l]) => (
                <div key={l} className="bg-[var(--color-ink)] p-5">
                  <div className="font-mono text-[26px] font-medium tracking-[-0.03em]">{v}</div>
                  <div className="mt-1 text-[12px] text-[var(--color-paper)]/45">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-[var(--color-paper)]/40">
              замерено на рабочем корпусе: 1,63 млн символов · два источника
            </p>
          </div>
        </div>
      </section>

      {/* DARK BAND */}
      <section className="bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="wrap py-24 md:py-36">
          <div className="grid gap-16 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-paper)]/50">
                чем отличается
              </span>
              <h2 className="h2 mt-4 max-w-[20ch]">
                Поиск похожего <span className="text-[var(--color-acid)]">против знания</span>, о чём спросили
              </h2>
              <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-[var(--color-paper)]/70">
                Поиск по смыслу у нас есть — это один из четырёх каналов. Дальше начинается то, чего в RAG
                нет: типы сущностей, связи и журнал. Вопрос «кто отвечает за пилот» решается обходом связей,
                а не совпадением слов.
              </p>
              <Link href="/platform" className="btn btn-acid mt-8">Сравнить подходы</Link>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15">
              {[
                ["Вопрос", "RAG", "Cortex"],
                ["Что знаем про клиента?", "похожие абзацы", "досье: проект, люди, документы"],
                ["Кто отвечает за пилот?", "не находит", "путь по связям графа"],
                ["Откуда этот факт?", "нет ответа", "цитата + документ + цепочка"],
                ["Повторить ответ?", "не гарантировано", "журнал эпизодов"],
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-[1.4fr_1fr_1.2fr] gap-3 p-4 text-[12.5px] ${i === 0 ? "bg-white/10 font-mono uppercase tracking-[0.1em] text-[var(--color-paper)]/60" : "bg-[var(--color-ink)]"}`}>
                  <span className={i === 0 ? "" : "text-[var(--color-paper)]/85"}>{row[0]}</span>
                  <span className={i === 0 ? "" : "text-[var(--color-paper)]/45"}>{row[1]}</span>
                  <span className={i === 0 ? "" : "text-[var(--color-acid)]"}>{row[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-b border-[var(--color-line)] py-4">
        <div className="marquee font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--color-mute)]">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>память</span><span className="text-[var(--color-acid)]">●</span>
              <span>картина мира</span><span className="text-[var(--color-acid)]">●</span>
              <span>граф знаний</span><span className="text-[var(--color-acid)]">●</span>
              <span>отчётность</span><span className="text-[var(--color-acid)]">●</span>
              <span>контроль</span><span className="text-[var(--color-acid)]">●</span>
            </span>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="wrap py-24 md:py-36">
        <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">проблема</span>
            <h2 className="h2 mt-4 max-w-[18ch]">Агент без ядра — скрипт с амнезией</h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-3">
            {[
              ["Не помнит", "Каждый запрос начинается с нуля: контекст потерян, решение не воспроизвести."],
              ["Не связывает", "Отвечает похожими абзацами, но не знает, что клиент, проект и письмо — об одном."],
              ["Не отчитывается", "Нет ответа на вопрос «на основании чего». Для аудита и ИБ это дисквалификация."],
            ].map(([t, d]) => (
              <div key={t} className="bg-[var(--color-paper)] p-6">
                <div className="h3">{t}</div>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAYERS */}
      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">ядро · пять слоёв</span>
              <h2 className="h2 mt-4 max-w-[20ch]">Не набор функций, а связная система</h2>
            </div>
            <Link href="/platform" className="btn btn-ghost">Подробно о платформе →</Link>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-5">
            {layers.map((l) => (
              <article key={l.n} className="group bg-[var(--color-paper)] p-6 transition-colors hover:bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[var(--color-mute)]">{l.n}</span>
                  <span className="rounded-full border border-[var(--color-line)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-mute)]">
                    {l.tag}
                  </span>
                </div>
                <h3 className="h3 mt-8">{l.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{l.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PEOPLE */}
      <section id="people" className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <span className="eyebrow">люди и агенты</span>
              <h2 className="h2 mt-4 max-w-[22ch]">Одно поле данных — у директора и у сотрудника на месте</h2>
            </div>
            <p className="max-w-[42ch] text-[14px] leading-relaxed text-[var(--color-mute)]">
              У каждого — один или несколько агентов. Люди и боты работают на одной онтологии,
              видят один и тот же мир, а права разграничены по роли.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Директор", "сводная картина по группе", "ответы по всем юрлицам, риски и отклонения — без ручных сводок"],
              ["Руководитель направления", "проекты и связи", "кто за что отвечает, что изменилось, где узкое место"],
              ["Инженер и аналитик", "документы и расчёты", "регламенты, история решений, основания для вывода"],
              ["Сотрудник на месте", "агент под рукой", "подсказки и заявки в чате или телефоне, без бумаги"],
            ].map(([role, tag, text]) => (
              <article key={role} className="bg-[var(--color-paper)] p-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-mute)]">{tag}</div>
                <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.02em]">{role}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{text}</p>
                <div className="mt-6 flex items-center gap-2 border-t border-[var(--color-line)] pt-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-acid)]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-mute)]">свой агент</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 border border-[var(--color-line)] p-6 md:grid-cols-[0.4fr_0.6fr] md:p-8">
            <div className="eyebrow">как это связано</div>
            <p className="text-[14px] leading-relaxed text-[var(--color-ink)]/80">
              Агент директора и агент кладовщика отвечают по разным данным, но опираются на одни сущности
              и связи. Поэтому сводка наверху и заявка внизу не расходятся: это один граф, а не две базы.
            </p>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="wrap py-24 md:py-36">
        <span className="eyebrow">как это работает</span>
        <h2 className="h2 mt-4 max-w-[22ch]">От файлов до ответа, которому верят</h2>

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {[
            ["01", "Загружаем данные", "Документы, таблицы, переписка. Ядро само находит сущности и ключи."],
            ["02", "Собираем граф", "Связи типизируются: кто с кем, что с чем, на каком основании."],
            ["03", "Задаём вопрос", "Гибридный поиск: вектор, полнотекст, точные вхождения. Ответ за доли секунды."],
            ["04", "Проверяем вывод", "Цитата, источник, цепочка ранжирования. Всё пишется в журнал."],
          ].map(([n, t, d]) => (
            <div key={n} className="relative border-t border-[var(--color-ink)] pt-5">
              <span className="font-mono text-[11px] text-[var(--color-mute)]">{n}</span>
              <h3 className="mt-3 text-[16px] font-semibold">{t}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="wrap py-24 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">отрасли</span>
            <h2 className="h2 mt-4 max-w-[22ch]">Там, где знания дороже софта</h2>
          </div>
          <Link href="/industries" className="btn btn-ghost">Все отрасли →</Link>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <div key={i.name} className="group relative bg-[var(--color-paper)] p-6 transition-colors hover:bg-white">
              <span className="absolute left-0 top-0 h-full w-[3px] bg-[var(--color-acid)] opacity-0 transition-opacity group-hover:opacity-100" />
              <h3 className="text-[16px] font-semibold">{i.name}</h3>
              <p className="mt-2 text-[13.5px] text-[var(--color-mute)]">{i.pain}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">сценарии</span>
              <h2 className="h2 mt-4">Что это даёт на практике</h2>
            </div>
            <Link href="/cases" className="btn btn-ghost">Все кейсы →</Link>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {cases.map((c) => (
              <article key={c.title} className="card flex flex-col p-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-mute)]">{c.tag}</span>
                <h3 className="h3 mt-5">{c.title}</h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{c.text}</p>
                <div className="mt-6 border-t border-[var(--color-line)] pt-4">
                  <div className="font-mono text-[15px] tracking-[-0.01em]">{c.metric}</div>
                  <div className="text-[11.5px] text-[var(--color-mute)]">что измерим в пилоте: {c.metricLabel}</div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[11.5px] text-[var(--color-mute)]">
            Сценарии описывают механику, а не завершённые проекты. Замеры сделаны на рабочем корпусе Cortex.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap pb-28 pt-24">
        <div className="relative overflow-hidden border border-[var(--color-ink)] p-8 md:p-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--color-acid)] opacity-80" />
          <div className="relative">
            <span className="eyebrow">пилот · 2 недели</span>
            <h2 className="h2 mt-4 max-w-[24ch]">Проверим на ваших данных, а не на презентации</h2>
            <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-[var(--color-ink)]/70">
              Загружаем корпус, собираем граф, отвечаем на десять ваших реальных вопросов.
              Результат — ответы со ссылками и журнал, который можно показать на проверке.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link href="/contact" className="btn btn-primary justify-center">Пилот для производства</Link>
              <Link href="/contact" className="btn justify-center border-[var(--color-ink)]/30">Проверка для ИБ</Link>
              <Link href="/contact" className="btn justify-center border-[var(--color-ink)]/30">Демо для ИТ</Link>
            </div>

            <div className="mt-10 border-t border-[var(--color-ink)]/15 pt-6">
              <div className="eyebrow">что прислать, чтобы начать</div>
              <div className="mt-4 grid gap-4 text-[13.5px] sm:grid-cols-4">
                {[
                  ["Отрасль", "и подразделение"],
                  ["Объём", "документов и таблиц"],
                  ["Где лежит", "файлы, почта, система"],
                  ["Один вопрос", "на который ищете долго"],
                ].map(([t, d]) => (
                  <div key={t}>
                    <div className="font-medium">{t}</div>
                    <div className="text-[var(--color-mute)]">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
