"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Анимация ядра Cortex: слева разрозненные источники, справа та же картина,
 * собранная онтологией.
 *
 * - запуск при попадании в экран, пауза вне экрана (IntersectionObserver);
 * - prefers-reduced-motion → финальный кадр (CSS media query);
 * - SVG + CSS, без библиотек; отдельные раскладки для 1024+ и мобильных.
 */

const CSS = `
.ca { position: relative; }
.ca .ca-anim { animation-play-state: paused; }
.ca[data-active="true"] .ca-anim { animation-play-state: running; }

.ca-frame {
  position: relative;
  border: 1px solid rgba(245,245,244,.12);
  background: #0b0b0c;
  overflow: hidden;
}
.ca-svg { display: block; width: 100%; height: auto; font-family: var(--font-sans); }
.ca-desk { display: none; }
.ca-mob { max-width: 480px; margin: 0 auto; }
@media (min-width: 1024px) {
  .ca-desk { display: block; }
  .ca-mob { display: none; }
}
.ca-mono { font-family: var(--font-mono); }

.ca-bar {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  margin-top: 10px; font-family: var(--font-mono); font-size: 10px;
  letter-spacing: .08em; text-transform: uppercase; color: rgba(245,245,244,.4);
}
.ca-key { display: inline-flex; align-items: center; gap: 8px; }
.ca-key i { display: inline-block; width: 26px; height: 2px; background: #ff5a1f; }
.ca-replay {
  display: inline-flex; align-items: center; gap: 6px;
  border: 1px solid rgba(245,245,244,.18); background: transparent; color: rgba(245,245,244,.65);
  padding: 5px 10px; font: inherit; letter-spacing: .08em; cursor: pointer;
  transition: color .18s ease, border-color .18s ease;
}
.ca-replay:hover { color: #f5f5f4; border-color: rgba(245,245,244,.4); }

@keyframes ca-in {
  from { opacity: 0; transform: translate(-30px, 8px); }
  to   { opacity: 1; transform: translate(0, 0); }
}
.ca-node { transform-box: fill-box; transform-origin: center; animation: ca-in .72s cubic-bezier(.2,.7,.2,1) both; }

@keyframes ca-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.ca-up { transform-box: fill-box; transform-origin: center; animation: ca-up .6s cubic-bezier(.2,.7,.2,1) both; }

@keyframes ca-fade { from { opacity: 0; } to { opacity: 1; } }
.ca-fade { animation: ca-fade .5s ease both; }

@keyframes ca-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
.ca-edge { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ca-draw 1.05s cubic-bezier(.3,.7,.2,1) both; }
.ca-path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ca-draw .85s cubic-bezier(.3,.7,.2,1) both; }

@keyframes ca-pop {
  0% { opacity: 0; transform: scale(.4); }
  70% { opacity: 1; transform: scale(1.12); }
  100% { opacity: 1; transform: scale(1); }
}
.ca-pop { transform-box: fill-box; transform-origin: center; animation: ca-pop .45s cubic-bezier(.2,.8,.2,1) both; }

@keyframes ca-drift { to { stroke-dashoffset: -80; } }
.ca-chaos-link { animation: ca-drift 18s linear infinite; }

@keyframes ca-flow { to { stroke-dashoffset: -1.2; } }
.ca-flow { animation: ca-flow 1.8s linear infinite; }

@keyframes ca-pulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
.ca-pulse { animation: ca-pulse 2.4s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .ca .ca-anim { animation: none !important; }
  .ca .ca-edge, .ca .ca-path { stroke-dashoffset: 0 !important; }
  .ca .ca-path-flow { display: none !important; }
  .ca .ca-chaos-link { stroke-dashoffset: 0 !important; }
}
`;

const ACID = "#ff5a1f";
const PAPER = "#f5f5f4";

type NodeDef = {
  x: number; y: number; w: number; h: number;
  label: string; tag: string;
};

