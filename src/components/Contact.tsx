const contacts = [
  // TODO: replace with the real EA Dev email
  { label: "hello@eadev.com", href: "mailto:hello@eadev.com" },
  // TODO: replace with the real EA Dev GitHub org
  { label: "github.com/eadev", href: "https://github.com/eadev" },
  // TODO: replace with the real EA Dev Instagram
  { label: "@eadev", href: "https://instagram.com/eadev" },
  // TODO: replace with the real EA Dev LinkedIn
  { label: "linkedin.com/company/eadev", href: "https://linkedin.com/company/eadev" },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-[clamp(36px,7vw,96px)] font-bold leading-[1.02] tracking-tight">
          Have a project in mind?
        </h2>
        <p className="mt-6 text-[clamp(18px,2.5vw,28px)] text-text-secondary">
          Let&apos;s build something great.
        </p>

        <a
          href="mailto:hello@eadev.com"
          data-cursor="link"
          className="mt-10 inline-block rounded-full bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
        >
          Start a project →
        </a>

        <ul className="mt-16 flex flex-col flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-widest text-text-secondary md:flex-row md:gap-8">
          {contacts.map((contact) => (
            <li key={contact.href}>
              <a
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor="link"
                className="transition-colors hover:text-accent"
              >
                {contact.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
