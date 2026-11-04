import Link from "next/link";

const modules = [
  {
    n: "01",
    name: "Онтология",
    value: "Компания описана как система, а не как папка с файлами",
    text: "Документы и таблицы становятся сущностями: люди, проекты, оборудование, контрагенты. У каждой — тип, ключ и связи. Дубли склеиваются.",
  },
  {
    n: "02",
    name: "Поиск и ответы",
    value: "Ответ за секунды, со ссылкой на документ",
    text: "Смысл, точные слова, окончания и названия работают вместе. Ответ всегда с цитатой и источником.",
  },
  {
    n: "03",
    name: "Память и журнал",
    value: "Опыт остаётся в компании, решения можно повторить",
    text: "Агент помнит задачу, свои действия и то, что известно компании. Каждый вывод пишется в журнал: вопрос, источники, цепочка.",
  },
  {
    n: "04",
    name: "Агенты под роли",
    value: "У директора, инженера и сотрудника свой инструмент",
    text: "Один граф, разные рабочие места. Права наследуются от роли, доступ ограничен контуром.",
  },
  {
    n: "05",
    name: "Карта знаний",
    value: "Видно, как устроены знания компании",
    text: "Интерактивный граф: узлы по типам, связи, досье на сущность. Помогает найти разрывы и точки зависимости.",
  },
];

const layers = [
  { n: "01", title: "Онтология", text: "Сущности с типами и ключами. Дубли склеиваются, связи появляются сами." },
  { n: "02", title: "Память", text: "Задача, действия агента и знания компании. Не начинает с нуля." },
  { n: "03", title: "Связи", text: "Ответ находится обходом рёбер, а не совпадением слов." },
  { n: "04", title: "Контур исполнения", text: "Инструменты, лимиты, остановка. Действие в рамках прав." },
  { n: "05", title: "Отчётность", text: "Вопрос, источники, цепочка, версия. Решение можно повторить." },
];

const entities = [
  { type: "Передел", key: "stage_id", ex: "БВР, ЭКС, АС, обогащение" },
  { type: "Материал", key: "material_id", ex: "кварцит, скала, вскрыша, концентрат" },
  { type: "Оборудование", key: "asset_id", ex: "экскаватор, самосвал, мельница" },
  { type: "Проект", key: "project_id", ex: "сменное планирование" },
  { type: "Человек", key: "person_id", ex: "РП, диспетчер, инженер" },
  { type: "Организация", key: "org_id", ex: "заказчик, подрядчик, холдинг" },
  { type: "Документ", key: "doc_id", ex: "ТЗ, регламент, письмо" },
  { type: "Событие", key: "event_id", ex: "встреча, изменение плана" },
];

