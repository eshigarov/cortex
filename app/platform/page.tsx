import Link from "next/link";

const layers = [
  {
    n: "01",
    title: "Онтология",
    lead: "Компания как система, а не папка с файлами",
    text: "Документы и таблицы становятся сущностями: люди, проекты, оборудование, контрагенты. У каждой — тип, ключ и связи. Дубли склеиваются.",
    gives: "единый язык подразделений",
  },
  {
    n: "02",
    title: "Память",
    lead: "Опыт остаётся в компании",
    text: "Агент помнит задачу, свои действия и то, что известно компании. Не начинает с нуля и может повторить ход мысли.",
    gives: "знания не уходят с сотрудником",
  },
  {
    n: "03",
    title: "Связи",
    lead: "Ответ находится обходом, а не совпадением слов",
    text: "Связи типизированы: кто с кем, что с чем, на каком основании. Вопрос «кто отвечает за пилот» решается по рёбрам графа.",
    gives: "ответ по делу, а не похожий абзац",
  },
  {
    n: "04",
    title: "Контур исполнения",
    lead: "Действие в рамках прав и регламента",
    text: "Инструменты, лимиты, остановка, откат внутри контура. Агент не выходит за границы своей роли.",
    gives: "агент делает, но не больше положенного",
  },
  {
    n: "05",
    title: "Отчётность",
    lead: "Каждое решение можно проверить",
    text: "Журнал: вопрос, источники, цепочка вывода, версия. Тот же вопрос даёт тот же ответ и те же ссылки.",
    gives: "основание для проверки",
  },
];

export default function PlatformPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">платформа</span>
          <h1 className="display mt-5 max-w-[18ch]">Пять слоёв, которые работают вместе</h1>
          <p className="mt-8 max-w-[56ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Память без онтологии превращается в свалку. Онтология без отчётности — в красивую схему,
            которую не пропустит ИБ. Ядро собирает слои так, чтобы вывод был объясним на каждом шаге.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="space-y-14">
          {layers.map((l) => (
            <article key={l.n} className="grid gap-8 border-t border-[var(--color-ink)] pt-8 md:grid-cols-[0.34fr_0.66fr]">
              <div>
                <div className="font-mono text-[12px] text-[var(--color-mute)]">{l.n}</div>
                <h2 className="h3 mt-3 text-[22px]">{l.title}</h2>
                <p className="mt-2 text-[13.5px] text-[var(--color-mute)]">{l.lead}</p>
              </div>
              <div>
                <p className="max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-ink)]/80">{l.text}</p>
                <p className="mt-4 border-t border-[var(--color-line)] pt-3 text-[12.5px] text-[var(--color-ink)]/70">
                  → {l.gives}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <span className="eyebrow">под капотом</span>
          <h2 className="h2 mt-4">Что уже работает</h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Postgres + pgvector", "хранение сущностей и векторов"],
              ["Четыре канала поиска", "смысл, точные слова, окончания, названия"],
              ["Слияние результатов", "один ранк вместо спора каналов"],
              ["Локальная модель", "данные не покидают контур"],
            ].map(([t, d]) => (
              <div key={t} className="bg-[var(--color-paper)] p-6">
                <div className="text-[15px] font-semibold">{t}</div>
                <div className="mt-2 text-[13px] text-[var(--color-mute)]">{d}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[12px] text-[var(--color-mute)]">
            Технические детали — для ИТ и ИБ. На пилоте показываем схему развёртывания и потоки данных.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="border border-[var(--color-line)] p-7 md:p-9">
          <div className="eyebrow">границы</div>
          <h2 className="h3 mt-4">Чего ядро не делает</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {[
              ["Не заменяет ERP и ECM", "Не пишет в ваши системы без интеграции и регламента."],
              ["Не даёт юридической силы", "Ответ — основание для решения, а не сам документ."],
              ["Не работает без доступа", "Если данных нет, ядро скажет, чего не хватает."],
              ["Нет аттестации и сертификатов", "Журнал помогает пройти проверку, но не заменяет её."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-[var(--color-line)] pt-4">
                <div className="text-[15px] font-semibold">{t}</div>
                <div className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-mute)]">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-[var(--color-ink)] p-8">
          <div>
            <h2 className="h3">Показать на вашем корпусе</h2>
            <p className="mt-2 text-[14px] text-[var(--color-mute)]">Две недели, десять вопросов, журнал решений.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Запросить пилот →</Link>
        </div>
      </section>
    </>
  );
}
