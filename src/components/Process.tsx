"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const steps = [
  { number: "01", title: "Discover", description: "Understand the business and its goals." },
  { number: "02", title: "Design", description: "Create the visual direction and user experience." },
  { number: "03", title: "Build", description: "Develop the website or system." },
  { number: "04", title: "Launch", description: "Deploy, test and deliver." },
  { number: "05", title: "Grow", description: "Improve and maintain the product." },
];

export default function Process() {
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
          Process
        </p>
        <h2 className="max-w-3xl text-[clamp(36px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          How we work.
        </h2>

        <div className="mt-16 flex flex-col">
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-step flex flex-col gap-2 border-t border-border py-8 md:flex-row md:items-center md:gap-10"
            >
              <span className="font-mono text-sm text-accent">{step.number}</span>
              <h3 className="text-2xl font-semibold text-text md:w-48">
                {step.title}
              </h3>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
