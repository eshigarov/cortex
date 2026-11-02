import Link from "next/link";

const directions = [
  {
    n: "01",
    title: "Автоматизация",
    lead: "Знания и решения переходят в систему",
    problem: "Данные есть, но решения принимаются вручную: сводки собирают люди, ответы ищут по папкам и почте.",
    what: "Собираем ядро на ваших данных, подключаем агентов к рабочим задачам, разворачиваем в вашем контуре.",
    result: "Ответ со ссылкой на документ за секунды. Сводка и заявка не расходятся, потому что считаются из одного графа.",
    term: "пилот, затем внедрение 4–8 недель",
  },
  {
    n: "02",
    title: "Реинжиниринг ПО",
    lead: "Старая система перестаёт быть чёрным ящиком",
    problem: "Процесс держится на legacy-системе. Логика нигде не описана, документация устарела, а человек, который её понимал, ушёл. Любое изменение — риск.",
    what: "Разбираем данные и фактическое поведение системы, собираем карту сущностей и правил, сверяем с историческими данными и фиксируем расхождения.",
    result: "На выходе — описанная модель, список расхождений и план переноса. Правила видны до начала замены, перенос идёт по фактам, а не по презентации вендора.",
    term: "от 6 недель, зависит от контура",
  },
  {
    n: "03",
    title: "Операционная эффективность",
    lead: "Сначала находим потери, потом автоматизируем",
    problem: "Непонятно, где теряется время и деньги. Автоматизировать всё подряд дорого и бессмысленно.",
    what: "Разбираем процессы, считаем потери в часах и деньгах заказчика, расставляем приоритеты.",
    result: "Понятно, что автоматизировать первым. Результат сразу становится техническим заданием.",
    term: "2–6 недель",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">решения</span>
          <h1 className="display mt-5 max-w-[19ch]">Три способа навести порядок в знаниях</h1>
          <p className="mt-8 max-w-[56ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Можно построить систему, можно заменить старую, можно сначала найти потери.
            Второе и третье работают и отдельно, и как часть первого.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="space-y-8">
          {directions.map((d) => (
            <article key={d.n} className="grid gap-10 border border-[var(--color-line)] p-8 md:p-10 lg:grid-cols-[0.46fr_0.54fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] text-[var(--color-mute)]">{d.n}</span>
                </div>
                <h2 className="h3 mt-5 text-[28px]">{d.title}</h2>
                <p className="mt-2 text-[14.5px] font-medium text-[var(--color-ink)]/75">{d.lead}</p>
                <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-mute)]">{d.term}</div>
              </div>
              <div className="grid gap-6 border-t border-[var(--color-line)] pt-6 sm:grid-cols-3 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div>
                  <div className="eyebrow mb-2">проблема</div>
                  <p className="text-[13.5px] leading-relaxed text-[var(--color-mute)]">{d.problem}</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">что делаем</div>
                  <p className="text-[13.5px] leading-relaxed text-[var(--color-ink)]/80">{d.what}</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">результат</div>
                  <p className="text-[13.5px] leading-relaxed text-[var(--color-ink)]">{d.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">как идёт работа</span>
          <h2 className="h2 mt-4 max-w-[24ch]">Одинаково для любого направления</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              ["01", "Разбираемся", "Смотрим данные, процессы и системы. Считаем объём и потери."],
              ["02", "Проверяем", "На вашем корпусе: десять вопросов и замеры."],
              ["03", "Внедряем", "Разворачиваем в контуре, подключаем источники, настраиваем права."],
              ["04", "Остаёмся рядом", "Обновляем онтологию, разбираем ошибки, расширяем сценарии."],
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
              "Не обещаем окупаемость в конкретный срок: её считает заказчик по своим ставкам.",
              "Не заменяем ERP и ECM: ядро работает поверх данных.",
              "Не гарантируем стопроцентную точность разбора: ошибки видны и исправляются.",
              "Не заменяем вашу службу безопасности: даём журнал и локальный контур.",
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
            <p className="mt-2 max-w-[52ch] text-[14px] text-[var(--color-mute)]">
              Если неясно, где потери, начинаем с консалтинга. Если система есть, с реинжиниринга.
              Если данных много, а порядка нет, с автоматизации.
            </p>
          </div>
          <Link href="/pilot" className="btn btn-primary">Обсудить →</Link>
        </div>
      </section>
    </>
  );
}
