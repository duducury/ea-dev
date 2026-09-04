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

      gsap.to(el.querySelector(".hero-parallax"), {
        x: px * 12,
        y: py * 12,
        duration: 0.8,
        ease: "power2.out",
      });

      tiltY(px * 10);
      tiltX(-py * 10);
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
        className="pointer-events-none absolute bottom-0 right-0 hidden lg:block"
        style={{ width: "min(46vw, 700px)", perspective: "1600px" }}
      >
        <div className="relative" style={{ aspectRatio: "1536 / 1024" }}>
          <div
            aria-hidden="true"
            className="hero-parallax ambient-glow absolute right-[10%] top-[-6%] h-40 w-40 rounded-full opacity-60 blur-3xl"
            style={{ background: "var(--color-accent-glow)" }}
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
              sizes="46vw"
              className="object-contain object-bottom"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 22%)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 22%)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-start justify-between gap-10">
        <div className="max-w-3xl">
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
      </div>

      <div className="absolute bottom-10 left-6 flex items-center gap-3 text-xs uppercase tracking-widest text-text-secondary md:left-10">
        <span className="h-8 w-px animate-pulse bg-border-strong" />
        {t.hero.scroll}
      </div>
    </section>
  );
}
