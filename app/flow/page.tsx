import CoreFlow from "@/components/core-flow";

export const metadata = { title: "Анимация ядра, Cortex" };

export default function FlowPage() {
  return (
    <main className="min-h-screen bg-[#0c0e12] py-10">
      <div className="mx-auto max-w-[1500px] px-4">
        <p className="mb-3 font-mono text-[11px] text-white/35">
          как это работает · демо-страница анимации
        </p>
      </div>
      <CoreFlow />
    </main>
  );
}
