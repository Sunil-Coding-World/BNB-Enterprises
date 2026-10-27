"use client";

import { useEffect, useRef, useState } from "react";

// Adds `.in` to every `.fade` element as it scrolls into view.
export function RevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".fade").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function CountUp({ to, delay = 700 }: { to: number; delay?: number }) {
  const [n, setN] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1600, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf.current);
    };
  }, [to, delay]);

  return <>{n}</>;
}