const DESK_NODES: Record<string, NodeDef> = {
  equip:  { x: 740,  y: 190, w: 150, h: 46, label: "Оборудование", tag: "pdf · паспорт" },
  mat:    { x: 1060, y: 180, w: 140, h: 46, label: "Материал",     tag: "xlsx · ведомость" },
  stage:  { x: 940,  y: 260, w: 128, h: 46, label: "Передел",      tag: "1с · справочник" },
  doc:    { x: 725,  y: 420, w: 140, h: 46, label: "Документ",     tag: "docx · регламент" },
  event:  { x: 860,  y: 340, w: 150, h: 46, label: "Событие",      tag: "mail · 04.10" },
  proj:   { x: 1080, y: 310, w: 136, h: 46, label: "Проект",       tag: "erp · заказ 214" },
  person: { x: 960,  y: 420, w: 128, h: 46, label: "Человек",      tag: "hr · механик" },
  org:    { x: 1120, y: 430, w: 140, h: 46, label: "Организация",  tag: "erp · подрядчик" },
};

const DESK_EDGES: { a: string; b: string; label: string; bend: number; lx: number; ly: number }[] = [
  { a: "equip",  b: "stage", label: "работает в",  bend:  0.08, lx: 852,  ly: 212 },
  { a: "mat",    b: "stage", label: "входит в",    bend: -0.12, lx: 995,  ly: 228 },
  { a: "stage",  b: "proj",  label: "включает",    bend:  0.10, lx: 1045, ly: 272 },
  { a: "event",  b: "stage", label: "на переделе", bend: -0.08, lx: 906,  ly: 296 },
  { a: "doc",    b: "equip", label: "описывает",   bend:  0.14, lx: 700,  ly: 300 },
  { a: "person", b: "proj",  label: "ведёт",       bend: -0.12, lx: 1030, ly: 360 },
  { a: "org",    b: "proj",  label: "заказчик",    bend:  0.08, lx: 1118, ly: 380 },
];

const DESK_CHAOS = [
  { x: 88,  y: 122, w: 150, h: 54, r: -4.5, tag: "PDF",    label: "паспорт дробилки" },
  { x: 300, y: 140, w: 146, h: 54, r: 3,    tag: "XLSX",   label: "простои, октябрь" },
  { x: 120, y: 218, w: 158, h: 54, r: 2.5,  tag: "DOCX",   label: "регламент ТО" },
  { x: 292, y: 250, w: 150, h: 54, r: -3.5, tag: "MAIL",   label: "RE: согласование" },
  { x: 84,  y: 322, w: 140, h: 54, r: -2,   tag: "1С",     label: "номенклатура" },
  { x: 296, y: 340, w: 152, h: 54, r: 4,    tag: "ERP",    label: "заказ №214" },
  { x: 128, y: 414, w: 150, h: 54, r: -3,   tag: "MES",    label: "смена 04.10" },
  { x: 306, y: 444, w: 146, h: 54, r: 1.5,  tag: "SCAN",   label: "акт приёмки" },
  { x: 96,  y: 522, w: 154, h: 54, r: -1.5, tag: "FOLDER", label: "общая папка" },
];

const DESK_CHAOS_LINKS = [
  "M 160 150 Q 260 200 300 225",
  "M 240 160 Q 200 200 150 200",
  "M 180 240 Q 260 280 280 315",
  "M 150 330 Q 240 380 300 410",
  "M 60 150 Q 20 240 40 300",
  "M 350 165 Q 390 300 340 420",
  "M 290 262 Q 220 330 170 400",
  "M 260 350 Q 200 450 150 500",
  "M 180 400 Q 300 300 330 170",
  "M 180 510 Q 300 420 320 265",
];

