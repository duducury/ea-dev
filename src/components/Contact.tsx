"use client";

import { Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons/BrandIcons";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const contacts = [
  // TODO: replace with the real EA Dev email
  { label: "hello@eadev.com", href: "mailto:hello@eadev.com", Icon: Mail },
  // TODO: replace with the real EA Dev GitHub org
  { label: "github.com/eadev", href: "https://github.com/eadev", Icon: GithubIcon },
  // TODO: replace with the real EA Dev Instagram
  { label: "@eadev", href: "https://instagram.com/eadev", Icon: InstagramIcon },
  // TODO: replace with the real EA Dev LinkedIn
  { label: "linkedin.com/company/eadev", href: "https://linkedin.com/company/eadev", Icon: LinkedinIcon },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative z-10 bg-bg px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-[clamp(36px,7vw,96px)] font-bold leading-[1.02] tracking-tight">
          {t.contact.title}
        </h2>
        <p className="mt-6 text-[clamp(18px,2.5vw,28px)] text-text-secondary">
          {t.contact.subtitle}
        </p>

        <a
          href="mailto:hello@eadev.com"
          data-cursor="link"
          className="mt-10 inline-block rounded-full bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
        >
          {t.contact.cta}
        </a>

        <ul className="mt-16 flex flex-col flex-wrap items-center justify-center gap-5 text-sm uppercase tracking-widest text-text-secondary md:flex-row md:gap-8">
          {contacts.map(({ label, href, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor="link"
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
