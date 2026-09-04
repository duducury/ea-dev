"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LaptopVisual, ServerVisual, PhoneVisual, DashboardVisual } from "./ServiceVisuals";

const visuals = [LaptopVisual, ServerVisual, PhoneVisual, DashboardVisual];

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

  return (
    <>
      <section
        id="services"
        ref={rootRef}
        className="relative z-0 bg-bg px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.services.eyebrow}
          </p>
          <h2 className="max-w-3xl text-[clamp(28px,5vw,64px)] font-bold leading-[1.05] tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm text-text-secondary md:text-lg">
            {t.services.subtitle}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:gap-6">
            {t.services.items.map((service, i) => {
              const Visual = visuals[i];
              return (
                <div
                  key={service.title}
                  className="service-card group relative flex flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0a0a0a] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_0_40px_-12px_var(--color-accent-glow)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/10]">
                    <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
                    <div className="h-full w-full scale-105 transition-transform duration-500 ease-out group-hover:scale-[1.12]">
                      <Visual />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-3.5 md:p-6">
                    <h3 className="text-sm font-bold text-text md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-xs leading-snug text-text-secondary md:mt-3 md:text-base">
                      {service.description}
                    </p>

                    <div className="mt-3 flex justify-end md:mt-6">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/20 md:h-10 md:w-10">
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 md:h-4 md:w-4"
                          strokeWidth={2}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="sticky top-0 z-0 min-h-[130vh] bg-bg" />
    </>
  );
}
