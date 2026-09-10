"use client";

import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons/BrandIcons";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
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
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(".contact-reveal");

      if (reducedMotion) {
        gsap.set(els, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        els,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="contact" className="services-atmosphere relative z-10 px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl text-center" ref={rootRef}>
        <h2 className="contact-reveal text-[clamp(36px,7vw,96px)] font-bold leading-[1.02] tracking-tight">
          {t.contact.title}
        </h2>
        <p className="contact-reveal mt-6 text-[clamp(18px,2.5vw,28px)] text-text-secondary">
          {t.contact.subtitle}
        </p>

        <a
          href="mailto:hello@eadev.com"
          data-cursor="link"
          className="contact-reveal mt-10 inline-block rounded-full bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-widest text-black shadow-[0_0_0_0_var(--color-accent-glow)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_10px_var(--color-accent-glow)]"
        >
          {t.contact.cta}
        </a>

        <ul className="contact-reveal mt-10 flex flex-col flex-wrap items-center justify-center gap-5 text-sm uppercase tracking-widest text-text-secondary md:mt-16 md:flex-row md:gap-8">
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
