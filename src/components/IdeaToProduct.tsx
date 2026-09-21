"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const FRAME_COUNT = 168;
const SEQUENCE_HEIGHT_VH = 240;

function frameSrc(index: number) {
  return `/reveal/frame_${index}.webp`;
}

/** Fade a phase label in for the roughly one-third of the scroll it "owns",
 * with a short crossfade at each edge so the handoff between phases reads as
 * a transition rather than a hard cut. */
function phaseRange(index: number, total: number): [number[], number[]] {
  const size = 1 / total;
  const start = index * size;
  const end = start + size;
  const pad = size * 0.18;
  if (index === 0) return [[0, end - pad, end], [1, 1, 0.35]];
  if (index === total - 1) return [[start, start + pad, 1], [0.35, 1, 1]];
  return [[start, start + pad, end - pad, end], [0.35, 1, 1, 0.35]];
}

function SequenceCanvas({
  images,
  progress,
  isLoaded,
}: {
  images: React.RefObject<HTMLImageElement[]>;
  progress: MotionValue<number>;
  isLoaded: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const currentFrame = useRef(0);

  function draw(index: number) {
    const canvas = canvasRef.current;
    const img = images.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Manual object-fit: contain — the image never stretches or crops.
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = rect.width / rect.height;
    let drawW: number;
    let drawH: number;
    if (imgRatio > boxRatio) {
      drawW = rect.width;
      drawH = rect.width / imgRatio;
    } else {
      drawH = rect.height;
      drawW = rect.height * imgRatio;
    }
    const dx = (rect.width - drawW) / 2;
    const dy = (rect.height - drawH) / 2;
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }

  const frameIndex = useTransform(progress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest)));
    currentFrame.current = idx;
    draw(idx);
  });

  useEffect(() => {
    if (!wrapRef.current) return;
    const observer = new ResizeObserver(() => draw(currentFrame.current));
    observer.observe(wrapRef.current);
    draw(currentFrame.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The sequence loads lazily, well after mount — once it's ready, force a
  // draw of whatever frame the current scroll position maps to.
  useEffect(() => {
    if (isLoaded) draw(currentFrame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default function IdeaToProduct() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [percentLoaded, setPercentLoaded] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.5,
  });

  const [phase0In, phase0Out] = phaseRange(0, 3);
  const [phase1In, phase1Out] = phaseRange(1, 3);
  const [phase2In, phase2Out] = phaseRange(2, 3);
  const phaseOpacities = [
    useTransform(smoothProgress, phase0In, phase0Out),
    useTransform(smoothProgress, phase1In, phase1Out),
    useTransform(smoothProgress, phase2In, phase2Out),
  ];

  // Only start fetching the sequence once this section is actually close to
  // the viewport — it sits well down the page, so there's no reason to spend
  // any of the initial page-load budget on it.
  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    let loaded = 0;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);

    const handleProgress = () => {
      loaded += 1;
      if (cancelled) return;
      setPercentLoaded(Math.round((loaded / FRAME_COUNT) * 100));
      if (loaded >= FRAME_COUNT) setIsLoaded(true);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = handleProgress;
      img.onerror = handleProgress;
      imgs[i] = img;
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  if (reducedMotion) {
    return (
      <section
        id="reveal"
        className="relative flex flex-col items-center gap-10 bg-black px-6 py-20 text-center md:flex-row-reverse md:items-center md:justify-between md:px-10 md:py-28 md:text-left"
      >
        <div className="relative aspect-[9/16] h-[50vh] max-h-[520px] w-auto shrink-0">
          <Image
            src={frameSrc(FRAME_COUNT - 1)}
            alt="EA Dev"
            fill
            sizes="(min-width: 1024px) 32vw, 70vw"
            className="object-contain"
          />
        </div>
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.reveal.eyebrow}
          </p>
          <h2 className="text-[clamp(28px,5vw,56px)] font-bold leading-[1.05] tracking-tight text-white">
            {t.reveal.title}
          </h2>
          <p className="mt-4 max-w-md text-white/60">{t.reveal.subtitle}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reveal"
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${SEQUENCE_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 pb-8 pt-16 text-center sm:gap-4 sm:pt-20 md:px-10 lg:flex-row lg:justify-center lg:gap-20 lg:px-16 lg:pb-0 lg:pt-0 lg:text-left xl:gap-28 xl:px-24">
          <div className="relative order-1 aspect-[9/16] h-[78vh] max-h-[780px] w-auto shrink-0 sm:h-[80vh] sm:max-h-[820px] md:h-[76vh] md:max-h-[780px] lg:order-1 lg:h-[74vh] lg:max-h-[680px]">
            {isLoaded ? (
              <SequenceCanvas images={imagesRef} progress={smoothProgress} isLoaded={isLoaded} />
            ) : (
              <Image
                src={frameSrc(0)}
                alt="EA Dev"
                fill
                sizes="(min-width: 1024px) 32vw, 60vw"
                className="object-contain"
                loading="lazy"
              />
            )}
            {shouldLoad && !isLoaded && (
              <span className="absolute bottom-2 left-2 font-mono text-[10px] tabular-nums text-white/40">
                {percentLoaded}%
              </span>
            )}
          </div>

          <div className="order-2 hidden max-w-xl flex-col items-center lg:order-2 lg:flex lg:items-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent sm:text-xs">
              {t.reveal.eyebrow}
            </p>
            <h2 className="mt-2 text-[clamp(22px,6vw,40px)] font-bold leading-[1.05] tracking-tight text-white sm:mt-3 lg:mt-4 lg:text-[clamp(34px,3vw,56px)]">
              {t.reveal.title}
            </h2>
            <p className="mt-2 max-w-sm text-xs text-white/60 sm:mt-3 sm:text-sm lg:mt-4 lg:max-w-md lg:text-base">
              {t.reveal.subtitle}
            </p>

            <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent sm:mt-4 sm:gap-3 sm:text-xs">
              {t.reveal.phases.map((phase, i) => (
                <div key={phase} className="flex items-center gap-2 sm:gap-3">
                  {i > 0 && <span aria-hidden="true" className="h-px w-4 bg-white/20 sm:w-6" />}
                  <motion.span style={{ opacity: phaseOpacities[i] }}>{phase}</motion.span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
