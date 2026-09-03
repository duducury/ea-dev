"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import type { Project } from "@/data/projects";

export default function CaseStudy({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleEnter = () => {
    if (reducedMotion) return;
    gsap.to(previewRef.current, { scale: 1.03, duration: 0.5, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (reducedMotion) return;
    gsap.to(previewRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  return (
    <article
      ref={rootRef}
      className="rounded-3xl border border-border-strong bg-surface p-6 md:p-12"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Case Study — {project.category}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:text-accent"
        >
          Visit Project →
        </a>
      </div>

      <h3 className="mt-6 text-[clamp(32px,5vw,56px)] font-bold leading-tight tracking-tight">
        {project.name}
      </h3>

      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="group relative mt-8 overflow-hidden rounded-2xl border border-border"
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          aria-label={`Open ${project.name} in a new tab`}
          className="block aspect-video"
        >
          {/* TODO: replace with a real screenshot of catalogo.favelastore.com */}
          <div
            ref={previewRef}
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-2 via-black to-surface text-6xl font-bold text-border-strong"
          >
            {project.name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </div>
        </a>
      </div>

      <p className="mt-8 max-w-2xl text-lg text-text-secondary">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.badges?.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-accent/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border-strong px-3 py-1 text-[11px] uppercase tracking-widest text-text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
