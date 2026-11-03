export const metadata = { robots: { index: false, follow: false } };

import AnswerPath from "@/components/answer-path";

export default function Preview() {
  return (
    <main className="mx-auto max-w-[1240px] px-10 py-16">
      <span className="eyebrow">как это работает</span>
      <h2 className="h2 mt-4 max-w-[26ch]">Путь ответа: от вопроса до решения</h2>
      <AnswerPath />
    </main>
  );
}
