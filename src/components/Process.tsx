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
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".process-step");

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, x: 0 });
        gsap.set(lineFillRef.current, { scaleY: 1 });
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

      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineTrackRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="relative z-10 bg-bg px-6 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl" ref={rootRef}>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.process.eyebrow}
        </p>
        <h2 className="max-w-3xl text-[clamp(32px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          {t.process.title}
        </h2>

        <div className="relative mt-8 flex flex-col md:mt-14" ref={lineTrackRef}>
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[18px] top-0 w-px bg-border md:left-[22px]"
          />
          <div
            ref={lineFillRef}
            aria-hidden="true"
            className="absolute bottom-0 left-[18px] top-0 w-px origin-top bg-accent md:left-[22px]"
          />
          {t.process.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={step.number}
                className="process-step relative flex flex-col gap-2 overflow-hidden border-t border-border py-4 md:flex-row md:items-center md:gap-10 md:py-7"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-4 select-none text-[80px] font-bold leading-none text-white/[0.03] md:-top-6 md:text-[140px]"
                >
                  {step.number}
                </span>
                <div className="flex items-center gap-3 md:w-56 md:gap-4">
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface md:h-11 md:w-11">
                    <Icon className="h-4 w-4 text-accent md:h-5 md:w-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs text-accent md:text-sm">{step.number}</span>
                  <h3 className="text-lg font-semibold text-text md:text-2xl">{step.title}</h3>
                </div>
                <p className="relative pl-7 text-sm text-text-secondary md:pl-0 md:text-base">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
