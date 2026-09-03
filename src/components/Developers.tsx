"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { developers } from "@/data/developers";

function DeveloperCard({ dev }: { dev: (typeof developers)[number] }) {
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
      className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent md:p-12"
    >
      <div className="overflow-hidden rounded-2xl border border-border-strong">
        {/* TODO: replace with a real photo of {dev.name} */}
        <div
          ref={avatarRef}
          className="flex aspect-square w-full items-center justify-center bg-black text-8xl font-bold text-accent"
        >
          {dev.initial}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-text">{dev.name}</h3>
          <p className="text-sm uppercase tracking-widest text-text-secondary">
            {dev.role}
          </p>
        </div>
      </div>

      <p className="mt-4 text-text-secondary">{dev.bio}</p>

      <div className="mt-6 flex gap-4">
        <a
          href={dev.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="text-xs font-semibold uppercase tracking-widest text-text-secondary transition-colors hover:text-accent"
        >
          GitHub
        </a>
        <a
          href={dev.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="text-xs font-semibold uppercase tracking-widest text-text-secondary transition-colors hover:text-accent"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default function Developers() {
  return (
    <section id="developers" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Meet the Developers
        </p>
        <h2 className="max-w-3xl text-[clamp(36px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          Built by two developers.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {developers.map((dev) => (
            <DeveloperCard key={dev.name} dev={dev} />
          ))}
        </div>
      </div>
    </section>
  );
}
