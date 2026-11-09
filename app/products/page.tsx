import Link from "next/link";

export default function ProductsRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=../core/" />
      <section className="wrap py-24">
        <h1 className="h2 mt-4 max-w-[24ch]">Модули описаны на странице Cortex Core</h1>
        <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-[var(--color-ink)]/70">
          Отдельной страницы «Продукты» больше нет: продукт один, модули, его части.
        </p>
        <Link href="/core" className="btn btn-primary mt-8">
          Перейти к Cortex Core →
        </Link>
      </section>
    </>
  );
}
