"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Besa-style buttery smooth scrolling for the long content pages
 * (landing, library, lessons, challenge). The interactive chat tools
 * (/sandbox, /tools) are intentionally excluded so their inner scroll
 * and fixed composer stay native and reliable. Fully disabled when the
 * visitor prefers reduced motion.
 */
const SMOOTH_ROUTES = ["/", "/library", "/lessons", "/challenge"];

function isSmoothRoute(path: string): boolean {
  return SMOOTH_ROUTES.some((r) =>
    r === "/" ? path === "/" : path === r || path.startsWith(r + "/"),
  );
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isSmoothRoute(pathname)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
