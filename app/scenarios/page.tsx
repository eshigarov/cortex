import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сценарии применения Cortex",
  description:
    "Шесть типовых сценариев: логистика, лизинг, проектирование, металлургия, энергетика, нефтегаз. Задача, механика и что измерим в пилоте.",
};

const scenarios = [
  {
    sector: "Логистика",
    segment: "Средний бизнес",
    pain: "Ответ на претензию собирают из рейса, накладной, акта и фото вручную. Пакет бывает неполным, часть претензий закрывается без взыскания.",
    entities: "рейс, транспорт, водитель, накладная, акт, фото, претензия",
    mech: "Агент собирает доказательства по рейсу, сверяет вес и даты, находит расхождения и готовит проект ответа со ссылками на документы.",
    effect: "40 минут вместо 4 часов",
    measure: "время сборки пакета, доля полных пакетов, число найденных расхождений",
  },
  {
    sector: "Лизинг",
    segment: "Средний бизнес",
    pain: "Досье приходит неполным, комплект документов проверяют вручную, риск-факторы разбросаны по системам.",
    entities: "заявка, контрагент, предмет лизинга, документ, риск-фактор",
    mech: "Агент проверяет комплект по вашей политике, сверяет данные документов с карточкой контрагента, отмечает расхождения и готовит резюме для комитета.",
    effect: "1 день вместо 3",
    measure: "время проверки комплекта, сколько неполных досье найдено до комитета",
  },
  {
    sector: "Проектирование",
    segment: "Средний бизнес",
    pain: "Проект возвращают 3–4 раза: замечания в разных форматах, часть повторяет прошлые, связь с листом чертежа теряется.",
    entities: "проект, раздел, лист, версия, требование нормы, замечание",
    mech: "Агент привязывает замечание к листу, версии и пункту нормы, помечает повторные, собирает чек-лист исправлений и ответ эксперту.",
    effect: "7 дней вместо 12",
    measure: "число повторных замечаний, время сборки ответа эксперту",
  },
  {
    sector: "Металлургия",
    segment: "ДЗО / крупный",
    pain: "Сводку по простоям собирают вручную из нескольких систем и журналов. Причины теряются, спор между переделами ничем не заканчивается.",
    entities: "передел, агрегат, партия, наряд, заявка на ремонт",
    mech: "Агент склеивает дубли, относит причину к типу и даёт сводку со ссылкой на первичную запись. Причину подтверждает человек.",
    effect: "15 минут вместо 2 часов",
    measure: "время подготовки сводки до и после, сколько причин найдено со ссылкой",
  },
  {
    sector: "Энергетика",
    segment: "ДЗО / крупный",
    pain: "Техусловия готовят 10 дней, комплект проверяют вручную, часть заявок возвращается на доработку.",
    entities: "объект, точка подключения, договор, техусловия, требование регламента",
    mech: "Агент проверяет комплект по пунктам регламента, готовит проект ТУ и показывает заявителю конкретную нехватку.",
    effect: "3 дня вместо 10",
    measure: "срок подготовки, число возвратов на доработку",
  },
  {
    sector: "Нефтегаз",
    segment: "Крупный",
    pain: "Наряд-допуск согласуют 3 дня: удостоверения, квалификацию и пересечения работ проверяют вручную.",
    entities: "объект, работа, наряд, подрядчик, сотрудник, удостоверение",
    mech: "Агент проверяет допуск, видит наложение работ в одной зоне, собирает пакет и следит за сроками действия.",
    effect: "4 часа вместо 3 дней",
    measure: "время согласования, число найденных наложений и просроченных допусков",
  },
];

export default function ScenariosPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="wrap pb-20 pt-20 md:pb-28 md:pt-28">
          <span className="eyebrow">сценарии</span>
          <h1 className="display mt-5 max-w-[18ch]">Это сценарии, не внедрения</h1>
          <p className="mt-8 max-w-[62ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Задача и механика. Результатов не публикуем: завершённых внедрений у нас нет.
            Показываем, что измерим в пилоте. Ориентиры эффекта — из похожих проектов, не наши результаты.
          </p>
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {scenarios.map((s) => (
            <article key={s.sector} className="border border-[var(--color-line)] p-7 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[20px] font-semibold">{s.sector}</h2>
                <span className="rounded-full border border-[var(--color-line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-mute)]">
                  {s.segment}
                </span>
              </div>

              <p className="mt-4 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{s.pain}</p>

              <div className="mt-5 border-t border-[var(--color-line)] pt-4">
                <div className="eyebrow">что связали</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-ink)]/80">{s.entities}</p>
              </div>

              <div className="mt-4">
                <div className="eyebrow">что делает агент</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-ink)]/80">{s.mech}</p>
              </div>

              <div className="mt-5 border-t border-[var(--color-line)] pt-4">
                <div className="text-[16px] font-semibold text-[var(--color-acid)]">{s.effect}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-[var(--color-mute)]">
                  ориентир · в пилоте измерим: {s.measure}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white/40">
        <div className="wrap py-20">
          <div className="flex flex-wrap items-center justify-between gap-8 border border-[var(--color-ink)] p-8">
            <div>
              <h2 className="h3">Ваш случай не похож ни на один?</h2>
              <p className="mt-2 max-w-[52ch] text-[14px] text-[var(--color-mute)]">
                Пришлите десять своих вопросов. По ним видно, есть ли что связывать.
              </p>
            </div>
            <Link href="/pilot" className="btn btn-primary">
              Запросить пилот →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
