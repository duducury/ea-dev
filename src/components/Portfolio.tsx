"use client";

import { useEffect, useRef } from "react";
import { Building2, IceCreamCone, ShoppingBag, Sparkles, type LucideIcon } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects, type Project } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";

const projectIcons: Record<string, LucideIcon> = {
  "favela-store": ShoppingBag,
  "united-flooring-america": Building2,
  "dois-amores": IceCreamCone,
};

function ProjectCard({ project }: { project: Project }) {
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const Icon = projectIcons[project.slug] ?? ShoppingBag;

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
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
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
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-accent/50"
    >
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="aspect-[4/3] overflow-hidden border-b border-border"
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          aria-label={`${t.portfolio.visit} ${project.name}`}
          className="block h-full w-full"
        >
          <div ref={previewRef} className="h-full w-full">
            <ProjectPreview url={project.url} Icon={Icon} accent={project.featured} />
          </div>
        </a>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        {project.featured && (
          <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
            <Sparkles className="h-3 w-3" strokeWidth={1.75} />
            {t.portfolio.featured}
          </div>
        )}

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {project.category[language]}
        </p>
        <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight">
          {project.name}
        </h3>
        <p className="mt-3 text-sm text-text-secondary">
          {project.description[language]}
        </p>

        {project.badges && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.badges[language].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-accent/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border-strong px-2.5 py-1 text-[10px] uppercase tracking-wider text-text-secondary"
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
          className="mt-6 inline-block text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:text-accent"
        >
          {t.portfolio.visit}
        </a>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="work" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.portfolio.eyebrow}
        </p>
        <h2 className="max-w-3xl text-[clamp(36px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
          {t.portfolio.title}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
