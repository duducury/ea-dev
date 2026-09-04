"use client";

import { useEffect, useRef } from "react";
import { Globe, Database, ShoppingCart, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const icons = [Globe, Database, ShoppingCart, Sparkles];

export default function Services() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    gsap.to(e.currentTarget, {
      y: -8,
      borderColor: "var(--color-accent)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    gsap.to(e.currentTarget, {
      y: 0,
      borderColor: "var(--color-border)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="services"
      ref={rootRef}
      className="sticky top-0 min-h-[230vh] bg-bg px-6 md:px-10"
    >
      <div className="mx-auto w-full max-w-7xl pb-16 pt-28 md:pt-32">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.services.eyebrow}
        </p>
        <h2 className="max-w-3xl text-[clamp(26px,4.2vw,56px)] font-bold leading-[1.05] tracking-tight">
          {t.services.title}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-4 md:gap-5">
          {t.services.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <div
                key={service.title}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                className="service-card rounded-2xl border border-border bg-surface p-4 md:p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-black md:h-11 md:w-11">
                  <Icon className="h-4 w-4 text-accent md:h-5 md:w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-text md:mt-4 md:text-lg">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-xs leading-snug text-text-secondary md:mt-2 md:text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
