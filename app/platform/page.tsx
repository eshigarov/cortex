import Link from "next/link";

const layers = [
  {
    n: "01",
    title: "Онтология (схема сущностей)",
    lead: "Схема мира, а не папка с файлами",
    text: "Ядро читает таблицы и документы и выводит сущности: клиент, проект, человек, оборудование, контрагент. У каждой — тип, ключ и поля. Дубли склеиваются, повторы не плодятся.",
    bullets: ["автоматическое определение ключей", "типы и справочники", "дедупликация сущностей", "описания из данных; ошибки разбора видны как сироты и разрывы"],
  },
  {
    n: "02",
    title: "Память (три горизонта)",
    lead: "Три горизонта, а не один контекст",
    text: "Рабочая память держит задачу. Эпизодическая хранит, что агент делал и чем закончилось. Семантическая — всё, что известно. Без второй агент не учится на своих действиях; без первой не тянет длинную задачу.",
    bullets: ["контекст задачи", "журнал действий и повторов", "накопленные знания", "воспроизводимость ответа"],
  },
  {
    n: "03",
    title: "Граф знаний (связи)",
    lead: "Связи, которые можно объяснить",
    text: "Рёбра типизированы: «ссылается», «отвечает за», «входит в». Вопрос «кто отвечает за пилот» решается обходом, а не сходством слов. Висячие связи выявляются и сшиваются.",
    bullets: ["типизированные связи", "обход в один-два шага", "поиск сирот и разрывов", "два источника раздельно"],
  },
  {
    n: "04",
    title: "Контур исполнения (харнес)",
    lead: "Действие под регламентом",
    text: "Агент не просто отвечает — он выполняет шаги: инструменты, проверки, лимиты, остановка. Каждое действие проходит гейт, результат фиксируется.",
    bullets: ["инструменты и вызовы", "лимиты и бюджеты", "откат действий внутри контура — не во внешних системах", "остановка по условию"],
  },
  {
    n: "05",
    title: "Отчётность (журнал)",
    lead: "То, что принимает служба безопасности",
    text: "На каждый ответ — источник, цитата, цепочка ранжирования и запись в журнал. Тот же вопрос даёт тот же ответ и те же ссылки. Это журнал, по которому можно провести проверку; сертификата соответствия у нас нет.",
    bullets: ["цитата и документ", "цепочка «почему сюда»", "журнал эпизодов", "повтор по команде"],
  },
];

export default function PlatformPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-24 pt-24 md:pb-36 md:pt-36">
          <span className="eyebrow">платформа</span>
          <h1 className="display mt-5 max-w-[18ch]">Пять слоёв, которые работают только вместе</h1>
          <p className="mt-7 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Можно взять память без онтологии — получится свалка эмбеддингов. Можно онтологию без отчётности —
            получится красивая схема, которую не пропустит ИБ. Cortex собирает слои так, чтобы вывод был
            объясним на каждом шаге.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="space-y-24">
          {layers.map((l) => (
            <article key={l.n} className="grid gap-8 border-t border-[var(--color-ink)] pt-8 md:grid-cols-[0.35fr_0.65fr]">
              <div>
                <div className="font-mono text-[12px] text-[var(--color-mute)]">{l.n}</div>
                <h2 className="h3 mt-3 text-[22px]">{l.title}</h2>
                <p className="mt-2 text-[13.5px] text-[var(--color-mute)]">{l.lead}</p>
              </div>
              <div>
                <p className="max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-ink)]/80">{l.text}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {l.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13.5px] text-[var(--color-mute)]">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-acid)]" />
                      {b}
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
          <span className="eyebrow">под капотом</span>
          <h2 className="h2 mt-4">Что уже построено и измерено</h2>
          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Postgres + pgvector", "хранение сущностей и векторов"],
              ["4 канала поиска", "вектор, полнотекст, триграммы, точные вхождения"],
              ["RRF-слияние", "один ранк вместо спора каналов"],
              ["Локальная модель", "данные не покидают контур"],
            ].map(([t, d]) => (
              <div key={t} className="bg-[var(--color-paper)] p-6">
                <div className="text-[15px] font-semibold">{t}</div>
                <div className="mt-2 text-[13px] text-[var(--color-mute)]">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-24">
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
