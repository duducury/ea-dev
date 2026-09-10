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
    <section className="relative z-10 bg-bg px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl" ref={rootRef}>
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-accent md:mb-8">
          {t.forWho.eyebrow}
        </p>
        <h2 className="max-w-3xl text-[clamp(32px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          {t.forWho.title}
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:gap-8 md:mt-28 md:gap-12">
          {t.forWho.categories.map((category, i) => (
            <a
              key={category.name}
              href="#contact"
              data-cursor="view"
              className="audience-card group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-500 hover:border-accent/50 md:rounded-3xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
                <Image
                  src={images[i]}
                  alt={`${category.name} — ${category.description}`}
                  fill
                  sizes="(min-width: 768px) 45vw, 45vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-7 md:p-10">
                <span className="flex items-center gap-2.5 font-mono text-[10px] font-semibold text-accent sm:text-xs">
                  0{i + 1}
                  <span className="h-px w-5 bg-accent/50" aria-hidden="true" />
                </span>

                <h3 className="mt-4 text-base font-bold uppercase tracking-wide text-white sm:mt-5 sm:text-xl md:text-[26px]">
                  {category.name}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-white/60 sm:mt-4 sm:text-sm md:text-base">
                  {category.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent sm:mt-8">
                  {t.forWho.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
