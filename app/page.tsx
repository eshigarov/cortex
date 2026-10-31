import Link from "next/link";

const layers = [
  {
    n: "01",
    title: "Онтология",
    text: "Документы и таблицы становятся сущностями: люди, проекты, оборудование, контрагенты. У каждой — тип, ключ и связи. Дубли склеиваются.",
  },
  {
    n: "02",
    title: "Память",
    text: "Рабочая держит задачу, эпизодическая — что агент делал и как это повторить, семантическая — что известно. Агент не начинает каждый запуск с нуля.",
  },
  {
    n: "03",
    title: "Граф знаний",
    text: "Связи типизированы и объяснимы: кто, с чем, на основании чего. Ответ находится обходом, а не совпадением слов.",
  },
  {
    n: "04",
    title: "Контур исполнения",
    text: "Инструменты, лимиты, остановка. Агент действует только через выданные инструменты. Откат работает внутри контура и не отменяет изменений во внешних системах.",
  },
  {
    n: "05",
    title: "Отчётность",
    text: "Журнал решений: вопрос, источники, цепочка, версия. Цепочку любого эпизода можно повторить.",
  },
];

const paths = [
  {
    title: "Производство и операции",
    text: "Что произошло и кто отвечает: сводки со ссылками на документы, история решений.",
    href: "/pilot#what",
    label: "что в пилоте",
  },
  {
    title: "ИТ и данные",
    text: "Как устроено и что нужно от ИТ: источники, контур, права.",
    href: "/core",
    label: "как устроено",
  },
  {
    title: "ИБ и аудит",
    text: "Что с данными и доступами: контур, журнал, чего мы не утверждаем.",
    href: "/security",
    label: "для ИБ",
  },
  {
    title: "Закупки",
    text: "Состав, сроки, условия: что в пилоте, что нужно от вас, как фиксируем стоимость.",
    href: "/pilot",
    label: "условия",
  },
];

const scenarios = [
  {
    sector: "Логистика",
    segment: "Средний бизнес",
    pain: "Ответ на претензию собирают из рейса, накладной, акта и фото вручную. Пакет бывает неполным.",
    mech: "Связываем рейс, транспорт, накладную, акт, фото и претензию. Собираем пакет, сверяем вес и даты, показываем расхождения.",
    effect: "40 минут вместо 4 часов",
    measure: "время сборки пакета, доля полных пакетов, число найденных расхождений",
  },
  {
    sector: "Лизинг",
    segment: "Средний бизнес",
    pain: "Досье приходит неполным, комплект документов проверяют вручную.",
    mech: "Связываем заявку, контрагента, документы и риск-факторы. Проверяем комплект по вашей политике, находим расхождения, готовим резюме со ссылками.",
    effect: "1 день вместо 3",
    measure: "время проверки комплекта, сколько неполных досье найдено до комитета",
  },
  {
    sector: "Проектирование",
    segment: "Средний бизнес",
    pain: "Проект возвращают 3–4 раза: замечания в разных форматах, часть повторяет прошлые.",
    mech: "Привязываем замечание к листу, версии и пункту нормы, помечаем повторные, собираем чек-лист.",
    effect: "7 дней вместо 12",
    measure: "число повторных замечаний, время сборки ответа эксперту",
  },
  {
    sector: "Металлургия",
    segment: "ДЗО / крупный",
    pain: "Сводку по простоям собирают вручную из нескольких систем и журналов.",
    mech: "Связываем агрегат, партию, наряд и заявку, склеиваем дубли, предлагаем причину со ссылкой на документ. Причину подтверждает человек.",
    effect: "15 минут вместо 2 часов",
    measure: "время подготовки сводки до и после, сколько причин найдено со ссылкой",
  },
  {
    sector: "Энергетика",
    segment: "ДЗО / крупный",
    pain: "Техусловия готовят 10 дней, часть заявок возвращается на доработку.",
    mech: "Связываем объект, точку подключения, договор и требования. Проверяем комплект, готовим проект ТУ.",
    effect: "3 дня вместо 10",
    measure: "срок подготовки, число возвратов на доработку",
  },
  {
    sector: "Нефтегаз",
    segment: "Крупный",
    pain: "Наряд-допуск согласуют 3 дня, удостоверения проверяют вручную.",
    mech: "Связываем объект, работу, наряд, подрядчика и удостоверения. Готовим проверку допуска и наложений. Решение за человеком.",
    effect: "4 часа вместо 3 дней",
    measure: "время согласования, число найденных наложений и просроченных допусков",
  },
];

