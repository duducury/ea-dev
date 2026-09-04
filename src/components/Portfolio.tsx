"use client";

import { useEffect, useRef, useState } from "react";
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
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:border-accent hover:text-accent"
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
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardStep = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const card = el.querySelector("article");
    return card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
  };

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * getCardStep(), behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * getCardStep(), behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const step = getCardStep();
      if (!step) return;
      const index = Math.round(el.scrollLeft / step);
      setActiveIndex(Math.min(projects.length - 1, Math.max(0, index)));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="work"
      className="sticky top-0 z-10 min-h-[140vh] bg-white text-black"
    >
      <div className="mx-auto w-full max-w-7xl px-6 pt-16 md:px-10 md:pt-20">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/70">
            {t.portfolio.eyebrow}
          </p>
        </div>
        <h2 className="max-w-3xl text-[clamp(28px,4.5vw,56px)] font-bold leading-[1.08] tracking-tight text-black">
          {t.portfolio.title}
        </h2>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar mx-auto mt-6 flex w-full max-w-7xl scroll-pl-6 gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-2 md:mt-9 md:scroll-pl-10 md:px-10"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mx-auto mt-4 flex w-full max-w-7xl items-center justify-center gap-6 px-6 md:px-10">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous project"
          data-cursor="link"
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:border-accent hover:text-accent md:flex"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`${t.portfolio.visit} ${project.name}`}
              aria-current={i === activeIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-accent" : "w-2 bg-black/20 hover:bg-black/35"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next project"
          data-cursor="link"
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:border-accent hover:text-accent md:flex"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </section>
  );
}
