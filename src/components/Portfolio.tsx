"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects, type Project } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";

function ProjectCard({ project }: { project: Project }) {
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
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
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleEnter = () => {
    if (reducedMotion) return;
    gsap.to(previewRef.current, { scale: 1.05, duration: 0.5, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (reducedMotion) return;
    gsap.to(previewRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  return (
    <article
      ref={cardRef}
      className="flex w-[78%] shrink-0 snap-start flex-col sm:w-[48%] md:w-[36%] lg:w-[27%]"
    >
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-accent/50"
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
            <ProjectPreview url={project.url}>
              <div className="relative h-full w-full">
                <Image
                  src={project.screenshot}
                  alt={`${project.name} homepage`}
                  fill
                  sizes="(min-width: 1024px) 27vw, (min-width: 640px) 48vw, 78vw"
                  className="object-cover object-top"
                />
              </div>
            </ProjectPreview>
          </div>
        </a>

        {project.featured && (
          <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent backdrop-blur-sm">
            <Sparkles className="h-3 w-3" strokeWidth={1.75} />
            {t.portfolio.featured}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
            {project.category[language]}
          </p>
          <h3 className="mt-1 truncate text-lg font-bold tracking-tight">
            {project.name}
          </h3>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          aria-label={`${t.portfolio.visit} ${project.name}`}
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong text-text transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
        </a>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const amount = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section id="work" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.portfolio.eyebrow}
            </p>
            <h2 className="max-w-3xl text-[clamp(36px,6vw,80px)] font-bold leading-[1.02] tracking-tight">
              {t.portfolio.title}
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous project"
              data-cursor="link"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-text transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next project"
              data-cursor="link"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-text transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar mt-16 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-4 md:px-10"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