const MOB_NODES: Record<string, NodeDef> = {
  equip:  { x: 84,  y: 452, w: 126, h: 42, label: "Оборудование", tag: "pdf · паспорт" },
  stage:  { x: 276, y: 452, w: 126, h: 42, label: "Передел",      tag: "1с · справочник" },
  event:  { x: 84,  y: 512, w: 126, h: 42, label: "Событие",      tag: "mail · 04.10" },
  proj:   { x: 276, y: 512, w: 126, h: 42, label: "Проект",       tag: "erp · заказ 214" },
  doc:    { x: 84,  y: 572, w: 126, h: 42, label: "Документ",     tag: "docx · регламент" },
  person: { x: 276, y: 572, w: 126, h: 42, label: "Человек",      tag: "hr · механик" },
  mat:    { x: 84,  y: 632, w: 126, h: 42, label: "Материал",     tag: "xlsx · ведомость" },
  org:    { x: 276, y: 632, w: 126, h: 42, label: "Организация",  tag: "erp · подрядчик" },
};

const MOB_EDGES: { a: string; b: string; bend: number }[] = [
  { a: "equip", b: "stage", bend: 0 },
  { a: "equip", b: "event", bend: 0 },
  { a: "event", b: "doc", bend: 0 },
  { a: "mat", b: "doc", bend: 0 },
  { a: "stage", b: "proj", bend: 0 },
  { a: "proj", b: "person", bend: 0 },
  { a: "person", b: "org", bend: 0 },
];

const MOB_CHAOS = [
  { x: 86,  y: 78,  w: 140, h: 44, r: -2.5, tag: "PDF",  label: "паспорт дробилки" },
  { x: 274, y: 94,  w: 140, h: 44, r: 2.5,  tag: "XLSX", label: "простои, октябрь" },
  { x: 90,  y: 152, w: 140, h: 44, r: 1.8,  tag: "DOCX", label: "регламент ТО" },
  { x: 276, y: 168, w: 140, h: 44, r: -2.2, tag: "MAIL", label: "RE: согласование" },
  { x: 86,  y: 230, w: 140, h: 44, r: -1.5, tag: "MES",  label: "смена 04.10" },
  { x: 274, y: 246, w: 140, h: 44, r: 1.8,  tag: "1С",   label: "номенклатура" },
];

const MOB_CHAOS_LINKS = [
  "M 150 100 Q 230 110 210 145",
  "M 230 155 Q 260 190 300 200",
  "M 170 175 Q 180 210 150 225",
  "M 60 205 Q 40 235 60 260",
  "M 300 260 Q 330 300 320 340",
  "M 170 250 Q 240 280 240 320",
];

const LAYERS: [string, string, string][] = [
  ["01", "онтология", "типы и ключи"],
  ["02", "память", "задача и контекст"],
  ["03", "граф", "связи и обход"],
  ["04", "контур", "права и лимиты"],
  ["05", "журнал", "вопрос и цепочка"],
];

const T0 = 0.12;

function bendPath(a: NodeDef, b: NodeDef, bend: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = (a.x + b.x) / 2 + nx * len * bend;
  const cy = (a.y + b.y) / 2 + ny * len * bend;
  const lx = 0.25 * a.x + 0.5 * cx + 0.25 * b.x;
  const ly = 0.25 * a.y + 0.5 * cy + 0.25 * b.y;
  return { d: "M " + a.x + " " + a.y + " Q " + cx + " " + cy + " " + b.x + " " + b.y, lx, ly };
}

function ChaosChip(props: { x: number; y: number; w: number; h: number; r: number; tag: string; label: string; compact?: boolean }) {
  const { x, y, w, h, r, tag, label, compact } = props;
  const top = y - h / 2;
  const left = x - w / 2;
  return (
    <g transform={"rotate(" + r + " " + x + " " + y + ")"}>
      <rect x={left} y={top} width={w} height={h} rx={2} fill="#141416" stroke="rgba(245,245,244,0.14)" />
      <text x={left + 11} y={top + (compact ? 14 : 17)} className="ca-mono" fontSize={compact ? 8 : 8.5} letterSpacing="0.1em" fill="rgba(245,245,244,0.38)">{tag}</text>
      <text x={left + 11} y={top + (compact ? 31 : 36)} fontSize={compact ? 10.5 : 11.5} fill="rgba(245,245,244,0.82)">{label}</text>
    </g>
  );
}

