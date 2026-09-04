"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const cardImages = [
  { src: "/img1.png", position: "object-center" },
  { src: "/img2.png", position: "object-center" },
  { src: "/img3.png", position: "object-top" },
  { src: "/img4.png", position: "object-center" },
];

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
    <section
      id="services"
      ref={rootRef}
      className="services-atmosphere sticky top-0 z-0 min-h-[128vh] px-6 pb-6 pt-24 md:px-10 md:pb-16 md:pt-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.services.eyebrow}
        </p>
        <h2 className="max-w-3xl text-[clamp(24px,5vw,64px)] font-bold leading-[1.08] tracking-tight">
          {t.services.title}
        </h2>
        <p className="services-subtitle mt-3 max-w-xl text-sm text-text-secondary md:mt-4 md:text-lg">
          {t.services.subtitle}
        </p>

        <div className="services-grid mt-5 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-4 md:gap-5">
          {t.services.items.map((service, i) => {
            const image = cardImages[i];
            return (
              <div
                key={service.title}
                className="service-card group relative flex flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[rgba(8,10,10,0.82)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_0_40px_-12px_var(--color-accent-glow)] md:rounded-[24px]"
              >
                <div className="service-card-image relative h-[115px] overflow-hidden sm:h-[130px] md:aspect-[3/2] md:h-auto">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 24vw, 45vw"
                    className={`object-cover ${image.position} scale-105 transition-transform duration-500 ease-out group-hover:scale-[1.1]`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(8,10,10,0.95)] via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-3 md:p-5">
                  <h3 className="text-xs font-bold text-text sm:text-sm md:text-lg">
                    {service.title}
                  </h3>
                  <p className="mt-1 flex-1 text-[11px] leading-snug text-text-secondary sm:text-xs md:mt-2 md:text-sm">
                    {service.description}
                  </p>

                  <div className="mt-2 flex justify-end md:mt-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/20 md:h-9 md:w-9">
                      <ArrowRight
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 md:h-4 md:w-4"
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
  );
}
