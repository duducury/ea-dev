"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Pricing() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");

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
          stagger: 0.1,
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

  return (
    <section id="pricing" className="relative z-10 bg-white px-6 py-16 text-black md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl" ref={rootRef}>
        <div className="mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/70">
            {t.pricing.eyebrow}
          </p>
        </div>
        <h2 className="max-w-3xl text-[clamp(32px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          {t.pricing.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-black/60 md:text-lg">{t.pricing.note}</p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-16 lg:grid-cols-4">
          {t.pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className="pricing-card group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_0_40px_-12px_var(--color-accent-glow)] md:rounded-3xl md:p-8"
            >
              <h3 className="text-lg font-bold text-text md:text-xl">{plan.name}</h3>
              <p className="mt-2 text-2xl font-bold text-accent md:text-3xl">{plan.price}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.footnote && (
                <p className="mt-4 text-xs italic text-text-secondary/70">{plan.footnote}</p>
              )}

              <a
                href="#contact"
                data-cursor="link"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-accent px-6 py-3 text-xs font-semibold uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-black"
              >
                {t.pricing.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
