import type { Metadata } from "next";
import ScenariosExplorer from "@/components/scenarios-explorer";

export const metadata: Metadata = {
  title: "Сценарии применения Cortex",
  description:
    "Десять сценариев: производство, логистика, лизинг, проектирование, ритейл, энергетика, нефтегаз, страхование, фарма, договорная работа. Фильтры по отрасли и направлению, эффект и метрики пилота.",
};

export default function ScenariosPage() {
  return (
    <section className="wrap py-24">
      <h1 className="h2 mt-4 max-w-[26ch]">Где ядро убирает ручную работу</h1>
      <p className="mt-6 max-w-[68ch] text-[15px] leading-relaxed text-[var(--color-mute)]">
        Десять отраслей и доменов. Выберите отрасль и направление, можно несколько. В карточке, суть и эффект,
        внутри, механика, цифры и анимация пути.
      </p>
      <ScenariosExplorer />
      <p className="mt-10 max-w-[70ch] text-[12px] leading-relaxed text-[var(--color-mute)]">
        Эффекты, проектные ориентиры, а не результат завершённого внедрения: в пилоте фиксируем исходные значения и итог.
      </p>
    </section>
  );
}
