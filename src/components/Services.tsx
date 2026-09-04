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
      className="sticky top-0 z-0 bg-bg px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.services.eyebrow}
        </p>
        <h2 className="max-w-3xl text-[clamp(36px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          {t.services.title}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {t.services.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <div
                key={service.title}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                className="service-card rounded-2xl border border-border bg-surface p-8 md:p-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border-strong bg-black">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-text">
                  {service.title}
                </h3>
                <p className="mt-3 text-text-secondary">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
