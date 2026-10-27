"use client";

import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

// Counts from 0 to `to` once the number scrolls into view.
export function CountUp({ to, delay = 0.7 }: { to: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const n = useMotionValue(0);
  const text = useTransform(n, (v) => Math.round(v));

  useEffect(() => {
    if (!seen) return;
    const controls = animate(n, to, { duration: 1.6, delay, ease: [0.33, 1, 0.68, 1] });
    return () => controls.stop();
  }, [seen, n, to, delay]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

// Springs between values whenever `value` changes (calculator outputs).
export function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const spring = useSpring(value, { stiffness: 140, damping: 22 });
  const text = useTransform(spring, format);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{text}</motion.span>;
}

// Thin sun-coloured bar at the top of the page showing scroll progress.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-leaf to-sun" />;
}

// Moves its children vertically as the page scrolls (hero sun).
export function Parallax({ children, distance = 160, className }: { children: React.ReactNode; distance?: number; className?: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, distance]);
  return (
    <motion.div style={{ y }} className={className} aria-hidden="true">
      {children}
    </motion.div>
  );
}