export default function CorePage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-32 md:pt-32">
          <span className="eyebrow">cortex core</span>
          <h1 className="display mt-5 max-w-[18ch]">Мозг компании в одном продукте</h1>
          <p className="mt-8 max-w-[56ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Cortex Core связывает знания компании, сохраняет опыт и объясняет решения.
            Пять модулей работают на одной модели данных.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/pilot" className="btn btn-primary">Обсудить пилот <span aria-hidden>→</span></Link>
            <a href="#platform" className="btn btn-ghost">Как устроено</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-mute)]">
            <a href="#modules" className="hover:text-[var(--color-ink)]">модули</a>
            <a href="#platform" className="hover:text-[var(--color-ink)]">платформа</a>
            <a href="#ontology" className="hover:text-[var(--color-ink)]">онтология</a>
          </div>
        </div>
      </section>

      <section id="modules" className="wrap py-24">
        <span className="eyebrow">модули</span>
        <h2 className="h2 mt-4 max-w-[22ch]">Пять частей одного ядра</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <article key={m.n} className="card p-7">
              <h3 className="h3 mt-5 text-[21px]">{m.name}</h3>
              <p className="mt-2 text-[13.5px] font-medium text-[var(--color-ink)]/75">{m.value}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-mute)]">{m.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="platform" className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">платформа</span>
          <h2 className="h2 mt-4 max-w-[22ch]">Пять слоёв, которые работают вместе</h2>
          <div className="mt-14 space-y-10">
            {layers.map((l) => (
              <div key={l.n} className="grid gap-6 border-t border-[var(--color-ink)] pt-6 md:grid-cols-[0.3fr_0.7fr]">
                <div>

                  <h3 className="mt-2 text-[19px] font-semibold">{l.title}</h3>
                </div>
                <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-[var(--color-ink)]/80">{l.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Postgres + pgvector", "сущности и векторы"],
              ["Четыре канала", "смысл, слова, окончания, названия"],
              ["Один ранк", "слияние результатов"],
              ["Локальная модель", "данные в контуре"],
            ].map(([t, d]) => (
              <div key={t} className="bg-[var(--color-paper)] p-5">
                <div className="text-[14px] font-semibold">{t}</div>
                <div className="mt-1 text-[12.5px] text-[var(--color-mute)]">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ontology" className="wrap py-24">
        <span className="eyebrow">онтология</span>
        <h2 className="h2 mt-4 max-w-[22ch]">Как компания описывает себя</h2>
        <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-[var(--color-ink)]/70">
          Онтология — это система организации знаний. Рабочая модель: какие сущности есть в компании,
          по какому ключу они склеиваются и как связаны между собой.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {entities.map((e) => (
            <article key={e.type} className="bg-[var(--color-paper)] p-5">
              <h3 className="text-[16px] font-semibold">{e.type}</h3>
              <div className="mt-1 font-mono text-[12px] text-[var(--color-acid-ink)]">{e.key}</div>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-mute)]">{e.ex}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[0.4fr_0.6fr]">
          <div className="eyebrow">как собирается</div>
          <p className="text-[14px] leading-relaxed text-[var(--color-ink)]/80">
            Данные → сущности → ключи → связи. Спорные типы подтверждает человек, ошибки видны
            как сироты и разрывы.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <span className="eyebrow">сборка</span>
        <h2 className="h2 mt-4 max-w-[22ch]">Как собирается онтология</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {[
            ["01", "Источники", "Файлы, базы, выгрузки. Смотрим, что есть и в каком виде."],
            ["02", "Сущности", "Выделяем людей, проекты, оборудование, контрагентов. Спорные типы подтверждает человек."],
            ["03", "Ключи", "Определяем, по чему склеивать. Дубли сводятся в одну запись."],
            ["04", "Связи", "Типизируем отношения. Видно, чего не хватает и где разрывы."],
          ].map(([n, t, d]) => (
            <div key={n} className="border-t border-[var(--color-ink)] pt-5">
              <h3 className="mt-3 text-[16px] font-semibold">{t}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-mute)]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <div className="border border-[var(--color-line)] p-7 md:p-9">
            <div className="eyebrow">границы</div>
            <h2 className="h3 mt-4">Чего Cortex Core не делает</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                ["Не заменяет ERP и ECM", "Не пишет в ваши системы без интеграции и регламента."],
                ["Не даёт юридической силы", "Ответ — основание для решения, а не сам документ."],
                ["Не работает без доступа", "Если данных нет, ядро скажет, чего не хватает."],
              ].map(([t, d]) => (
                <div key={t} className="border-t border-[var(--color-line)] pt-4">
                  <div className="text-[15px] font-semibold">{t}</div>
                  <div className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-mute)]">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-10 md:grid-cols-[0.34fr_0.66fr]">
          <div>
            <span className="eyebrow">интеграции</span>
          </div>
          <div>
            <h2 className="h2 max-w-[24ch]">Работает с тем, что у вас уже есть</h2>
            <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-ink)]/80">
              Практически с любым корпоративным ПО и базами данных: ERP, MES, ECM, 1С,
              файловые хранилища, SQL. Подключение — через штатные интерфейсы или выгрузки.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Показать на вашем корпусе</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Десять вопросов, журнал решений.</p>
          </div>
          <Link href="/pilot" className="btn btn-primary">Обсудить пилот →</Link>
        </div>
      </section>
    </>
  );
}
