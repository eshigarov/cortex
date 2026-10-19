import Link from "next/link";

const modules = [
  {
    n: "01",
    name: "Онтология",
    value: "Компания описана как система, а не как папка с файлами",
    text: "Документы и таблицы превращаются в сущности: люди, проекты, оборудование, контрагенты, документы. У каждой — тип, ключ и связи. Дубли склеиваются, повторы не плодятся.",
    gives: ["единый язык подразделений", "ответы по связям, а не по словам", "видно, чего не хватает"],
  },
  {
    n: "02",
    name: "Поиск и ответы",
    value: "Ответ за секунды — со ссылкой на документ",
    text: "Четыре канала поиска работают вместе: смысл, точные слова, окончания, названия. Ответ всегда с цитатой и источником — его можно проверить, а не принимать на веру.",
    gives: ["ответ с основанием", "быстрее, чем искать руками", "видно, откуда факт"],
  },
  {
    n: "03",
    name: "Память и журнал",
    value: "Опыт остаётся в компании, решения можно повторить",
    text: "Агент помнит задачу, свои действия и то, что известно компании. Каждый вывод пишется в журнал: вопрос, источники, цепочка, версия. Любой эпизод повторяется по команде.",
    gives: ["знания не уходят с сотрудником", "решение можно объяснить", "проверка видит основание"],
  },
  {
    n: "04",
    name: "Агенты под роли",
    value: "У директора, инженера и сотрудника — свой рабочий инструмент",
    text: "Один граф, разные рабочие места. Агент руководителя собирает картину и отклонения, агент инженера отвечает по регламентам, агент на месте принимает заявки. Права наследуются от роли.",
    gives: ["каждому — своё", "один источник правды", "доступ по роли"],
  },
  {
    n: "05",
    name: "Карта знаний",
    value: "Видно, как устроены знания компании",
    text: "Интерактивный граф: узлы по типам, связи, досье на сущность, переход по связям. Помогает найти разрывы и понять, где знания держатся на одном человеке.",
    gives: ["структура вместо отчёта", "видны сироты и разрывы", "навигация по связям"],
  },
];

export default function CorePage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">cortex core</span>
          <h1 className="display mt-5 max-w-[18ch]">Мозг компании в одном продукте</h1>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Cortex Core связывает знания компании, сохраняет опыт и объясняет решения.
            Пять модулей работают на одной модели данных. Что нужно именно вам, определяем на проекте.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Запросить пилот <span aria-hidden>→</span></Link>
            <Link href="/platform" className="btn btn-ghost">Как устроено</Link>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="space-y-8">
          {modules.map((m) => (
            <article key={m.n} className="grid gap-10 border border-[var(--color-line)] p-8 md:p-10 lg:grid-cols-[0.48fr_0.52fr]">
              <div>
                <div className="font-mono text-[12px] text-[var(--color-mute)]">{m.n}</div>
                <h2 className="h3 mt-5 text-[27px]">{m.name}</h2>
                <p className="mt-3 text-[14.5px] font-medium leading-snug text-[var(--color-ink)]/80">{m.value}</p>
                <p className="mt-4 max-w-[54ch] text-[14px] leading-relaxed text-[var(--color-mute)]">{m.text}</p>
              </div>
              <div className="border-t border-[var(--color-line)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="eyebrow mb-4">что это даёт</div>
                <ul className="space-y-3">
                  {m.gives.map((g) => (
                    <li key={g} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--color-ink)]/80">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-acid)]" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <div className="grid gap-12 md:grid-cols-[0.4fr_0.6fr]">
            <div>
              <span className="eyebrow">как это работает</span>
              <h2 className="h2 mt-4">От документов до ответа</h2>
            </div>
            <div className="space-y-6">
              {[
                ["Данные остаются у вас", "Ядро разворачивается в контуре заказчика. Корпус, граф и журнал не покидают вашу инфраструктуру."],
                ["Модель — локальная", "Обработка идёт локальной моделью; при необходимости подключается ваша. Данные в облако не уходят."],
                ["Права по роли", "Каждый агент действует в пределах прав своего владельца и своего контура."],
                ["Результат проверяем", "Ответ, источники и цепочка сохраняются. Тот же вопрос даёт тот же ответ и те же ссылки."],
              ].map(([t, d]) => (
                <div key={t} className="border-t border-[var(--color-line)] pt-4">
                  <div className="text-[15px] font-semibold">{t}</div>
                  <div className="mt-1 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="border border-[var(--color-line)] p-7 md:p-9">
          <div className="eyebrow">с чего начать</div>
          <h2 className="h3 mt-4">Пилот на ваших данных</h2>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-[var(--color-mute)]">
            Две недели. Загружаем корпус, собираем граф, отвечаем на десять ваших вопросов.
            В конце: замеры и журнал, что сработало и что нет. Пилот платный, фиксированная сумма.
            Первым 2–3 компаниям бесплатно в обмен на право описать сценарий.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">Запросить пилот →</Link>
        </div>
      </section>
    </>
  );
}
