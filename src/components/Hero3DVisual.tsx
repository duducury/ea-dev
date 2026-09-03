"use client";

import { useEffect, useRef } from "react";
import { Globe, Database, ShoppingBag } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const tiles = [
  { Icon: Globe, offset: { x: -70, y: -40, z: 40, rotateY: -18, rotateX: 6 } },
  { Icon: Database, offset: { x: 60, y: 10, z: 90, rotateY: 14, rotateX: -4 } },
  { Icon: ShoppingBag, offset: { x: -20, y: 90, z: 10, rotateY: -6, rotateX: 10 } },
];

export default function Hero3DVisual() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<HTMLDivElement[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      tiles.forEach((tile, i) => {
        const el = tileRefs.current[i];
        if (!el) return;
        gsap.set(el, {
          x: tile.offset.x,
          y: tile.offset.y,
          z: tile.offset.z,
          rotateY: tile.offset.rotateY,
          rotateX: tile.offset.rotateX,
        });

        if (reducedMotion) return;

        gsap.to(el, {
          y: tile.offset.y - 16,
          duration: 2.6 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
    }, sceneRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const scene = sceneRef.current;
    const group = groupRef.current;
    if (!scene || !group) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const rotateX = gsap.quickTo(group, "rotateX", { duration: 0.6, ease: "power2.out" });
    const rotateY = gsap.quickTo(group, "rotateY", { duration: 0.6, ease: "power2.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 24);
      rotateX(-py * 24);
    };

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    scene.addEventListener("mousemove", handleMove);
    scene.addEventListener("mouseleave", handleLeave);
    return () => {
      scene.removeEventListener("mousemove", handleMove);
      scene.removeEventListener("mouseleave", handleLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={sceneRef}
      aria-hidden="true"
      className="hidden h-[360px] w-[360px] shrink-0 lg:block"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={groupRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {tiles.map(({ Icon }, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) tileRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-border-strong bg-surface/80 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Icon className="h-10 w-10 text-accent" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
