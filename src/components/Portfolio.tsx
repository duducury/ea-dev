"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects, type Project } from "@/data/projects";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, language } = useLanguage();
  const previewRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

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
      data-project-card
      className="flex w-[92%] shrink-0 snap-start flex-col sm:w-[88%] md:w-[85%]"
    >
      <div className="mb-2 md:mb-3">
        <p className="case-category text-[10px] font-semibold uppercase tracking-[0.25em] text-accent sm:text-xs">
          0{index + 1} — {project.category[language]}
        </p>
        <h3 className="case-title mt-1 line-clamp-2 text-xl font-bold leading-tight tracking-tight text-black sm:text-2xl md:text-4xl">
          {project.name}
        </h3>

        <div className="case-meta mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 md:mt-3">
          <p className="hidden max-w-xs min-h-[2.5rem] text-[13px] leading-snug text-black/70 md:line-clamp-2">
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

      <p className="case-description mb-2 max-w-md text-[11px] leading-snug text-black/70 sm:text-xs md:hidden">
        {project.description[language]}
      </p>

      <div className="case-tags mb-2 flex flex-wrap gap-x-3 gap-y-1 md:mb-3">
        {project.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-semibold uppercase tracking-widest text-black/50">
            {tag}
          </span>
        ))}
      </div>

      <div className="case-image flex w-full justify-center">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          aria-label={`${t.portfolio.visit} ${project.name}`}
          className="relative block"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div ref={previewRef} className="case-image-frame h-[34vh] w-auto sm:h-[38vh] md:h-[44vh] lg:h-[48vh]">
            <Image
              src={project.screenshot}
              alt={`${project.name} — ${project.category[language]}`}
              width={1536}
              height={1024}
              loading="eager"
              className="h-full w-auto object-contain"
            />
          </div>

          {project.featured && (
            <div className="pointer-events-none absolute -top-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-black/70 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-accent backdrop-blur-sm sm:gap-1.5 sm:px-3 sm:py-1 sm:text-[10px]">
              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={1.75} />
              {t.portfolio.featured}
            </div>
          )}
        </a>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const getCardStep = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const card = el.querySelector("article");
    return card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
  };

  // Travel exactly far enough that the last card ends up centered in the
  // viewport (rather than flush against the right edge), so it's fully
  // readable before the page hands off to normal vertical scroll. Shared by
  // the scroll-jack setup below and the horizontal drag handler, so both
  // agree on how many scroll-pixels correspond to one card-pixel.
  const getDistance = () => {
    const scroller = scrollerRef.current;
    const wrap = wrapRef.current;
    if (!scroller || !wrap) return 0;
    const cards = scroller.querySelectorAll<HTMLElement>("article");
    const lastCard = cards[cards.length - 1];
    if (!lastCard) return Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const targetLeft = (wrap.clientWidth - lastCard.offsetWidth) / 2;
    return Math.max(0, lastCard.offsetLeft - targetLeft);
  };

  // How much vertical scroll it takes to cross the whole row. Paced by
  // viewport HEIGHT rather than the horizontal pixel distance, so it
  // doesn't blow up on wide desktop screens (where cards are much wider
  // than on a phone) — every project gets roughly one viewport's worth
  // of scroll to sit with, regardless of how wide the screen is.
  const getScrollLength = () => window.innerHeight * 0.9 * (projects.length - 1);

  // Scroll-jack: pin the section and translate the card row horizontally as
  // the page scrolls, so a normal downward scroll/swipe moves through the
  // projects instead of straight past the section. Once the last card is
  // reached the section unpins and the page scrolls on as usual. Skipped for
  // reduced motion, where the row stays a plain native horizontal scroller.
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    if (!section || !scroller) return;

    const ctx = gsap.context(() => {
      if (getDistance() <= 0) return;

      const tween = gsap.to(scroller, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollLength()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (projects.length - 1));
            setActiveIndex((prev) => (prev === index ? prev : index));
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger ?? null;
    }, section);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [reducedMotion]);

  // Let people drag/swipe the cards sideways too, not just scroll the page
  // vertically — both drive the exact same underlying scroll position
  // (window.scrollBy), so it's the same scroll-jack either way and it only
  // releases the pin once the last card is reached, same as scrolling down.
  useEffect(() => {
    if (reducedMotion) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let dragging = false;
    let lastX = 0;
    let startX = 0;
    let startY = 0;
    // null until enough movement happens to tell whether this gesture is a
    // horizontal swipe (we drive it) or a vertical one (native scroll drives
    // it, untouched — we do nothing at all so it behaves exactly as before).
    let lockedAxis: "x" | "y" | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      lockedAxis = null;
      startX = lastX = e.clientX;
      startY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;

      if (!lockedAxis) {
        const totalX = e.clientX - startX;
        const totalY = e.clientY - startY;
        if (Math.abs(totalX) < 8 && Math.abs(totalY) < 8) return;
        lockedAxis = Math.abs(totalX) > Math.abs(totalY) ? "x" : "y";
        lastX = e.clientX;
      }
      if (lockedAxis === "y") return; // vertical: leave entirely to native scroll

      const dx = e.clientX - lastX;
      lastX = e.clientX;
      if (!dx) return;
      const distance = getDistance();
      const st = scrollTriggerRef.current;
      if (!distance || !st) return;
      // A plain 1:1 (finger-pixel : card-pixel) ratio means a full swipe only
      // covers a small fraction of the row, since "distance" spans every
      // card — feels sluggish. DRAG_SENSITIVITY makes the cards travel
      // faster than the finger so a normal swipe gets you noticeably
      // further, independent of how the vertical scroll is paced.
      const DRAG_SENSITIVITY = 4;
      const scale = ((st.end - st.start) / distance) * DRAG_SENSITIVITY;
      // `behavior: "instant"` is required here — the page sets a global
      // scroll-behavior: smooth, which the legacy two-arg scrollBy(x, y)
      // form inherits, turning every one of these rapid-fire calls into an
      // animated scroll that the next call immediately interrupts. Net
      // effect: barely any of the drag actually registered.
      window.scrollBy({ top: -dx * scale, behavior: "instant" });
    };

    const endDrag = () => {
      dragging = false;
      lockedAxis = null;
    };

    wrap.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      wrap.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [reducedMotion]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(projects.length - 1, Math.max(0, index));

      if (reducedMotion) {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollTo({ left: clamped * getCardStep(), behavior: "smooth" });
        return;
      }

      const st = scrollTriggerRef.current;
      if (!st) return;
      const progress = projects.length > 1 ? clamped / (projects.length - 1) : 0;
      const y = st.start + progress * (st.end - st.start);
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [reducedMotion]
  );

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      scrollToIndex(activeIndexRef.current + direction);
    },
    [scrollToIndex]
  );

  // Native scroll tracking — only wired up for the reduced-motion fallback,
  // where the row is a real horizontal scroller instead of a scroll-jacked one.
  useEffect(() => {
    if (!reducedMotion) return;
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
  }, [reducedMotion]);

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
      className={`relative z-10 bg-white text-black ${
        reducedMotion ? "sticky top-0 min-h-[140vh]" : "h-screen overflow-hidden"
      }`}
    >
      <div className="work-header mx-auto w-full max-w-7xl px-6 pt-24 md:px-10 md:pt-28">
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

      <div
        ref={wrapRef}
        className={`work-scroller-wrap relative mx-auto mt-2 w-full max-w-7xl md:mt-4 ${
          reducedMotion
            ? ""
            : "work-scroller-fade touch-pan-y select-none overflow-hidden cursor-grab active:cursor-grabbing"
        }`}
      >
        <div
          ref={scrollerRef}
          className={`work-scroller no-scrollbar flex w-full gap-6 px-6 pb-2 md:px-10 ${
            reducedMotion
              ? "work-scroller-fade scroll-pl-6 overflow-x-auto scroll-smooth snap-x snap-mandatory md:scroll-pl-10"
              : ""
          }`}
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
