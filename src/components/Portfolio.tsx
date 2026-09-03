"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { projects, type Project } from "@/data/projects";
import CaseStudy from "./CaseStudy";

function ProjectCard({ project }: { project: Project }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 82%" },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleEnter = () => {
    if (reducedMotion) return;
    gsap.to(previewRef.current, { scale: 1.04, duration: 0.5, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (reducedMotion) return;
    gsap.to(previewRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  return (
    <article
      ref={cardRef}
      className="grid grid-cols-1 items-center gap-8 border-t border-border py-12 md:grid-cols-2 md:gap-14"
    >
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="order-2 overflow-hidden rounded-2xl border border-border md:order-1"
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          aria-label={`Open ${project.name} in a new tab`}
          className="block aspect-[4/3]"
        >
          {/* TODO: replace with a real screenshot of this project */}
          <div
            ref={previewRef}
            className="flex h-full w-full items-center justify-center bg-surface text-4xl font-bold text-border-strong"
          >
            {project.name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </div>
        </a>
      </div>

      <div className="order-1 md:order-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {project.category}
        </p>
        <h3 className="mt-4 text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-tight">
          {project.name}
        </h3>
        <p className="mt-4 text-text-secondary">{project.description}</p>

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

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="mt-8 inline-block text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:text-accent"
        >
          Visit Project →
        </a>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Portfolio
        </p>
        <h2 className="max-w-3xl text-[clamp(36px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          Selected Work
        </h2>

        {featured && (
          <div className="mt-16">
            <CaseStudy project={featured} />
          </div>
        )}

        <div className="mt-4">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
