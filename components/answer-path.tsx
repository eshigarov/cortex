"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type NodeType =
  | "Asset" | "Unit" | "Org" | "Event" | "Metric"
  | "Document" | "Person" | "Role" | "Decision" | "Work" | "Part";

type TreeNode = { id: string; label: string; type: NodeType; children?: TreeNode[] };
type Step = { node: string; caption: string; relation?: string };
type Example = {
  id: string; domain: string; question: string;
  tree: TreeNode; path: string[]; rel: Record<string, string>; steps: Step[];
};

const EXAMPLES: Example[] = [
  {
    id: "mining",
    domain: "Производство",
    question: "Почему выросли простои на дробилке?",
    path: ["root", "stop", "metric", "decision", "person", "reg"],
    rel: { stop: "простой", metric: "измеряет", decision: "основание", person: "принято", reg: "регламентирует" },
    steps: [
      { node: "root", caption: "Вопрос касается дробилки КМД-2200" },
      { node: "stop", caption: "Событие 04.10: простой 6 часов", relation: "простой" },
      { node: "metric", caption: "Показатель: простои 42,5 ч/мес, рост с августа", relation: "измеряет" },
      { node: "decision", caption: "Решение: заменить броню конуса", relation: "основание" },
      { node: "person", caption: "Автор решения, главный механик", relation: "принято" },
      { node: "reg", caption: "Основание, регламент ТО дробилок", relation: "регламентирует" },
    ],
    tree: {
      id: "root", label: "Дробилка КМД-2200", type: "Asset",
      children: [
        { id: "unit", label: "Дробильный цех", type: "Unit", children: [{ id: "org", label: "ГОК «Северный»", type: "Org" }] },
        { id: "pass", label: "Паспорт дробилки", type: "Document" },
        { id: "cone", label: "Броня конуса", type: "Part", children: [{ id: "wh", label: "Склад №3", type: "Unit" }] },
        {
          id: "stop", label: "Простой 6 ч", type: "Event",
          children: [
            {
              id: "metric", label: "Простои, 42,5 ч/мес", type: "Metric",
              children: [
                {
                  id: "decision", label: "Заменить броню", type: "Decision",
                  children: [
                    { id: "person", label: "Иванов И. И.", type: "Person",
                      children: [
                        { id: "reg", label: "Регламент ТО", type: "Document", children: [{ id: "gost", label: "ГОСТ 12345-2020", type: "Document" }] },
                        { id: "petrov", label: "Петров С. А.", type: "Person" },
                      ] },
                    { id: "order", label: "Заказ брони", type: "Decision", children: [{ id: "contract", label: "Договор ТО-14", type: "Document", children: [{ id: "supplier", label: "Уралмаш-Сервис", type: "Org" }] }] },
                    { id: "cost", label: "Стоимость ремонта", type: "Metric" },
                    { id: "sidorova", label: "Сидорова А. В.", type: "Person" },
                  ],
                },
              ],
            },
            { id: "repair2", label: "Ремонт 04.10", type: "Work", children: [{ id: "naryad", label: "Наряд №214", type: "Work", children: [{ id: "act", label: "Акт ремонта", type: "Document" }, { id: "master", label: "Мастер смены", type: "Role" }] }] },
          ],
        },
        { id: "conv", label: "Конвейер КЛ-800", type: "Asset" },
        { id: "rep", label: "Отчёт за октябрь", type: "Document", children: [{ id: "mtbf", label: "Наработка 380 ч", type: "Metric" }] },
      ],
    },
  },
  {
    id: "logistics",
    domain: "Логистика",
    question: "Почему претензия по рейсу не закрыта?",
    path: ["root", "claim", "gap", "act", "decision", "deal"],
    rel: { claim: "заявлена", gap: "причина", act: "фиксирует", decision: "решение", deal: "основание" },
    steps: [
      { node: "root", caption: "Рейс TR-4821, Москва, Казань, партия 18 т" },
      { node: "claim", caption: "Претензия клиента на 118 тыс. ₽", relation: "заявлена" },
      { node: "gap", caption: "Расхождение веса, 6% к накладной", relation: "причина" },
      { node: "act", caption: "Акт приёмки на складе получателя", relation: "фиксирует" },
      { node: "decision", caption: "Решение: доплата по тарифу", relation: "решение" },
      { node: "deal", caption: "Основание, договор перевозки", relation: "основание" },
    ],
    tree: {
      id: "root", label: "Рейс TR-4821", type: "Asset",
      children: [
        { id: "truck", label: "Тягач Volvo FH", type: "Asset", children: [{ id: "sensor", label: "Датчик t° груза", type: "Document" }] },
        { id: "driver", label: "Водитель Кузнецов", type: "Person" },
        { id: "invoice", label: "Накладная №7781", type: "Document" },
        { id: "route", label: "Москва, Казань", type: "Unit" },
        {
          id: "claim", label: "Претензия 118 тыс.", type: "Event",
          children: [
            {
              id: "gap", label: "Расхождение веса 6%", type: "Metric",
              children: [
                { id: "real", label: "Вес при приёмке 17 150 кг", type: "Metric" },
                {
                  id: "act", label: "Акт приёмки", type: "Document",
                  children: [
                    { id: "photo", label: "Фото партии", type: "Document" },
                    { id: "seal", label: "Пломба №4412", type: "Document" },
                    {
                      id: "decision", label: "Доплата по тарифу", type: "Decision",
                      children: [
                        {
                          id: "deal", label: "Договор перевозки", type: "Document",
                          children: [
                            { id: "limit", label: "Лимит 500 тыс.", type: "Metric" },
                            { id: "insurance", label: "Страховка груза", type: "Document" },
                            { id: "client", label: "«Агротрейд»", type: "Org" },
                          ],
                        },
                        { id: "lawyer", label: "Юрист Орлова", type: "Person" },
                      ],
                    },
                  ],
                },
                { id: "term", label: "Срок ответа 10 дн", type: "Metric" },
              ],
            },
            {
              id: "warehouse", label: "Склад Казань", type: "Unit",
              children: [
                { id: "batch", label: "Партия 18 т", type: "Part" },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: "leasing",
    domain: "Лизинг",
    question: "Почему досье ушло на доработку?",
    path: ["root", "check", "missing", "decision", "underwriter", "policy"],
    rel: { check: "проверка", missing: "не хватает", decision: "решение", underwriter: "проверил", policy: "по политике" },
    steps: [
      { node: "root", caption: "Заявка ЛЗ-2048, погрузчик, аванс 20%" },
      { node: "check", caption: "Проверка комплекта документов", relation: "проверка" },
      { node: "missing", caption: "Нет справки о доходах за 6 месяцев", relation: "не хватает" },
      { node: "decision", caption: "Решение: вернуть на доработку", relation: "решение" },
      { node: "underwriter", caption: "Андеррайтер Соколов, 11:20", relation: "проверил" },
      { node: "policy", caption: "Основание, политика проверки, п. 4.2", relation: "по политике" },
    ],
    tree: {
      id: "root", label: "Заявка ЛЗ-2048", type: "Work",
      children: [
        {
          id: "company", label: "ООО «Вектор»", type: "Org",
          children: [
            { id: "inn", label: "ИНН 7701234567", type: "Document" },
            { id: "turnover", label: "Обороты 48 млн", type: "Metric" },
            { id: "ceo", label: "Директор Лебедев", type: "Person" },
          ],
        },
        { id: "subject", label: "Погрузчик 3 т", type: "Asset", children: [{ id: "value", label: "Оценка 4,2 млн", type: "Metric" }] },
        { id: "advance", label: "Аванс 20%", type: "Metric" },
        { id: "term36", label: "Срок 36 мес", type: "Metric" },
        { id: "kasko", label: "Страховка КАСКО", type: "Document" },
        {
          id: "check", label: "Проверка комплекта", type: "Work",
          children: [
            {
              id: "missing", label: "Нет справки о доходах", type: "Event",
              children: [
                {
                  id: "decision", label: "На доработку", type: "Decision",
                  children: [
                    {
                      id: "underwriter", label: "Андеррайтер Соколов", type: "Person",
                      children: [
                        {
                          id: "policy", label: "Политика проверки", type: "Document",
                          children: [{ id: "p4", label: "п. 4.2", type: "Document" }],
                        },
                      ],
                    },
                    { id: "committee", label: "Комитет", type: "Role" },
                    { id: "answer2", label: "Срок ответа 2 дн", type: "Metric" },
                  ],
                },
                { id: "scoring", label: "Скоринг 62", type: "Metric" },
              ],
            },
            { id: "statement", label: "Выписка 12 мес", type: "Document" },
          ],
        },
        { id: "payment", label: "Платёж 84 тыс.", type: "Metric" },
      ],
    },
  },
  {
    id: "engineering",
    domain: "Проектирование",
    question: "Почему проект вернули с замечаниями?",
    path: ["root", "issue", "sheet", "norm", "decision", "gip"],
    rel: { issue: "замечание", sheet: "на листе", norm: "пункт нормы", decision: "решение", gip: "согласовал" },
    steps: [
      { node: "root", caption: "Проект Р-118, раздел КМ, версия 2" },
      { node: "issue", caption: "Замечание №14 от экспертизы", relation: "замечание" },
      { node: "sheet", caption: "Лист 3, узел крепления", relation: "на листе" },
      { node: "norm", caption: "Пункт СП 20.13330, снеговая нагрузка", relation: "пункт нормы" },
      { node: "decision", caption: "Решение: пересчитать узел", relation: "решение" },
      { node: "gip", caption: "Согласовал ГИП Петрова", relation: "согласовал" },
    ],
    tree: {
      id: "root", label: "Проект Р-118", type: "Document",
      children: [
        { id: "tz", label: "ТЗ на проектирование", type: "Document" },
        { id: "km", label: "Раздел КМ", type: "Document", children: [{ id: "calc1", label: "Расчёт 1", type: "Work" }] },
        { id: "ar", label: "Раздел АР", type: "Document" },
        { id: "deadline", label: "Срок 12.11", type: "Metric" },
        { id: "partners", label: "Смежники", type: "Org" },
        { id: "customer", label: "«Нефтестрой»", type: "Org" },
        { id: "design_contract", label: "Договор на проект", type: "Document" },
        {
          id: "issue", label: "Замечание №14", type: "Event",
          children: [
            {
              id: "sheet", label: "Лист 3, версия 2", type: "Document",
              children: [
                {
                  id: "norm", label: "СП 20.13330", type: "Document",
                  children: [
                    {
                      id: "decision", label: "Пересчитать узел", type: "Decision",
                      children: [
                        {
                          id: "gip", label: "ГИП Петрова", type: "Person",
                          children: [{ id: "checklist", label: "Чек-лист ГИП", type: "Document" }],
                        },
                        { id: "calc", label: "Расчёт на снег", type: "Work", children: [{ id: "kpa", label: "Результат 2,4 кПа", type: "Metric" }] },
                        { id: "budget", label: "Смета +180 тыс.", type: "Metric" },
                      ],
                    },
                    { id: "repeat", label: "Повторное замечание", type: "Event" },
                  ],
                },
                { id: "expert", label: "Эксперт Гринь", type: "Person" },
              ],
            },
            { id: "issue15", label: "Замечание №15", type: "Event", children: [{ id: "sheet7", label: "Лист 7", type: "Document" }] },
            { id: "expertise", label: "Срок экспертизы 20 дн", type: "Metric" },
          ],
        },
      ],
    },
  },
  {
    id: "retail",
    domain: "Ритейл",
    question: "Почему вырос нулевой остаток по товару?",
    path: ["root", "zero", "late", "po", "supplier", "contract"],
    rel: { zero: "остаток", late: "причина", po: "заказ", supplier: "поставщик", contract: "условия" },
    steps: [
      { node: "root", caption: "Товар 4471 «Кофе 1 кг», продажи 320/нед" },
      { node: "zero", caption: "Остаток на складе «Юг», 0", relation: "остаток" },
      { node: "late", caption: "Поставка просрочена на 9 дней", relation: "причина" },
      { node: "po", caption: "Заказ PO-778 оформлен 21.10", relation: "заказ" },
      { node: "supplier", caption: "Поставщик «Альфа»", relation: "поставщик" },
      { node: "contract", caption: "Условия, договор поставки, п. 3.1", relation: "условия" },
    ],
    tree: {
      id: "root", label: "Товар 4471 «Кофе 1 кг»", type: "Asset",
      children: [
        { id: "sales", label: "Продажи 320/нед", type: "Metric" },
        { id: "plan", label: "План 400/нед", type: "Metric" },
        { id: "price", label: "Цена 1 190 ₽", type: "Metric" },
        { id: "cost", label: "Закупка 780 ₽", type: "Metric" },
        { id: "promo", label: "Промо −15%", type: "Metric" },
        {
          id: "zero", label: "Остаток 0", type: "Event",
          children: [
            {
              id: "late", label: "Поставка просрочена", type: "Event",
              children: [
                {
                  id: "po", label: "Заказ PO-778", type: "Work",
                  children: [
                    {
                      id: "supplier", label: "Поставщик «Альфа»", type: "Org",
                      children: [
                        {
                          id: "contract", label: "Договор поставки", type: "Document",
                          children: [
                            { id: "p3", label: "п. 3.1", type: "Document" },
                            { id: "penalty", label: "Штраф 0,1%/дн", type: "Metric" },
                          ],
                        },
                        { id: "logist", label: "Логист Ершов", type: "Person" },
                      ],
                    },
                    { id: "transit", label: "Транзит 9 дней", type: "Metric" },
                    { id: "date", label: "Оформлен 21.10", type: "Metric" },
                  ],
                },
                { id: "warehouse2", label: "Склад «Юг»", type: "Unit", children: [{ id: "parcel", label: "Партия 240 шт", type: "Part" }] },
              ],
            },
            { id: "forecast", label: "Прогноз 14 дней", type: "Metric" },
          ],
        },
      ],
    },
  },
];

const DARK = {
  bg: "#0c0e12",
  fg: "#f4f2ef",
  dim: "#b6b9bf",
  faint: "#9aa0a6",
  edge: "#ffffff",
  edgeOp: 0.12,
  dot: "#ffffff",
  dotOp: 0.05,
  relIdle: "#8d9298",
  relOn: "#ffb08a",
  accent: "#ff7a45",
  accentSoft: "rgba(255,122,69,0.12)",
  accentBorder: "rgba(255,122,69,0.6)",
  chipBorder: "rgba(255,255,255,0.14)",
  chipText: "rgba(255,255,255,0.5)",
  types: {
    Asset: "#e8e5e0", Unit: "#9aa0a6", Org: "#9aa0a6", Event: "#ff7a45",
    Metric: "#6f8cff", Document: "#8c8f96", Person: "#ffb26b", Role: "#9aa0a6",
    Decision: "#ff7a45", Work: "#e8e5e0", Part: "#e8e5e0",
  } as Record<NodeType, string>,
};

const LIGHT = {
  bg: "#f5f5f4",
  fg: "#0b0b0c",
  dim: "#3d3a35",
  faint: "#5f646c",
  edge: "#0b0b0c",
  edgeOp: 0.14,
  dot: "#0b0b0c",
  dotOp: 0.07,
  relIdle: "#8a8680",
  relOn: "#b8410c",
  accent: "#ff5a1f",
  accentSoft: "rgba(255,90,31,0.12)",
  accentBorder: "rgba(255,90,31,0.65)",
  chipBorder: "rgba(11,11,12,0.16)",
  chipText: "rgba(11,11,12,0.5)",
  types: {
    Asset: "#0b0b0c", Unit: "#6f6c66", Org: "#6f6c66", Event: "#e04e1f",
    Metric: "#2b4bff", Document: "#6f6c66", Person: "#b8410c", Role: "#6f6c66",
    Decision: "#e04e1f", Work: "#0b0b0c", Part: "#0b0b0c",
  } as Record<NodeType, string>,
};

const VB_W = 1700;
const COLP = 240;
const X0 = 110;
const Y0 = 46;

type Placed = { id: string; label: string; type: NodeType; depth: number; x: number; y: number; parent?: string };

function countLeaves(n: TreeNode): number {
  const kids = n.children ?? [];
  if (!kids.length) return 1;
  return kids.reduce((s, k) => s + countLeaves(k), 0);
}

function layout(root: TreeNode) {
  const leaves = countLeaves(root);
  const row = Math.max(27, Math.min(44, 380 / Math.max(1, leaves - 1)));
  const VB_H = Math.max(470, leaves * row + 96);
  const nodes: Placed[] = [];
  let cursor = 0;
  const walk = (n: TreeNode, depth: number, parent?: string) => {
    const kids = n.children ?? [];
    let y: number;
    if (!kids.length) {
      y = cursor;
      cursor += row;
    } else {
      const first = cursor;
      for (const k of kids) walk(k, depth + 1, n.id);
      y = (first + cursor - row) / 2;
    }
    nodes.push({ id: n.id, label: n.label, type: n.type, depth, x: X0 + depth * COLP, y, parent });
  };
  walk(root, 0);
  const height = cursor;
  const offset = Math.max(0, (VB_H - 60 - height) / 2);
  const maxX = Math.max(...nodes.map((n) => n.x));
  const ox = Math.max(0, (VB_W - (maxX + 300)) / 2);
  const shifted = nodes.map((n) => ({ ...n, x: n.x + ox, y: n.y + Y0 + offset }));
  return { nodes: shifted, byId: new Map(shifted.map((n) => [n.id, n])), width: VB_W, height: VB_H };
}

function edgePath(a: Placed, b: Placed) {
  const x1 = a.x + 10;
  const y1 = a.y;
  const x2 = b.x - 14;
  const y2 = b.y;
  const mx = (x1 + x2) / 2;
  return "M" + x1 + " " + y1 + " C" + mx + " " + y1 + " " + mx + " " + y2 + " " + x2 + " " + y2;
}

export default function AnswerPath() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [started, setStarted] = useState(false);

  const ex = EXAMPLES[index];
  const T = index % 2 === 0 ? DARK : LIGHT;
  const L = useMemo(() => layout(ex.tree), [ex]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setStarted(true);
      setStep(0);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || reduced) return;
    const total = ex.steps.length;
    let phase = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    setStep(0);
    const tick = () => {
      if (cancelled) return;
      phase += 1;
      if (phase >= total * 2) {
        timer = setTimeout(() => {
          if (cancelled) return;
          setIndex((i) => (i + 1) % EXAMPLES.length);
        }, 1400);
        return;
      }
      setStep(phase % total);
      timer = setTimeout(tick, 1050);
    };
    timer = setTimeout(tick, 700);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [index, started, reduced, ex.steps.length]);

  const goto = useCallback((next: number) => {
    setIndex(((next % EXAMPLES.length) + EXAMPLES.length) % EXAMPLES.length);
    setStep(0);
  }, []);

  const current = ex.steps[Math.min(step, ex.steps.length - 1)];
  const visited = new Set(ex.steps.slice(0, step + 1).map((s) => s.node));

  return (
    <div
      ref={ref}
      className="mt-6 w-full py-3 transition-colors duration-500"
      style={{ backgroundColor: T.bg, color: T.fg }}
    >
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] " style={{ color: T.faint }}>
              вопрос · {ex.domain}
            </p>
            <p className="mt-2 max-w-[52ch] text-[18px] font-medium">{ex.question}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goto(index - 1)}
              aria-label="Предыдущий пример"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[18px] font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: T.accent, color: index % 2 === 0 ? "#120c08" : "#fff" }}
            >
              ‹
            </button>
            <span className="font-mono text-[13px] tracking-[0.12em]" style={{ color: T.dim }}>
              {index + 1} / {EXAMPLES.length}
            </span>
            <button
              type="button"
              onClick={() => goto(index + 1)}
              aria-label="Следующий пример"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[18px] font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: T.accent, color: index % 2 === 0 ? "#120c08" : "#fff" }}
            >
              ›
            </button>
          </div>
        </div>

        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: T.faint }}>
          <li className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full" style={{ background: T.types.Asset }} />объект</li>
          <li className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full" style={{ background: T.types.Event }} />событие</li>
          <li className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full" style={{ background: T.types.Metric }} />показатель</li>
          <li className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full" style={{ background: T.types.Document }} />документ</li>
          <li className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full" style={{ background: T.types.Person }} />человек</li>
        </ul>

        <div className="mt-3 overflow-x-auto">
          <svg
            viewBox={"0 0 " + L.width + " " + L.height}
            preserveAspectRatio="xMidYMid meet"
            style={{ maxHeight: 360 }}
            className="min-w-[900px] w-full"
            role="img"
            aria-label={"Дерево онтологии: путь ответа, пример «" + ex.domain + "»"}
          >
            <defs>
              <pattern id="ap-dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill={T.dot} opacity={T.dotOp} />
              </pattern>
              <filter id="ap-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <rect width={L.width} height={L.height} fill="url(#ap-dots)" />

            {L.nodes.map((n) => {
              if (!n.parent) return null;
              const a = L.byId.get(n.parent);
              if (!a) return null;
              const d = edgePath(a, n);
              const onPath = ex.path.includes(n.id) && ex.path.includes(a.id);
              const color = T.types[n.type];
              return (
                <g key={ex.id + "-e-" + n.id}>
                  {onPath ? (
                    <>
                      <path d={d} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"
                        filter="url(#ap-glow)" opacity="0.95" pathLength={1} strokeDasharray={1}
                        strokeDashoffset={visited.has(n.id) ? 0 : 1}
                        style={{ transition: "stroke-dashoffset .9s ease" }} />
                      <path d={d} fill="none" stroke={T.accent} strokeWidth="1.1" strokeDasharray="5 16" opacity="0.75" className="ap-flow" />
                    </>
                  ) : (
                    <path d={d} fill="none" stroke={T.edge} strokeWidth="1" opacity={T.edgeOp} />
                  )}
                  {onPath && ex.rel[n.id] && (
                    <text
                      x={a.x + 10 + (n.x - 14 - a.x - 10) * 0.34}
                      y={a.y + (n.y - a.y) * 0.34 - 14}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize="10.5"
                      fill={visited.has(n.id) ? T.relOn : T.relIdle}
                      stroke={T.bg}
                      strokeWidth="4"
                      paintOrder="stroke"
                      style={{ transition: "fill .3s ease" }}
                    >
                      {ex.rel[n.id]}
                    </text>
                  )}
                </g>
              );
            })}

            {L.nodes.map((n) => {
              const on = ex.path.includes(n.id);
              const active = current.node === n.id;
              const seen = visited.has(n.id);
              const color = T.types[n.type];
              return (
                <g key={ex.id + "-" + n.id} opacity={step === 0 || seen || !on ? 1 : 0.7} style={{ transition: "opacity .4s ease" }}>
                  {active && <circle cx={n.x} cy={n.y} r="18" fill={color} opacity="0.18" />}
                  <circle cx={n.x} cy={n.y} r={on ? 7 : 5} fill={color} filter={on ? "url(#ap-glow)" : undefined} opacity={on ? 1 : 0.95} />
                  <text x={n.x + 16} y={n.y + 6} fontSize="17" fontWeight={on ? 600 : 400}
                    fill={on ? T.fg : T.dim} stroke={T.bg} strokeWidth="4" paintOrder="stroke">
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-2 flex min-h-[30px] flex-wrap items-baseline gap-x-3 gap-y-1" aria-live={reduced ? "off" : "polite"}>
          {current.relation && (
            <span className="font-mono text-[12px] " style={{ color: T.accent }}>{current.relation}</span>
          )}
          <span className="text-[13.5px]" style={{ color: T.dim }}>{current.caption}</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {EXAMPLES.map((e, i) => {
            const active = i === index;
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => goto(i)}
                aria-label={"Пример: " + e.domain}
                aria-current={active}
                className="rounded-full px-3.5 py-1.5 font-mono text-[12px] transition-colors"
                style={
                  active
                    ? { backgroundColor: T.accent, color: index % 2 === 0 ? "#120c08" : "#fff", border: "1px solid " + T.accent }
                    : { border: "1px solid " + T.chipBorder, color: T.chipText, backgroundColor: "transparent" }
                }
              >
                {e.domain}
              </button>
            );
          })}
        </div>

        <p className="mt-1.5 text-[12px]" style={{ color: T.faint }}>
          Данные, из <span className="font-mono">ontology/demo.ttl</span>, подписи связей, <span className="font-mono">core.ttl</span>.
        </p>
      </div>
    </div>
  );
}
