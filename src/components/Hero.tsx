"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const revealRef = useRef<HTMLDivElement>(null);
  const photoTiltRef = useRef<HTMLDivElement>(null);
  const photoFloatRef = useRef<HTMLDivElement>(null);
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
    if (reducedMotion || !photoFloatRef.current) return;

    const idle = gsap.to(photoFloatRef.current, {
      y: -14,
      duration: 4.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      idle.kill();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const tiltX = gsap.quickTo(photoTiltRef.current, "rotateX", {
      duration: 0.8,
      ease: "power2.out",
    });
    const tiltY = gsap.quickTo(photoTiltRef.current, "rotateY", {
      duration: 0.8,
      ease: "power2.out",
    });

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const px = e.clientX / innerWidth - 0.5;
      const py = e.clientY / innerHeight - 0.5;

      tiltY(px * 18);
      tiltX(-py * 18);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex flex-col justify-center overflow-hidden px-6 pt-24 pb-10 md:min-h-screen md:px-10"
    >
      <div className="flex flex-col items-start justify-between gap-10">
        <div className="max-w-3xl">
          <div className="relative z-10">
            <h1
              className={`font-bold uppercase leading-[0.95] tracking-tight text-text ${
                t.hero.headline.length > 30
                  ? "text-[clamp(30px,7.5vw,88px)]"
                  : "text-[clamp(56px,10vw,140px)]"
              }`}
            >
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

              <div className="mt-8 flex flex-wrap items-center gap-4">
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

          <div
            aria-hidden="true"
            className="pointer-events-none relative mt-6 w-full sm:absolute sm:mt-0 sm:w-[clamp(280px,82vw,1180px)] sm:-bottom-[4%] sm:-right-[4%]"
            style={{ perspective: "1100px" }}
          >
            <div ref={photoFloatRef} className="relative" style={{ aspectRatio: "1536 / 1024" }}>
              <div
                aria-hidden="true"
                className="ambient-glow absolute right-[8%] top-[-10%] aspect-square w-[32%] rounded-full opacity-90 blur-2xl"
              />

              <div
                ref={photoTiltRef}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/fundo.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 62vw, (min-width: 640px) 82vw, 100vw"
                  className="object-contain object-bottom"
                  style={{
                    maskImage: "linear-gradient(to right, transparent, black 30%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 flex items-center gap-3 text-xs uppercase tracking-widest text-text-secondary md:left-10">
        <span className="h-8 w-px animate-pulse bg-border-strong" />
        {t.hero.scroll}
      </div>
    </section>
  );
}
