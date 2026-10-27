"use client";

import { MotionConfig } from "motion/react";

// Honour the OS "reduce motion" setting for every Motion animation.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
