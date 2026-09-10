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
    <article
      ref={cardRef}
      data-project-card
      className="grid w-[90%] shrink-0 snap-start grid-cols-1 items-center gap-4 sm:w-[85%] md:w-full md:grid-cols-[0.85fr_1.15fr] md:gap-10 lg:gap-14"
    >
      <div className="min-w-0">
        <p className="case-category text-[10px] font-semibold uppercase tracking-[0.25em] text-accent sm:text-xs">
          0{index + 1} — {project.category[language]}
        </p>
        <h3 className="case-title mt-1.5 text-xl font-bold leading-tight tracking-tight text-black sm:text-2xl md:mt-3 md:text-4xl">
          {project.name}
        </h3>
        <p className="case-description mt-2 max-w-md text-xs leading-relaxed text-black/60 sm:text-sm md:mt-4 md:text-base">
          {project.description[language]}
        </p>

        <div className="case-tags mt-3 flex flex-wrap gap-x-3 gap-y-1 md:mt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold uppercase tracking-widest text-black/40"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="case-cta mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:text-accent md:mt-7 md:text-sm"
        >
          {t.portfolio.visit}
          <ArrowUpRight className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2} />
        </a>
      </div>

      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="case-image relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)] sm:aspect-[16/10] md:rounded-3xl"
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
                  sizes="(min-width: 768px) 55vw, 85vw"
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
        ".case-category, .case-title, .case-description, .case-tags, .case-cta"
      );
      gsap.fromTo(
        textEls,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }
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
      <div className="work-header mx-auto w-full max-w-7xl px-6 pt-16 md:px-10 md:pt-20">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/70">
            {t.portfolio.eyebrow}
          </p>
        </div>
        <h2 className="max-w-3xl text-[clamp(26px,4.2vw,52px)] font-bold leading-[1.08] tracking-tight text-black">
          {t.portfolio.title}
        </h2>
        <p className="work-subtitle mt-2 max-w-xl text-xs text-black/55 sm:text-sm md:text-base">
          {t.portfolio.subtitle}
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="work-scroller no-scrollbar mx-auto mt-5 flex w-full max-w-7xl scroll-pl-6 gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-2 md:mt-8 md:scroll-pl-10 md:px-10"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="work-nav-row mx-auto mt-4 flex w-full max-w-7xl items-center justify-center gap-6 px-6 md:px-10">
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
