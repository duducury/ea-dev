"use client";

import { useEffect, useRef } from "react";
import { Compass, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const icons = [Compass, PenTool, Code2, Rocket, TrendingUp];

export default function Process() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".process-step");

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, x: 0 });
        return;
      }

      gsap.fromTo(
        rows,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl" ref={rootRef}>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.process.eyebrow}
        </p>
        <h2 className="max-w-3xl text-[clamp(36px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          {t.process.title}
        </h2>

        <div className="mt-16 flex flex-col">
          {t.process.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={step.number}
                className="process-step flex flex-col gap-4 border-t border-border py-8 md:flex-row md:items-center md:gap-10"
              >
                <div className="flex items-center gap-4 md:w-56">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-sm text-accent">{step.number}</span>
                  <h3 className="text-2xl font-semibold text-text">{step.title}</h3>
                </div>
                <p className="text-text-secondary">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
