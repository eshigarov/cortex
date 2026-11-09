import Link from "next/link";
import AnswerPath from "@/components/answer-path";
import { SCENARIOS } from "@/components/scenarios-data";

const layers = [
  {
    n: "01",
    title: "Онтология и модель данных",
    text: "Схема предметной области: какие типы сущностей существуют, оборудование, контрагенты, документы, проекты, решения, какие связи между ними допустимы и какие поля обязательны. Задаётся один раз на домен и переиспользуется всеми агентами; правила проверяются на входе, поэтому в модель не попадают записи без ключа, владельца и источника. Это не данные, а договор о том, как их читать.",
  },
  {
    n: "02",
    title: "Память агента",
    text: "Три горизонта: рабочая память держит текущую задачу и ограничения, эпизодическая хранит, что агент делал и как это повторить, семантическая, устойчивые факты о предмете. Память привязана к сущностям онтологии, а не к диалогу, поэтому новый запуск продолжает работу, а не начинает её заново. Доступ к памяти разграничен по роли: агент помнит своё и не читает чужое.",
  },
  {
    n: "03",
    title: "Граф знаний",
    text: "Экземпляры онтологии на данных компании: конкретная дробилка, конкретный простой, конкретный регламент, связанные типизированными связями с источником и датой. Ответ строится обходом графа, поэтому у вывода есть путь, что смотрели, что исключили и на каком основании. В отличие от онтологии, граф меняется каждый день: это состояние, а не схема.",
  },
  {
    n: "04",
    title: "Контур исполнения",
    text: "Агент действует только через выданные инструменты и в пределах мандата: что можно читать, что менять, какие лимиты и когда остановиться. Права выдаются на задачу и не расширяются по ходу; откат возвращает состояние внутри контура, но не отменяет записей во внешних системах, 1С, ERP, почте. Действия фиксируются до выполнения, а не после.",
  },
  {
    n: "05",
    title: "Журнал решений",
    text: "Каждый эпизод фиксируется целиком: вопрос, версия онтологии и данных, источники, цепочка вывода, вызванные инструменты и результат. По журналу решение можно воспроизвести через месяц, объяснить проверяющему и сверить с фактом. Это же основание для разбора ошибок: видно, где именно разошлось, в данных, в связях или в правилах.",
  },
];



