export default function ContactPage() {
  return (
    <section className="border-b border-[var(--color-line)]">
      <div className="wrap grid gap-16 py-24 md:grid-cols-[0.9fr_1.1fr] md:py-32">
        <div>
          <span className="eyebrow">контакт</span>
          <h1 className="display mt-5 max-w-[14ch]">Пилот на ваших данных</h1>
          <p className="mt-8 max-w-[46ch] text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            Две недели. Загружаем корпус, собираем граф, отвечаем на десять ваших вопросов.
            В конце — замеры и журнал. Пилот платный, фиксированная сумма; первым 2–3 компаниям бесплатно
            в обмен на право описать сценарий.
          </p>

          <div className="mt-12 space-y-6 border-t border-[var(--color-line)] pt-6 text-[14px]">
            <div>
              <div className="eyebrow mb-1">почта</div>
              <a className="underline decoration-[var(--color-acid)] decoration-2 underline-offset-4" href="mailto:hello@cortex.ai">
                hello@cortex.ai
              </a>
            </div>
            <div>
              <div className="eyebrow mb-1">что прислать</div>
              <p className="text-[var(--color-mute)]">
                Отрасль, объём документов, где они лежат и один вопрос, на который сейчас долго ищете ответ.
              </p>
            </div>
            <div>
              <div className="eyebrow mb-1">что получите</div>
              <p className="text-[var(--color-mute)]">
                Ответы на ваш список вопросов, замеры времени и журнал решений. Без презентаций.
              </p>
            </div>
          </div>
        </div>

        <form className="border border-[var(--color-line)] bg-white/40 p-7 md:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow">имя</span>
              <input
                className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                placeholder="Как к вам обращаться"
              />
            </label>
            <label className="block">
              <span className="eyebrow">компания</span>
              <input
                className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                placeholder="Название"
              />
            </label>
            <label className="block">
              <span className="eyebrow">почта</span>
              <input
                type="email"
                className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                placeholder="name@company.ru"
              />
            </label>
            <label className="block">
              <span className="eyebrow">отрасль</span>
              <input
                className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                placeholder="ГМК, энергетика, финансы"
              />
            </label>
          </div>

          <label className="mt-6 block">
            <span className="eyebrow">задача</span>
            <textarea
              rows={4}
              className="mt-2 w-full resize-none border-b border-[var(--color-line)] bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
              placeholder="Что сейчас ищете долго или не можете найти вовсе"
            />
          </label>

          <button type="button" className="btn btn-primary mt-7 w-full justify-center">
            Отправить запрос <span aria-hidden>→</span>
          </button>
          <p className="mt-3 text-[11.5px] text-[var(--color-mute)]">
            Форма демонстрационная: отправка подключается на этапе интеграции.
          </p>
        </form>
      </div>
    </section>
  );
}
