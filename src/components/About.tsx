export default function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          About EA Dev
        </p>
        <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-snug tracking-tight text-text">
          We don&apos;t just build websites. We build digital tools that help
          businesses grow.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
          We work directly with businesses to understand what they actually
          need, then design and build it — whether that&apos;s a simple
          website or a full system with a database, an admin panel and
          business logic behind it. No templates, no shortcuts.
        </p>
      </div>
    </section>
  );
}
