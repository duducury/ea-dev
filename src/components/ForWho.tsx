"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const images = [
  "/construction.png",
  "/remodeling.png",
  "/landscaping.png",
  "/restaurant.png",
  "/retail.png",
  "/smallbusines.png",
];

export default function ForWho() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".audience-card");

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
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
    <section className="relative z-10 bg-bg px-6 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl" ref={rootRef}>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.forWho.eyebrow}
        </p>
        <h2 className="max-w-3xl text-[clamp(32px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          {t.forWho.title}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 md:gap-6">
          {t.forWho.categories.map((category, i) => (
            <a
              key={category.name}
              href="#contact"
              data-cursor="view"
              className="audience-card group relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-500 hover:border-accent/50 sm:aspect-[16/10] md:rounded-3xl"
            >
              <Image
                src={images[i]}
                alt={`${category.name} — ${category.description}`}
                fill
                sizes="(min-width: 768px) 45vw, 92vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/50" />

              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[inset_0_0_60px_8px_var(--color-accent-glow)] transition-opacity duration-500 group-hover:opacity-100 md:rounded-3xl" />

              <span className="absolute left-4 top-4 font-mono text-xs font-semibold text-white/70 md:left-6 md:top-6">
                0{i + 1}
              </span>

              <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
                <h3 className="text-lg font-bold uppercase tracking-wide text-white sm:text-xl md:text-2xl">
                  {category.name}
                </h3>

                <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:mt-2 group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-sm pt-1 text-xs leading-snug text-white/75 sm:text-sm">
                      {category.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                      {t.forWho.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
