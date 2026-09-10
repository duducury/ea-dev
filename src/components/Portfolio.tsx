"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects, type Project } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 90%" },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleEnter = () => {
    if (reducedMotion) return;
    gsap.to(previewRef.current, { scale: 1.03, duration: 0.6, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (reducedMotion) return;
    gsap.to(previewRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
  };

  return (
    <article ref={cardRef} data-project-card className="flex w-full shrink-0 snap-start flex-col">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 md:mb-5">
        <div>
          <p className="case-category text-[10px] font-semibold uppercase tracking-[0.25em] text-accent sm:text-xs">
            0{index + 1} — {project.category[language]}
          </p>
          <h3 className="case-title mt-1 text-2xl font-bold leading-tight tracking-tight text-black sm:text-3xl md:text-5xl">
            {project.name}
          </h3>
        </div>

        <div className="case-meta flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="hidden max-w-xs text-sm leading-snug text-black/55 md:block">
            {project.description[language]}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:text-accent sm:text-sm"
          >
            {t.portfolio.visit}
            <ArrowUpRight className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2} />
          </a>
        </div>
      </div>

      <p className="case-description mb-2 max-w-md text-xs leading-snug text-black/55 sm:text-sm md:hidden">
        {project.description[language]}
      </p>

      <div className="case-tags mb-3 flex flex-wrap gap-x-3 gap-y-1 md:mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
            {tag}
          </span>
        ))}
      </div>

      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="case-image relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-[0_24px_70px_-24px_rgba(0,0,0,0.4)] sm:aspect-[16/9] md:aspect-[2.5/1] md:rounded-3xl"
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
                  alt={`${project.name} — ${project.category[language]}`}
                  fill
                  sizes="(min-width: 768px) 80vw, 92vw"
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
    </article>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const getCardStep = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const card = el.querySelector("article");
    return card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
  };

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

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

  // Keyboard navigation, only while the portfolio section is the one in view.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 10 && rect.bottom > window.innerHeight * 0.5;
      if (!inView) return;
      e.preventDefault();
      scrollByCard(e.key === "ArrowLeft" ? -1 : 1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scrollByCard]);

  // Cinematic reveal: whenever the active project changes (dot, arrow, swipe,
  // or keyboard), stagger its text in and give the image a soft scale-reveal.
  useEffect(() => {
    if (reducedMotion) return;
    const el = scrollerRef.current;
    if (!el) return;
    const activeCard = el.children[activeIndex] as HTMLElement | undefined;
    if (!activeCard) return;

    const ctx = gsap.context(() => {
      const textEls = activeCard.querySelectorAll(
        ".case-category, .case-title, .case-meta, .case-description, .case-tags"
      );
      gsap.fromTo(
        textEls,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
      );
      gsap.fromTo(
        activeCard.querySelector(".case-image"),
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, [activeIndex, reducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="sticky top-0 z-10 min-h-[140vh] bg-white text-black"
    >
      <div className="work-header mx-auto w-full max-w-7xl px-6 pt-14 md:px-10 md:pt-16">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/70">
            {t.portfolio.eyebrow}
          </p>
        </div>
        <h2 className="max-w-3xl text-[clamp(24px,3.6vw,44px)] font-bold leading-[1.08] tracking-tight text-black">
          {t.portfolio.title}
        </h2>
      </div>

      <div className="work-scroller-wrap relative mx-auto mt-4 w-full max-w-7xl md:mt-6">
        <div
          ref={scrollerRef}
          className="work-scroller no-scrollbar flex w-full scroll-pl-6 gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-2 md:scroll-pl-10 md:px-10"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-4 px-6 md:bottom-6 md:px-10">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous project"
            data-cursor="link"
            className="pointer-events-auto hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 md:flex"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>

          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 backdrop-blur-md">
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`${t.portfolio.visit} ${project.name}`}
                aria-current={i === activeIndex}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next project"
            data-cursor="link"
            className="pointer-events-auto hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 md:flex"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
