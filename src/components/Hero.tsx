"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Hero3DVisual from "./Hero3DVisual";

export default function Hero() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const revealRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    wordsRef.current = [];
  }, [t.hero.headline]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(wordsRef.current, { y: "0%" });
        gsap.set(revealRef.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        wordsRef.current,
        { y: "110%" },
        { y: "0%", duration: 0.9, stagger: 0.08 }
      ).fromTo(
        revealRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion, t.hero.headline]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = rootRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      gsap.to(el.querySelector(".hero-parallax"), {
        x,
        y,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-32 pb-16 md:px-10"
    >
      <div
        aria-hidden="true"
        className="hero-parallax pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "var(--color-accent-glow)" }}
      />

      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div className="max-w-6xl">
          <h1 className="text-[clamp(56px,10vw,140px)] font-bold uppercase leading-[0.95] tracking-tight text-text">
            {t.hero.headline.split(" ").map((word, i) => (
              <span key={word + i} className="text-reveal-word mr-4">
                <span
                  ref={(el) => {
                    if (el) wordsRef.current[i] = el;
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div ref={revealRef} className="mt-8 max-w-xl">
            <p className="text-[clamp(18px,2.5vw,28px)] text-text-secondary">
              {t.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                data-cursor="link"
                className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
              >
                {t.hero.ctaWork}
              </a>
              <a
                href="#contact"
                data-cursor="link"
                className="rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:border-accent hover:text-accent"
              >
                {t.hero.ctaContact}
              </a>
            </div>
          </div>
        </div>

        <Hero3DVisual />
      </div>

      <div className="absolute bottom-10 left-6 flex items-center gap-3 text-xs uppercase tracking-widest text-text-secondary md:left-10">
        <span className="h-8 w-px animate-pulse bg-border-strong" />
        {t.hero.scroll}
      </div>
    </section>
  );
}
