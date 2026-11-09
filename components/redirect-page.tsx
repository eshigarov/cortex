export function RedirectPage({
  to,
  title,
  text,
}: {
  to: string;
  title: string;
  text: string;
}) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <section className="wrap py-24">
        <h1 className="h2 mt-4 max-w-[24ch]">{title}</h1>
        <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-[var(--color-ink)]/70">{text}</p>
        <a href={to} className="btn btn-primary mt-8">
          Перейти →
        </a>
      </section>
    </>
  );
}
