"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type CursorVariant = "default" | "link" | "view";

export default function CustomCursor() {
  const { t } = useLanguage();
  const dotRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("cursor-none");

    const dot = dotRef.current;
    if (!dot) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power2.out" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power2.out" });

    const handleMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const kind = target?.getAttribute("data-cursor");
      setVariant(kind === "view" ? "view" : kind === "link" ? "link" : "default");
    };

    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest?.("[data-cursor]")) setVariant("default");
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`custom-cursor custom-cursor--${variant}`}
    >
      <span className="custom-cursor__label">{t.cursor.view}</span>
    </div>
  );
}
