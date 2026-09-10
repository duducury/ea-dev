"use client";

import { useEffect, useRef, useState } from "react";
import { HardHat, PaintRoller, Trees, UtensilsCrossed, ShoppingBag, Store } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const icons = [HardHat, PaintRoller, Trees, UtensilsCrossed, ShoppingBag, Store];

export default function ForWho() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".audience-card");

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
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

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {t.forWho.categories.map((category, i) => {
            const Icon = icons[i];
            const isActive = activeIndex === i;
            return (
              <div
                key={category.name}
                onClick={() => setActiveIndex((cur) => (cur === i ? null : i))}
                className="audience-card group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent/40 md:aspect-[4/3]"
              >
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:opacity-0 ${
                    isActive ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100"
                  }`}
                >
                  <Icon className="h-6 w-6 text-accent md:h-8 md:w-8" strokeWidth={1.5} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-text sm:text-sm">
                    {category.name}
                  </span>
                </div>

                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/95 p-4 text-center transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  <p className="text-xs leading-snug text-text-secondary sm:text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
