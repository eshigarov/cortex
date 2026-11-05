import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пилот Cortex на ваших данных",
  description:
    "Десять ваших вопросов, журнал решений. Что входит, что нужно от вас и как фиксируем условия.",
};

const included = [
  {
    t: "Граф на ваших данных",
    d: "Сущности, связи, узлы без связей. Видно, чего в данных не хватает и где знания держатся на одном человеке.",
  },
  {
    t: "Ответы на десять ваших вопросов",
    d: "Список вы даёте до старта. Отметку «верно / неверно / не найдено» ставите вы. Не демо — проверка.",
  },
  {
    t: "Замер",
    d: "Время ответа на ваших запросах, доля вопросов с найденным ответом, места, где упёрлись в качество данных.",
  },
  {
    t: "Письменный итог",
    d: "Что работает, что доработать, что не получится. Даже если вывод — не идти.",
  },
];

const need = [
  "Десять вопросов, на которые сейчас отвечают вручную или долго ищут ответ.",
  "Корпус документов: регламенты, проектная документация, переписка, справочники.",
  "Один человек с вашей стороны, который знает, где лежат данные.",
  "Режим развёртывания: ваш контур или изолированная среда на время пилота.",
];

const timeline = [
  { d: "День 1–2", t: "Согласуем вопросы, доступ и режим развёртывания" },
  { d: "День 3–7", t: "Собираем онтологию и граф на вашем корпусе" },
  { d: "День 8–12", t: "Прогоняем ваши вопросы, правим типы и связи" },
  { d: "День 13–14", t: "Замер, журнал, письменный итог и разбор" },
];

export default function PilotPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap grid gap-14 pb-20 pt-20 md:grid-cols-[1.05fr_0.95fr] md:pb-28 md:pt-28">
          <div>
            <span className="eyebrow">пилот</span>
            <h1 className="display mt-5 max-w-[15ch]">Пилот на ваших данных</h1>
            <p className="mt-8 max-w-[52ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
              Две недели. Загружаем корпус, собираем граф, отвечаем на десять ваших вопросов.
              В конце — замеры, журнал решений и письменный итог.
            </p>
            <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-[var(--color-mute)]">
              Это ранний продукт: завершённых внедрений у нас нет. Поэтому пилот короткий,
              с фиксированной суммой, и итог пишем честно — включая то, что не получилось.
            </p>

            <div className="mt-10 space-y-5 border-t border-[var(--color-line)] pt-6 text-[14px]">
              <div>
                <div className="eyebrow mb-1">почта</div>
                <a
                  className="underline decoration-[var(--color-acid)] decoration-2 underline-offset-4"
                  href="mailto:hello@cortex.ai"
                >
                  hello@cortex.ai
                </a>
              </div>
              <div>
                <div className="eyebrow mb-1">что прислать в первом письме</div>
                <p className="max-w-[46ch] text-[var(--color-mute)]">
                  Отрасль, объём документов, где они лежат, и один вопрос, на который сейчас
                  долго ищете ответ.
                </p>
              </div>
              <div>
                <div className="eyebrow mb-1">что обсудим на первом звонке</div>
                <p className="max-w-[46ch] text-[var(--color-mute)]">
                  Подходит ли пилот, что нужно от ИТ и ИБ, в каком контуре работаем.
                </p>
              </div>
            </div>
          </div>

          <form className="border border-[var(--color-line)] bg-white/40 p-7 md:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow">имя</span>
                <input
                  className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label className="block">
                <span className="eyebrow">компания</span>
                <input
                  className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                  placeholder="Название"
                />
              </label>
              <label className="block">
                <span className="eyebrow">почта</span>
                <input
                  type="email"
                  className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                  placeholder="name@company.ru"
                />
              </label>
              <label className="block">
                <span className="eyebrow">отрасль</span>
                <input
                  className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                  placeholder="ГМК, энергетика, логистика"
                />
              </label>
            </div>

            <label className="mt-6 block">
              <span className="eyebrow">задача</span>
              <textarea
                rows={4}
                className="mt-2 w-full resize-none border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                placeholder="Что сейчас ищете долго или не можете найти вовсе"
              />
            </label>

            <button type="button" className="btn btn-primary mt-7 w-full justify-center">
              Отправить запрос <span aria-hidden>→</span>
            </button>
            <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--color-mute)]">
              Или напишите на{" "}
              <a href="mailto:hello@cortex.ai" className="underline">hello@cortex.ai</a>.
            </p>
          </form>
        </div>
      </section>

      <section id="what" className="wrap py-20 md:py-24">
        <span className="eyebrow">что входит</span>
        <h2 className="h2 mt-4 max-w-[24ch]">Что вы получите</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {included.map((i) => (
            <div key={i.t} className="border border-[var(--color-line)] p-7">
              <h3 className="text-[17px] font-semibold">{i.t}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap grid gap-14 py-20 md:grid-cols-2 md:py-24">
          <div>
            <span className="eyebrow">от вас</span>
            <h2 className="h2 mt-4">Что нужно с вашей стороны</h2>
            <ul className="mt-8 space-y-4">
              {need.map((n) => (
                <li key={n} className="flex gap-3 border-t border-[var(--color-line)] pt-4 text-[14px] leading-relaxed text-[var(--color-ink)]/80">
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-acid)]" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">как идёт</span>
            <h2 className="h2 mt-4">Как идёт работа</h2>
            <div className="mt-8 space-y-4">
              {timeline.map((s) => (
                <div key={s.d} className="grid gap-2 border-t border-[var(--color-line)] pt-4 md:grid-cols-[0.3fr_0.7fr]">
                  <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-mute)]">{s.d}</div>
                  <div className="text-[14px] leading-relaxed text-[var(--color-ink)]/85">{s.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-20">
          <span className="eyebrow">границы</span>
          <h2 className="h2 mt-4 max-w-[22ch]">Что в пилот не входит</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Дообучение моделей", "Пилот работает на готовой модели. Дообучение на ваших данных — отдельный проект."],
              ["Запись в ваши системы", "Ядро читает источники. Запись и изменения в ERP, MES или ECM — отдельная интеграция."],
              ["Промышленная нагрузка", "Пилот не рассчитан на круглосуточную нагрузку и гарантии по срокам реакции. Это следующий этап."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-[var(--color-line)] pt-5">
                <h3 className="text-[16px] font-semibold">{t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-mute)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-20">
        <div className="border border-[var(--color-ink)] p-8 md:p-10">
          <h2 className="h2">Стоимость и условия</h2>
          <p className="mt-4 max-w-[60ch] text-[14.5px] leading-relaxed text-[var(--color-mute)]">
            Сумма фиксированная и зависит от объёма корпуса и режима развёртывания.
            Состав работ, сроки и стоимость фиксируем письменно до старта — без «уточним по ходу».
          </p>
          <a href="mailto:hello@cortex.ai" className="btn btn-primary mt-8">
            Написать нам →
          </a>
        </div>
      </section>
    </>
  );
}