const rag = [
  {
    q: "Кто отвечает за пилот?",
    search: "Ищет фрагменты, похожие на вопрос. Ответ зависит от того, попал ли в выдачу нужный абзац.",
    cortex: "Идёт по связям от проекта к человеку и называет ответственного.",
  },
  {
    q: "На чём держится вывод?",
    search: "Показывает фрагменты, из которых собран ответ.",
    cortex: "Журнал: вопрос, источники, цепочка, версия.",
  },
  {
    q: "Что агент делал в прошлый раз?",
    search: "Обычно не хранит действия агента.",
    cortex: "Эпизодическая память хранит действия и то, как их повторить.",
  },
  {
    q: "Один контрагент в разных файлах?",
    search: "Два набора фрагментов, связь остаётся на читателе.",
    cortex: "Дубли склеиваются в одну сущность с ключом.",
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
        <div className="wrap relative pb-20 pt-16 md:pb-28 md:pt-24">
          <h1 className="display max-w-[18ch]">
            Агент, который показывает, на чём основан ответ
          </h1>

          <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-[var(--color-paper)]/70">
            Cortex Core — ядро для ИИ-агентов. Собирает документы и данные в граф связей,
            хранит память агента и журнал: источники, цепочка вывода, версия.
          </p>

          <p className="mt-3 max-w-[58ch] text-[14px] text-[var(--color-paper)]/45">
            Не чат-бот и не фреймворк. Пилот — две недели на ваших данных.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/pilot" className="btn btn-acid">
              Запросить пилот <span aria-hidden>→</span>
            </Link>
            <Link
              href="/core"
              className="btn border border-white/25 text-[var(--color-paper)] hover:bg-white/10"
            >
              Как устроено
            </Link>
          </div>

          <div className="mt-14 border-t border-white/15 pt-6">
            <div className="flex flex-wrap gap-x-7 gap-y-2 font-mono text-[12px] text-[var(--color-paper)]/75">
              <span>×8 быстрее сводка по простоям</span>
              <span>55% → 75% взысканных претензий</span>
              <span>3 дня вместо 10 на ТУ</span>
              <span>−15% out-of-stock</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[12px] text-[var(--color-paper)]/45">
              <span>до 12 млн документов</span>
              <span>2,4 млн сущностей</span>
              <span>18,6 млн связей</span>
              <span>0,2 с на ответ</span>
            </div>
            <p className="mt-4 text-[11.5px] leading-relaxed text-[var(--color-paper)]/40">
              Типовые сценарии и проектный масштаб. На вашем объёме замерим в пилоте.
            </p>
          </div>
        </div>
      </section>

      {/* ПУТИ */}
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap py-16 md:py-20">
          <div className="grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((p) => (
              <Link key={p.title} href={p.href} className="group bg-[var(--color-paper)] p-6 transition-colors hover:bg-white">
                <div className="text-[16px] font-semibold">{p.title}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-mute)]">{p.text}</p>
                <span className="mt-4 inline-block font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-acid)]">
                  {p.label} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОБЛЕМА */}
      <section className="wrap py-24">
        <span className="eyebrow">проблема</span>
        <h2 className="h2 mt-4 max-w-[24ch]">Данных много. Связей нет.</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Знания есть, доступа нет",
              d: "Много систем, папки без структуры и несколько человек, которые «всё знают». Уйдут — унесут.",
            },
            {
              t: "Ответ без основания",
              d: "Ассистент отвечает уверенно, ссылка на файл обычно есть. Как собран вывод и можно ли его повторить — не видно.",
            },
            {
              t: "Опыт не накапливается",
              d: "Прошлое решение найти трудно, поэтому его принимают заново.",
            },
          ].map((i) => (
            <div key={i.t} className="border-t border-[var(--color-ink)] pt-5">
              <h3 className="h3">{i.t}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-mute)]">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* СЛОИ */}
      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">ядро</span>
          <h2 className="h2 mt-4 max-w-[22ch]">Из чего состоит ядро</h2>
          <div className="mt-14 space-y-10">
            {layers.map((l) => (
              <div key={l.n} className="grid gap-6 border-t border-[var(--color-line)] pt-6 md:grid-cols-[0.28fr_0.72fr]">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-[var(--color-mute)]">{l.n}</span>
                  <h3 className="text-[19px] font-semibold">{l.title}</h3>
                </div>
                <p className="max-w-[64ch] text-[14.5px] leading-relaxed text-[var(--color-ink)]/80">{l.text}</p>
              </div>
            ))}
          </div>
          <Link href="/core" className="btn btn-ghost mt-12 border border-[var(--color-line)]">
            Как устроено подробно →
          </Link>
        </div>
      </section>

      {/* RAG */}
      <section className="wrap py-24">
        <span className="eyebrow">сравнение</span>
        <h2 className="h2 mt-4 max-w-[26ch]">Поиск отвечает фрагментами. Ядро отвечает связями</h2>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-ink)]">
                <th className="py-4 pr-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">вопрос</th>
                <th className="py-4 pr-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-mute)]">поиск / rag</th>
                <th className="py-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-acid)]">cortex</th>
              </tr>
            </thead>
            <tbody>
              {rag.map((r) => (
                <tr key={r.q} className="border-b border-[var(--color-line)] align-top">
                  <td className="py-5 pr-6 text-[14.5px] font-medium">{r.q}</td>
                  <td className="py-5 pr-6 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{r.search}</td>
                  <td className="py-5 text-[13.5px] leading-relaxed text-[var(--color-ink)]/85">{r.cortex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-[12.5px] text-[var(--color-mute)]">
          Поиск по смыслу в Cortex тоже есть. Остальное — то, чего поиску не хватает.
        </p>
      </section>

      {/* ПИЛОТ */}
      <section id="pilot" className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">пилот</span>
          <h2 className="h2 mt-4 max-w-[24ch]">Две недели, десять вопросов, журнал решений</h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2">
            {[
              {
                t: "Граф на ваших данных",
                d: "Сколько сущностей и связей найдено, сколько узлов осталось без связей. Видно, чего в данных не хватает.",
              },
              {
                t: "Ответы на десять ваших вопросов",
                d: "Список даёте вы до старта. Отметку «верно / неверно / не найдено» ставите вы. Не демо — проверка.",
              },
              {
                t: "Замер",
                d: "Время ответа на ваших запросах, доля вопросов с найденным ответом, места, где упёрлись в качество данных.",
              },
              {
                t: "Письменный итог",
                d: "Что работает, что доработать, что не получится. Даже если вывод — не идти.",
              },
            ].map((i) => (
              <div key={i.t} className="bg-[var(--color-paper)] p-7">
                <h3 className="text-[17px] font-semibold">{i.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{i.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-[62ch] text-[13.5px] leading-relaxed text-[var(--color-mute)]">
            Состав, сроки и стоимость фиксируем письменно до старта. Это ранний продукт:
            завершённых внедрений у нас нет. Поэтому пилот короткий, с фиксированной суммой, и итог пишем честно.
          </p>

          <Link href="/pilot" className="btn btn-primary mt-8">
            Запросить пилот →
          </Link>
        </div>
      </section>

      {/* ДАННЫЕ */}
      <section className="wrap py-24">
        <span className="eyebrow">данные</span>
        <h2 className="h2 mt-4 max-w-[20ch]">Данные остаются у вас</h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Контур",
              d: "В пилоте корпус можно держать в вашем контуре, модель работает внутри него. Режим развёртывания фиксируем до старта.",
            },
            {
              t: "Доступ по роли",
              d: "Директор, инженер, сотрудник на месте видят своё. ИБ проверяет это в пилоте: спрашивает от роли без доступа.",
            },
            {
              t: "Журнал",
              d: "Видно, кто спросил, что получил и на каком основании.",
            },
          ].map((i) => (
            <div key={i.t} className="border-t border-[var(--color-ink)] pt-5">
              <h3 className="h3">{i.t}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-mute)]">{i.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-[64ch] text-[13.5px] leading-relaxed text-[var(--color-mute)]">
          Сертификатов и аттестации ИБ у нас нет — говорим прямо. Поэтому пилот начинается
          с вашей службы безопасности, а не вопреки ей.
        </p>
        <Link href="/security" className="btn btn-ghost mt-6 border border-[var(--color-line)]">
          Что мы делаем и чего не утверждаем →
        </Link>
      </section>

      {/* СЦЕНАРИИ */}
      <section className="border-t border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">сценарии</span>
          <h2 className="h2 mt-4 max-w-[22ch]">Сценарии. Это не внедрения</h2>
          <p className="mt-6 max-w-[66ch] text-[14px] leading-relaxed text-[var(--color-mute)]">
            Задача и механика. Результатов не публикуем: внедрений нет. Показываем, что измерим в пилоте.
            Ориентиры эффекта — из похожих проектов, не наши результаты.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((s) => (
              <article key={s.sector} className="card flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em]">{s.sector}</span>
                  <span className="rounded-full border border-[var(--color-line)] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-[var(--color-mute)]">
                    {s.segment}
                  </span>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-mute)]">{s.pain}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-ink)]/80">{s.mech}</p>
                <div className="mt-auto pt-5">
                  <div className="text-[15px] font-semibold text-[var(--color-acid)]">{s.effect}</div>
                  <div className="mt-1 text-[11.5px] leading-relaxed text-[var(--color-mute)]">
                    ориентир · в пилоте измерим: {s.measure}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Link href="/scenarios" className="btn btn-ghost mt-10 border border-[var(--color-line)]">
            Все сценарии →
          </Link>
        </div>
      </section>

      {/* ФИНАЛ */}
      <section className="wrap py-24">
        <div className="flex flex-wrap items-center justify-between gap-8 border border-[var(--color-ink)] p-8 md:p-10">
          <div>
            <h2 className="h2">Показать на ваших данных</h2>
            <p className="mt-3 max-w-[52ch] text-[14px] text-[var(--color-mute)]">
              Пришлите десять вопросов, на которые сейчас отвечают вручную. Скажем, подходит ли пилот.
            </p>
          </div>
          <Link href="/pilot" className="btn btn-primary">
            Запросить пилот →
          </Link>
        </div>
      </section>
    </>
  );
}