function GraphChip(props: { node: NodeDef; delay: number; step?: number; stepDelay?: number; compact?: boolean }) {
  const { node, delay, step, stepDelay = 4.5, compact } = props;
  const top = node.y - node.h / 2;
  const left = node.x - node.w / 2;
  const pad = step ? (compact ? 24 : 26) : 11;
  return (
    <g className="ca-anim ca-node" style={{ animationDelay: delay + "s" }}>
      <rect x={left} y={top} width={node.w} height={node.h} rx={2} fill="#171719" stroke="rgba(245,245,244,0.2)" />
      {step ? (
        <g className="ca-anim ca-pop" style={{ animationDelay: stepDelay + "s" }}>
          <circle cx={left + (compact ? 13 : 14)} cy={node.y} r={compact ? 6.5 : 7.5} fill={ACID} />
          <text x={left + (compact ? 13 : 14)} y={node.y + 0.5} fontSize={compact ? 7.5 : 8.5} fontWeight={700} textAnchor="middle" dominantBaseline="middle" fill="#0b0b0c">{step}</text>
        </g>
      ) : null}
      <text x={left + pad} y={top + (compact ? 18 : 21)} fontSize={compact ? 11 : 12} fontWeight={600} fill={PAPER}>{node.label}</text>
      <text x={left + pad} y={top + (compact ? 32 : 35)} className="ca-mono" fontSize={compact ? 7.5 : 8} fill="rgba(245,245,244,0.4)">{node.tag}</text>
    </g>
  );
}

