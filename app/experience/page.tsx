import Link from "next/link";
import { CasesCarousel } from "@/components/cases-carousel";

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
          <h1 className="display mt-5 max-w-[19ch]">Проекты: проблема, решение, результат</h1>
          <p className="mt-8 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Шесть примеров из разных отраслей. Названия компаний и систем не раскрываем: это условие
            работы с заказчиками. Часть примеров — реализованные работы и типовые проекты.
          </p>
        </div>
      </section>

      <section className="wrap py-24">
        <CasesCarousel />
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-24">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <span className="eyebrow">типовые задачи</span>
              <h2 className="h2 mt-4 max-w-[22ch]">С чем приходят по отраслям</h2>
            </div>
            <p className="max-w-[40ch] text-[13.5px] leading-relaxed text-[var(--color-mute)]">
              Не обещания, а механика: какая проблема есть и что с ней делает ядро.
            </p>
          </div>

          <div className="mt-16 space-y-4">
            {industries.map((r) => (
              <article key={r.name} className="grid gap-6 border border-[var(--color-line)] p-7 md:grid-cols-[0.28fr_0.36fr_0.36fr]">
                <div>
                  <h3 className="text-[17px] font-semibold">{r.name}</h3>
                </div>
                <div>
                  <div className="eyebrow mb-2">проблема</div>
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
              ["Сколько вопросов закрыто", "из вашего списка: ответ найден / не найден / нужен человек"],
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
