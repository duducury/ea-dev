"use client";

import { useRef } from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { developers } from "@/data/developers";

function DeveloperCard({ dev }: { dev: (typeof developers)[number] }) {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      x: x * 12,
      y: y * 12,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleEnter = () => {
    if (reducedMotion) return;
    gsap.to(avatarRef.current, { scale: 1.08, duration: 0.5, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (reducedMotion) return;
    gsap.to(cardRef.current, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(avatarRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-4 transition-colors duration-300 hover:border-accent sm:p-8 md:p-12"
    >
      <div
        ref={avatarRef}
        className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border border-border-strong sm:h-40 sm:w-40 md:h-48 md:w-48"
      >
        <Image
          src={dev.photo}
          alt={dev.name}
          fill
          sizes="192px"
          className="object-cover"
        />
      </div>

      <div className="mt-3 text-center sm:mt-6">
        <h3 className="text-lg font-bold text-text sm:text-2xl">{dev.name}</h3>
        <p className="text-[10px] uppercase tracking-widest text-text-secondary sm:text-sm">
          {dev.role[language]}
        </p>
      </div>

      <p className="mt-2 line-clamp-4 text-center text-xs text-text-secondary sm:mt-4 sm:line-clamp-none sm:text-base">
        {dev.bio[language]}
      </p>

      <div className="mt-3 flex justify-center gap-3 sm:mt-6 sm:gap-5">
        <a
          href={dev.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          aria-label={`${dev.name} on GitHub`}
          className="text-text-secondary transition-colors hover:text-accent"
        >
          <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </a>
        <a
          href={dev.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          aria-label={`${dev.name} on LinkedIn`}
          className="text-text-secondary transition-colors hover:text-accent"
        >
          <LinkedinIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </a>
      </div>
    </div>
  );
}

export default function Developers() {
  const { t } = useLanguage();

  return (
    <section id="developers" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.developers.eyebrow}
        </p>
        <h2 className="max-w-3xl text-[clamp(36px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          {t.developers.title}
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-6">
          {developers.map((dev) => (
            <DeveloperCard key={dev.name} dev={dev} />
          ))}
        </div>
      </div>
    </section>
  );
}