function DeskScene() {
  return (
    <svg viewBox="0 0 1200 760" role="img" aria-labelledby="ca-t-d ca-d-d" className="ca-svg">
      <title id="ca-t-d">Разрозненные источники слева и связанная онтологией модель справа</title>
      <desc id="ca-d-d">Слева документы, таблицы, письма и системы с пунктирными связями. Справа те же объекты как сущности онтологии: передел, оборудование, материал, событие, документ, проект, человек, организация. Подсвечен путь ответа и журнал.</desc>
      <defs>
        <pattern id="ca-grid-d" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245,245,244,0.045)" strokeWidth="1" />
        </pattern>
        <radialGradient id="ca-glow-d" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACID} stopOpacity="0.13" />
          <stop offset="100%" stopColor={ACID} stopOpacity="0" />
        </radialGradient>
        <marker id="ca-arrow-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill={ACID} />
        </marker>
      </defs>

      <rect width="1200" height="760" fill="url(#ca-grid-d)" />
      <circle cx="905" cy="330" r="360" fill="url(#ca-glow-d)" />

      <text x="24" y="46" className="ca-mono ca-anim ca-fade" fontSize="10" letterSpacing="0.18em" fill="rgba(245,245,244,0.5)" style={{ animationDelay: T0 + "s" }}>КАК ЕСТЬ</text>
      <text x="24" y="66" className="ca-anim ca-fade" fontSize="12.5" fill="rgba(245,245,244,0.35)" style={{ animationDelay: T0 + 0.05 + "s" }}>разрозненные источники</text>

      <text x="656" y="46" className="ca-mono ca-anim ca-fade" fontSize="10" letterSpacing="0.18em" fill="rgba(245,245,244,0.5)" style={{ animationDelay: T0 + 0.08 + "s" }}>С ОНТОЛОГИЕЙ</text>
      <text x="656" y="66" className="ca-anim ca-fade" fontSize="12.5" fill="rgba(245,245,244,0.35)" style={{ animationDelay: T0 + 0.12 + "s" }}>одна модель, связи из типов</text>

      <line x1="560" y1="88" x2="560" y2="700" stroke="rgba(245,245,244,0.08)" />

      <g>
        {DESK_CHAOS_LINKS.map((d, i) => (
          <path key={"cl" + i} d={d} fill="none" stroke="rgba(245,245,244,0.2)" strokeWidth="1" strokeDasharray="3 7" className="ca-anim ca-chaos-link" />
        ))}
      </g>

      {DESK_CHAOS.map((c, i) => <ChaosChip key={"cc" + i} {...c} />)}

      <text x="24" y="596" className="ca-mono" fontSize="9.5" letterSpacing="0.1em" fill="rgba(245,245,244,0.42)">9 источников · 4 формата</text>
      <text x="24" y="616" fontSize="11" fill="rgba(245,245,244,0.3)">связи держатся на людях и почте</text>
      <text x="24" y="650" className="ca-mono" fontSize="9.5" fill="rgba(245,245,244,0.22)">поиск находит слова, а не ответ</text>

      <g className="ca-anim ca-fade" style={{ animationDelay: "1.15s" }}>
        <line x1="486" y1="396" x2="622" y2="396" stroke={ACID} strokeWidth="1.2" strokeDasharray="4 6" markerEnd="url(#ca-arrow-d)" className="ca-anim ca-flow" />
        <text x="554" y="380" textAnchor="middle" className="ca-mono" fontSize="9.5" letterSpacing="0.16em" fill="rgba(255,90,31,0.85)">ОНТОЛОГИЯ</text>
        <text x="554" y="420" textAnchor="middle" fontSize="9.5" fill="rgba(245,245,244,0.32)">связи из типов</text>
      </g>

      <g>
        {DESK_EDGES.map((e, i) => {
          const a = DESK_NODES[e.a];
          const b = DESK_NODES[e.b];
          const p = bendPath(a, b, e.bend);
          return (
            <g key={"de" + i}>
              <path d={p.d} fill="none" stroke="rgba(245,245,244,0.36)" strokeWidth="1.1" pathLength={1} className="ca-anim ca-edge" style={{ animationDelay: 1.6 + i * 0.07 + "s" }} />
              <g className="ca-anim ca-fade" style={{ animationDelay: 2.45 + i * 0.05 + "s" }}>
                <rect x={e.lx - (e.label.length * 5.3 + 14) / 2} y={e.ly - 7.5} width={e.label.length * 5.3 + 14} height="15" fill="#0b0b0c" />
                <text x={e.lx} y={e.ly + 3.4} textAnchor="middle" fontSize="9.5" fill="rgba(245,245,244,0.52)">{e.label}</text>
              </g>
            </g>
          );
        })}
      </g>

      <g className="ca-anim ca-fade" style={{ animationDelay: "3.95s" }}>
        <rect x="675" y="75" width="250" height="34" rx={2} fill="#1a1412" stroke="rgba(255,90,31,0.45)" />
        <circle cx="690" cy="92" r="3" fill={ACID} className="ca-anim ca-pulse" />
        <text x="701" y="95.5" fontSize="10.5" fill={PAPER}>почему выросли простои на дробилке?</text>
      </g>

      <g>
        <path d="M 782 109 Q 762 140 743 165" fill="none" stroke={ACID} strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 4" className="ca-anim ca-fade" style={{ animationDelay: "4.12s" }} />
        {[
          { a: DESK_NODES.equip, b: DESK_NODES.event, delay: 4.35, bend: 0.14 },
          { a: DESK_NODES.event, b: DESK_NODES.doc, delay: 4.9, bend: 0.12 },
        ].map((leg, i) => {
          const p = bendPath(leg.a, leg.b, leg.bend);
          return (
            <g key={"dp" + i}>
              <path d={p.d} fill="none" stroke={ACID} strokeOpacity="0.18" strokeWidth="8" pathLength={1} className="ca-anim ca-path" style={{ animationDelay: leg.delay + "s" }} />
              <path d={p.d} fill="none" stroke={ACID} strokeWidth="2.1" pathLength={1} className="ca-anim ca-path" style={{ animationDelay: leg.delay + "s" }} />
              <path d={p.d} fill="none" stroke="#ffb08a" strokeWidth="2" pathLength={1} className="ca-path-flow" strokeDasharray="0.045 0.09" style={{ animation: "ca-flow 1.6s linear infinite, ca-fade .4s ease both", animationDelay: leg.delay + 0.5 + "s, " + (leg.delay + 0.5) + "s" }} />
            </g>
          );
        })}
      </g>

      {Object.entries(DESK_NODES).map(([id, n], i) => (
        <GraphChip
          key={"dn" + id}
          node={n}
          delay={0.55 + i * 0.075}
          step={id === "equip" ? 1 : id === "event" ? 2 : id === "doc" ? 3 : undefined}
          stepDelay={4.45 + (id === "equip" ? 0 : id === "event" ? 0.45 : 0.95)}
        />
      ))}

      {LAYERS.map(([n, title, detail], i) => (
        <g key={"dl" + n} className="ca-anim ca-up" style={{ animationDelay: 3.0 + i * 0.16 + "s" }}>
          <rect x="656" y={530 + i * 33} width="290" height="27" fill="rgba(245,245,244,0.03)" stroke="rgba(245,245,244,0.1)" />
          <rect x="656" y={530 + i * 33} width="2" height="27" fill={ACID} opacity={i === 4 ? 1 : 0.5} />
          <text x="670" y={530 + i * 33 + 18} className="ca-mono" fontSize="9" fill="rgba(255,90,31,0.85)">{n}</text>
          <text x="694" y={530 + i * 33 + 18} fontSize="11.5" fill="rgba(245,245,244,0.9)">
            {title}<tspan dx="7" className="ca-mono" fontSize="9" fill="rgba(245,245,244,0.42)">{detail}</tspan>
          </text>
        </g>
      ))}

      <g className="ca-anim ca-up" style={{ animationDelay: "5.25s" }}>
        <rect x="966" y="530" width="226" height="164" fill="#101012" stroke="rgba(245,245,244,0.14)" />
        <text x="978" y="552" className="ca-mono" fontSize="9" letterSpacing="0.16em" fill="rgba(255,90,31,0.9)">ЖУРНАЛ</text>
        <text x="978" y="576" className="ca-mono" fontSize="8.5" fill="rgba(245,245,244,0.4)">вопрос</text>
        <text x="978" y="590" fontSize="10.5" fill="rgba(245,245,244,0.9)">почему выросли простои?</text>
        <text x="978" y="612" className="ca-mono" fontSize="8.5" fill="rgba(245,245,244,0.4)">источники · 3</text>
        <text x="978" y="626" className="ca-mono" fontSize="9" fill="rgba(245,245,244,0.7)">акт 214 · отчёт 10 · регламент</text>
        <text x="978" y="648" className="ca-mono" fontSize="8.5" fill="rgba(245,245,244,0.4)">цепочка</text>
        <text x="978" y="662" className="ca-mono" fontSize="9" fill="rgba(245,245,244,0.7)">оборудование → событие → документ</text>
        <text x="978" y="682" className="ca-mono" fontSize="8" fill="rgba(245,245,244,0.28)">04.10 · 14:22 · версия 7</text>
      </g>

      <text x="656" y="722" fontSize="10.5" fill="rgba(245,245,244,0.3)" className="ca-anim ca-fade" style={{ animationDelay: "5.85s" }}>ответ собран обходом связей, а не совпадением слов</text>
    </svg>
  );
}

