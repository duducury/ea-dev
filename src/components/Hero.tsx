"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const FRAME_COUNT = 232;
const SEQUENCE_HEIGHT_VH = 400;

function frameSrc(index: number) {
  return `/sequence/frame_${index}.webp`;
}

/** Fade a scroll-linked value in, hold it, then fade it out across four
 * progress checkpoints; the last text instead holds to the very end. */
function textRange(start: number, isLast: boolean): [number[], number[], number[]] {
  if (isLast) {
    const input = [start, start + 0.08, 1];
    return [input, [0, 1, 1], [18, 0, 0]];
  }
  const input = [start, start + 0.06, start + 0.16, start + 0.22];
  return [input, [0, 1, 1, 0], [18, 0, 0, -18]];
}

function CinematicText({
  progress,
  start,
  isLast,
  children,
}: {
  progress: ReturnType<typeof useSpring>;
  start: number;
  isLast: boolean;
  children: React.ReactNode;
}) {
  const [input, opacityOut, yOut] = textRange(start, isLast);
  const opacity = useTransform(progress, input, opacityOut);
  const y = useTransform(progress, input, yOut);

  return (
    <motion.div
      style={{ opacity, y }}
      className="col-start-1 row-start-1 self-end lg:self-center"
    >
      {children}
    </motion.div>
  );
}

function LaptopCanvas({
  images,
  progress,
  isLoaded,
}: {
  images: React.RefObject<HTMLImageElement[]>;
  progress: ReturnType<typeof useSpring>;
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
    if (idx !== currentFrame.current) {
      currentFrame.current = idx;
    }
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

  // The very first frame is requested before any image has finished
  // loading (the scroll position is at rest, so no "change" event fires to
  // retry). Once the preload completes, force a draw of whatever frame the
  // scroll position currently maps to.
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

function Preloader({ percent }: { percent: number }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-[#050505]"
    >
      <Image src="/logo-icon.png" alt="EA Dev" width={1904} height={826} className="h-9 w-auto opacity-90" />
      <div className="flex flex-col items-center gap-3">
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <div
            className="h-full bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="font-mono text-xs tabular-nums text-white/50">{percent}%</span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
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

  // Preload the whole sequence up front; nothing scroll-related is shown
  // until every frame has arrived, so scrubbing never hits a blank frame.
  useEffect(() => {
    if (reducedMotion) return;
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
  }, [reducedMotion]);

  // Lock scroll while the sequence loads so the user can't scroll into a
  // half-ready animation.
  useEffect(() => {
    if (reducedMotion || isLoaded) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [reducedMotion, isLoaded]);

  if (reducedMotion) {
    return (
      <section
        id="top"
        className="relative flex min-h-screen flex-col items-center justify-center gap-10 bg-[#050505] px-6 py-24 text-center md:flex-row md:items-center md:justify-between md:px-10 md:text-left"
      >
        <div className="max-w-xl">
          <p className="text-[clamp(28px,5vw,56px)] font-bold leading-[1.1] text-white">
            {t.hero.texts[0]}
          </p>
          <p className="mt-6 text-[clamp(16px,2vw,22px)] text-white/60">{t.hero.texts[2]}</p>
          <a
            href="#contact"
            data-cursor="link"
            className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-black"
          >
            {t.hero.cta}
          </a>
        </div>
        <div className="relative aspect-[16/9] w-full max-w-xl">
          <Image
            src={frameSrc(FRAME_COUNT - 1)}
            alt="EA Dev"
            fill
            sizes="(min-width: 768px) 50vw, 90vw"
            className="object-contain"
            priority
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative bg-[#050505]"
      style={{ height: `${SEQUENCE_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <AnimatePresence>
          {!isLoaded && <Preloader key="preloader" percent={percentLoaded} />}
        </AnimatePresence>

        {/* Laptop sequence — upper band on mobile/tablet (stacked
            composition, laptop always fully visible), its own right-hand
            column from lg upward (a separate column from the text, never
            underneath it, with generous padding so it never touches the
            edges). Tablet-portrait widths stay stacked rather than being
            squeezed into a cramped side-by-side row. */}
        <div className="absolute inset-x-0 top-0 flex h-[48%] items-center justify-center px-6 pt-20 sm:h-[52%] md:h-[56%] md:px-10 lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[58%] lg:px-14 lg:pt-0 xl:px-16">
          <div className="relative h-full w-full max-w-[1200px]">
            <LaptopCanvas images={imagesRef} progress={smoothProgress} isLoaded={isLoaded} />
          </div>
        </div>

        {/* Cinematic text — lower band on mobile/tablet (never over the
            laptop), its own left-hand column from lg upward. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[52%] flex-col justify-center px-6 pb-8 text-center sm:h-[48%] md:h-[44%] md:px-10 lg:inset-y-0 lg:right-auto lg:h-full lg:w-[40%] lg:items-start lg:justify-center lg:px-0 lg:pb-0 lg:pl-16 lg:text-left xl:pl-20">
          <div className="relative grid w-full max-w-xl">
            {t.hero.texts.map((text, i) => {
              const isLast = i === t.hero.texts.length - 1;
              const start = [0, 0.24, 0.48, 0.72][i];
              return (
                <CinematicText key={text} progress={smoothProgress} start={start} isLast={isLast}>
                  <p className="font-bold uppercase leading-[1.05] tracking-tight text-white text-[clamp(24px,5.2vw,52px)] md:text-[clamp(34px,4.4vw,52px)] lg:text-[clamp(30px,4vw,56px)]">
                    {text}
                  </p>
                  {isLast && (
                    <a
                      href="#contact"
                      data-cursor="link"
                      className="pointer-events-auto mt-7 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
                    >
                      {t.hero.cta}
                    </a>
                  )}
                </CinematicText>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
