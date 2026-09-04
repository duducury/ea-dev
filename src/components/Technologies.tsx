import { technologies } from "@/data/technologies";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...technologies, ...technologies];

  return (
    <div className="overflow-hidden">
      <div className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}>
        {items.map((tech, i) => (
          <span
            key={tech + i}
            className="mx-4 whitespace-nowrap text-2xl font-semibold text-text-secondary md:text-4xl"
          >
            {tech}
            <span className="ml-8 text-accent" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Technologies() {
  return (
    <section
      aria-label="Technologies"
      className="relative z-10 border-y border-border bg-bg py-20"
    >
      <div className="flex flex-col gap-6">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