function MobScene() {
  return (
    <svg viewBox="0 0 360 980" role="img" aria-labelledby="ca-t-m ca-d-m" className="ca-svg">
      <title id="ca-t-m">Разрозненные источники и связанная онтологией модель</title>
      <desc id="ca-d-m">Сверху документы и системы с пунктирными связями, ниже, те же объекты как сущности онтологии со слоями и журналом.</desc>
      <defs>
        <pattern id="ca-grid-m" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(245,245,244,0.045)" strokeWidth="1" />
        </pattern>
        <radialGradient id="ca-glow-m" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACID} stopOpacity="0.12" />
          <stop offset="100%" stopColor={ACID} stopOpacity="0" />
        </radialGradient>
        <marker id="ca-arrow-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill={ACID} />
        </marker>
      </defs>

      <rect width="360" height="980" fill="url(#ca-grid-m)" />
      <circle cx="250" cy="520" r="240" fill="url(#ca-glow-m)" />

      <text x="16" y="32" className="ca-mono ca-anim ca-fade" fontSize="9" letterSpacing="0.18em" fill="rgba(245,245,244,0.5)" style={{ animationDelay: T0 + "s" }}>КАК ЕСТЬ</text>
      <text x="16" y="48" className="ca-anim ca-fade" fontSize="11" fill="rgba(245,245,244,0.35)" style={{ animationDelay: T0 + 0.05 + "s" }}>разрозненные источники</text>

      <g>
        {MOB_CHAOS_LINKS.map((d, i) => (
          <path key={"mcl" + i} d={d} fill="none" stroke="rgba(245,245,244,0.2)" strokeWidth="1" strokeDasharray="3 6" className="ca-anim ca-chaos-link" />
        ))}
      </g>
      {MOB_CHAOS.map((c, i) => <ChaosChip key={"mcc" + i} {...c} compact />)}

      <text x="16" y="288" className="ca-mono" fontSize="9" letterSpacing="0.1em" fill="rgba(245,245,244,0.42)">6 источников · 4 формата</text>

      <g className="ca-anim ca-fade" style={{ animationDelay: "1.1s" }}>
        <line x1="180" y1="304" x2="180" y2="348" stroke={ACID} strokeWidth="1.2" strokeDasharray="4 6" markerEnd="url(#ca-arrow-m)" className="ca-anim ca-flow" />
        <text x="192" y="330" className="ca-mono" fontSize="8.5" letterSpacing="0.14em" fill="rgba(255,90,31,0.85)">ОНТОЛОГИЯ</text>
        <text x="192" y="344" fontSize="8.5" fill="rgba(245,245,244,0.32)">связи из типов</text>
      </g>

      <text x="16" y="382" className="ca-mono ca-anim ca-fade" fontSize="9" letterSpacing="0.18em" fill="rgba(245,245,244,0.5)" style={{ animationDelay: T0 + 0.1 + "s" }}>С ОНТОЛОГИЕЙ</text>

      {MOB_EDGES.map((e, i) => {
        const a = MOB_NODES[e.a];
        const b = MOB_NODES[e.b];
        const p = bendPath(a, b, e.bend);
        return <path key={"me" + i} d={p.d} fill="none" stroke="rgba(245,245,244,0.26)" strokeWidth="1" pathLength={1} className="ca-anim ca-edge" style={{ animationDelay: 1.9 + i * 0.07 + "s" }} />;
      })}

      <g className="ca-anim ca-fade" style={{ animationDelay: "3.85s" }}>
        <rect x="16" y="388" width="230" height="32" rx={2} fill="#1a1412" stroke="rgba(255,90,31,0.45)" />
        <circle cx="30" cy="404" r="2.6" fill={ACID} className="ca-anim ca-pulse" />
        <text x="40" y="407.5" fontSize="9.5" fill={PAPER}>почему выросли простои?</text>
      </g>

      <g>
        {[
          { a: MOB_NODES.equip, b: MOB_NODES.event, delay: 4.2 },
          { a: MOB_NODES.event, b: MOB_NODES.doc, delay: 4.7 },
        ].map((leg, i) => {
          const p = bendPath(leg.a, leg.b, 0.1);
          return (
            <g key={"mp" + i}>
              <path d={p.d} fill="none" stroke={ACID} strokeOpacity="0.18" strokeWidth="8" pathLength={1} className="ca-anim ca-path" style={{ animationDelay: leg.delay + "s" }} />
              <path d={p.d} fill="none" stroke={ACID} strokeWidth="2.1" pathLength={1} className="ca-anim ca-path" style={{ animationDelay: leg.delay + "s" }} />
              <path d={p.d} fill="none" stroke="#ffb08a" strokeWidth="2" pathLength={1} className="ca-path-flow" strokeDasharray="0.045 0.09" style={{ animation: "ca-flow 1.6s linear infinite, ca-fade .4s ease both", animationDelay: leg.delay + 0.5 + "s, " + (leg.delay + 0.5) + "s" }} />
            </g>
          );
        })}
      </g>

      {Object.entries(MOB_NODES).map(([id, n], i) => (
        <GraphChip
          key={"mn" + id}
          node={n}
          delay={0.6 + i * 0.07}
          compact
          step={id === "equip" ? 1 : id === "event" ? 2 : id === "doc" ? 3 : undefined}
          stepDelay={4.3 + (id === "equip" ? 0 : id === "event" ? 0.45 : 0.95)}
        />
      ))}

      {LAYERS.map(([n, title, detail], i) => (
        <g key={"ml" + n} className="ca-anim ca-up" style={{ animationDelay: 3.0 + i * 0.15 + "s" }}>
          <rect x="16" y={680 + i * 31} width="328" height="26" fill="rgba(245,245,244,0.03)" stroke="rgba(245,245,244,0.1)" />
          <rect x="16" y={680 + i * 31} width="2" height="26" fill={ACID} opacity={i === 4 ? 1 : 0.5} />
          <text x="28" y={680 + i * 31 + 17} className="ca-mono" fontSize="8.5" fill="rgba(255,90,31,0.85)">{n}</text>
          <text x="50" y={680 + i * 31 + 17} fontSize="11" fill="rgba(245,245,244,0.9)">
            {title}<tspan dx="6" className="ca-mono" fontSize="8.5" fill="rgba(245,245,244,0.42)">{detail}</tspan>
          </text>
        </g>
      ))}

      <g className="ca-anim ca-up" style={{ animationDelay: "5.2s" }}>
        <rect x="16" y="844" width="328" height="118" fill="#101012" stroke="rgba(245,245,244,0.14)" />
        <text x="28" y="864" className="ca-mono" fontSize="9" letterSpacing="0.16em" fill="rgba(255,90,31,0.9)">ЖУРНАЛ</text>
        <text x="28" y="884" className="ca-mono" fontSize="8" fill="rgba(245,245,244,0.4)">вопрос</text>
        <text x="28" y="897" fontSize="10" fill="rgba(245,245,244,0.9)">почему выросли простои?</text>
        <text x="28" y="914" className="ca-mono" fontSize="8" fill="rgba(245,245,244,0.4)">источники · 3</text>
        <text x="28" y="927" className="ca-mono" fontSize="8.5" fill="rgba(245,245,244,0.7)">акт 214 · отчёт 10 · регламент</text>
        <text x="28" y="944" className="ca-mono" fontSize="8.5" fill="rgba(245,245,244,0.7)">оборудование → событие → документ</text>
        <text x="28" y="958" className="ca-mono" fontSize="7.5" fill="rgba(245,245,244,0.28)">04.10 · 14:22 · версия 7</text>
      </g>
    </svg>
  );
}

export default function CoreAnimation({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setActive(e.isIntersecting && e.intersectionRatio >= 0.12);
      },
      { threshold: [0, 0.12, 0.4, 0.75] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={"ca " + className} data-active={active ? "true" : "false"}>
      <style>{CSS}</style>
      <div className="ca-frame" key={runId}>
        <div className="ca-desk"><DeskScene /></div>
        <div className="ca-mob"><MobScene /></div>
      </div>
      <div className="ca-bar">
        <span className="ca-key"><i />путь ответа</span>
        <button type="button" className="ca-replay" onClick={() => setRunId((v) => v + 1)}>↻ повторить</button>
      </div>
    </div>
  );
}
