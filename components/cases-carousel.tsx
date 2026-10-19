"use client";

import { useEffect, useState } from "react";

const cases = [
  {
    domain: "Горно-металлургический комплекс",
    problem: "Планирование производственного процесса",
    solution: "Реинжиниринг западного ПО",
    scale: "15 функциональных блоков · 6 слоёв данных · единицы техники",
    result: "Прототип на реальных данных: расчёт до начала разработки",
  },
  {
    domain: "Горно-металлургический комплекс",
    problem: "Сменное планирование",
    solution: "Бизнес-постановка и прототип",
    scale: "производственные единицы · диспетчеры · смены",
    result: "Смена планируется до смены, а не по факту",
  },
  {
    domain: "Железнодорожная логистика",
    problem: "Решения диспетчера держатся на опыте",
    solution: "Описание правил и советчик",
    scale: "единицы подвижного состава · маршруты · документы",
    result: "Логика описана и передаётся, а не уходит с человеком",
  },
  {
    domain: "Металлургия · сделки",
    problem: "Знания об активах разрознены",
    solution: "Онтология активов и контрагентов",
    scale: "документы сделки · юрлица · контрагенты",
    result: "Картина активов и связей до начала интеграции",
  },
  {
    domain: "Энергетика",
    problem: "Режимы и регламенты в разных документах",
    solution: "Граф «объект → режим → документ»",
    scale: "объекты · регламенты · ответственные",
    result: "Ответ со ссылкой на пункт регламента",
  },
  {
    domain: "Финансы и страхование",
    problem: "Комплаенс требует основания",
    solution: "Журнал решений и цепочка источников",
    scale: "обращения · регламенты · проверки",
    result: "Ответ с цитатой и повтором для проверки",
  },
];

export function CasesCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % cases.length), 5200);
    return () => clearInterval(t);
  }, []);

  const c = cases[i];

  return (
    <div className="border border-[var(--color-line)]">
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-6 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-mute)]">
          пример {i + 1} из {cases.length}
        </span>
        <div className="flex gap-1.5">
          {cases.map((_, n) => (
            <button
              key={n}
              aria-label={`Пример ${n + 1}`}
              onClick={() => setI(n)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                n === i ? "bg-[var(--color-acid)]" : "bg-[var(--color-ink)]/20"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-px bg-[var(--color-line)] md:grid-cols-2">
        <div className="bg-[var(--color-paper)] p-7 md:p-9">
          <div className="eyebrow">{c.domain}</div>
          <h3 className="h3 mt-5 text-[24px] leading-tight">{c.problem}</h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-mute)]">{c.scale}</p>
        </div>
        <div className="bg-white p-7 md:p-9">
          <div className="eyebrow">решение</div>
          <p className="mt-4 text-[17px] font-medium leading-snug">{c.solution}</p>
          <div className="mt-6 border-t border-[var(--color-line)] pt-4">
            <div className="eyebrow mb-2">результат</div>
            <p className="text-[14px] leading-relaxed text-[var(--color-ink)]/80">{c.result}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)] px-6 py-4 text-[11px] leading-relaxed text-[var(--color-mute)]">
        Часть примеров — реализованные работы и типовые проекты. Названия компаний и систем
        не раскрываем: это условие работы с заказчиками.
      </div>
    </div>
  );
}