const layerGives: Record<string, string> = {
  "01": "единый справочник объектов вместо папок и таблиц",
  "02": "агент не спрашивает одно и то же дважды",
  "03": "у каждого вывода есть путь по связям",
  "04": "действие в рамках выданных прав",
  "05": "решение можно объяснить и повторить",
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="wrap relative pb-20 pt-16 md:pb-28 md:pt-24">
          <h1 className="display max-w-[18ch]">
            Решения, которые можно проверить
          </h1>

          <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-[var(--color-paper)]/70">
            Онтология предметной области, память и журнал решений, то, чего не хватает
            ИИ-агенту в корпоративных системах. Cortex Core собирает это из ваших данных:
            связывает объекты, помнит прошлые действия агента и показывает, на чём основан вывод.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/pilot" className="btn btn-acid">
              Обсудить пилот <span aria-hidden>→</span>
            </Link>
            <Link
              href="/core"
              className="btn border border-white/25 text-[var(--color-paper)] hover:bg-white/10"
            >
              Как устроено
            </Link>
          </div>

        </div>
      </section>

      {/* ПРОБЛЕМА */}
      <section className="wrap py-24">
        <h2 className="h2 mt-4 max-w-[24ch]">Данные есть. Знаний нет.</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Знания есть, доступа нет",
              d: "Эксперт помнит, почему останавливали участок в марте, но не может это доказать, а новый сотрудник восстанавливает контекст неделями. Агент в такой компании каждый запуск начинает с нуля: у него нет ни связей между объектами, ни истории решений, и он переспрашивает то, что люди уже знают.",
            },
            {
              t: "Ответ без основания",
              d: "Человеку приходится верить выводу на слово: не видно, из каких документов он собран и нет ли в источниках противоречий. Агент опирается на близость формулировок и потому уверенно смешивает устаревшую версию с действующей.",
            },
            {
              t: "Опыт не накапливается",
              d: "Решение приняли, обсудили в почте и забыли: через полгода никто не скажет, на каком основании. Агент не видит прошлых решений и предлагает то, что уже отвергли,, люди тратят время на повторный разбор.",
            },
          ].map((i) => (
            <div key={i.t} className="border-t border-[var(--color-ink)] pt-5">
              <h3 className="h3">{i.t}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-mute)]">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ПУТЬ ОТВЕТА */}
      <section id="answer-path" className="py-24">
        <div className="wrap">
          <h2 className="h2 mt-4 max-w-[26ch]">Путь ответа: от вопроса до решения</h2>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-[var(--color-mute)]">
            Ответ собирается по связям, а не по похожести текста: объект, событие, показатель,
            решение, автор и основание. Каждый шаг можно проверить.
          </p>
        </div>
        <AnswerPath />
      </section>

      {/* СЛОИ */}
      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <h2 className="h2 mt-4 max-w-[22ch]">Состав решения</h2>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-mute)]">
            Онтология задаёт, что бывает и как связано; граф, что есть у вас фактически. Остальные три слоя
            делают работу агента непрерывной, управляемой и объяснимой.
          </p>
          <div className="mt-14 space-y-10">
            {layers.map((l) => (
              <div key={l.n} className="grid gap-6 border-t border-[var(--color-line)] pt-6 md:grid-cols-[0.28fr_0.72fr]">
                <div className="flex items-baseline gap-4">

                  <h3 className="text-[19px] font-semibold">{l.title}</h3>
                </div>
                <div>
                  <p className="max-w-[64ch] text-[14.5px] leading-relaxed text-[var(--color-ink)]/80">{l.text}</p>
                  <div className="mt-2 text-[12.5px] text-[var(--color-acid-ink)]">{layerGives[l.n]}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/core" className="btn btn-ghost mt-12 border border-[var(--color-line)]">
            Как устроено подробно →
          </Link>
        </div>
      </section>

      {/* СВОЙСТВА */}
      <section className="wrap py-24">
        <h2 className="h2 mt-4 max-w-[24ch]">Проверяемость, непрерывность, права</h2>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-mute)]">
          Три свойства, которые отличают работу с ядром от поиска по документам. Не «лучше», другой уровень
          ответственности за ответ.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Проверяемость",
              without: "Ответ приходит фрагментами: видно похожие абзацы, но не видно, как из них собран вывод.",
              with: "Путь по связям и журнал: источники, цепочка, версия модели и данных. Вывод можно объяснить и повторить.",
            },
            {
              t: "Непрерывность",
              without: "Каждый запрос начинается с нуля: состояние задачи и прошлые действия агента не сохраняются.",
              with: "Память трёх горизонтов и история решений по объекту: агент продолжает работу, а не переспрашивает.",
            },
            {
              t: "Права",
              without: "Доступ ограничивают на уровне документа или индекса, целиком.",
              with: "Права на сущности и роли проверяются при обходе: агент видит только разрешённое и действует в мандате задачи.",
            },
          ].map((i) => (
            <div key={i.t} className="border-t border-[var(--color-ink)] pt-5">
              <h3 className="h3">{i.t}</h3>
              <p className="mt-4 font-mono text-[12px] text-[var(--color-mute)]">без ядра</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-mute)]">{i.without}</p>
              <p className="mt-4 font-mono text-[12px] text-[var(--color-acid-ink)]">с ядром</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-ink)]/85">{i.with}</p>
            </div>
          ))}
        </div>
      </section>

      {/* РЕЗУЛЬТАТЫ */}
      <section className="border-t border-[var(--color-line)] bg-white/40 py-24">
        <div className="wrap">
          <h2 className="h2 mt-4 max-w-[24ch]">Что меняется в работе</h2>
          <p className="mt-6 max-w-[66ch] text-[14px] leading-relaxed text-[var(--color-mute)]">
            Десять отраслей: что было до и что остаётся после. Цифры, расчёт при указанном объёме,
            в пилоте фиксируем ваш факт.
          </p>
        </div>

        <div className="marquee mt-12 px-4 sm:px-0">
          <div className="marquee-track">
            {[...SCENARIOS, ...SCENARIOS].map((s, i) => (
              <article key={s.process + i} className="card flex w-[min(380px,calc(100vw-32px))] shrink-0 flex-col p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-mute)]">{s.sector}</span>
                  <span className="text-[12px] font-medium text-[var(--color-acid-ink)]">{s.pct}</span>
                </div>
                <h3 className="mt-2 text-[16.5px] font-semibold">{s.process}</h3>
                <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-[var(--color-mute)]">{s.pain}</p>
                <div className="mt-4 flex flex-wrap items-baseline gap-2">
                  <span className="text-[13px] text-[var(--color-mute)]">{s.from}</span>
                  <span className="text-[12px] text-[var(--color-mute)]">→</span>
                  <span className="text-[26px] font-semibold leading-none text-[var(--color-acid-ink)]">{s.to}</span>
                </div>
                <div className="mt-2 text-[13px] font-medium">{s.gain}</div>
                <div className="mt-auto pt-4 text-[11.5px] leading-relaxed text-[var(--color-mute)]">
                  <span className="font-mono uppercase tracking-[0.1em]">связи</span> · {s.entities}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="wrap mt-10">
          <p className="max-w-[70ch] text-[12px] leading-relaxed text-[var(--color-mute)]">
            Эффект, проектный ориентир, а не результат завершённого внедрения: в пилоте фиксируем исходные значения и итог. Ниже на Главной, только бриф, подробности по каждому домену на отдельной странице.
          </p>
          <Link href="/scenarios" className="mt-4 inline-block text-[13.5px] underline decoration-[var(--color-line)] underline-offset-4 hover:decoration-[var(--color-ink)]">
            Подробно по сценариям →
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
            Обсудить пилот →
          </Link>
        </div>
      </section>
    </>
  );
}
