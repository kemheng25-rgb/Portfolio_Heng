"use client";

import { MotionConfig, motion } from "motion/react";
import * as React from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fades and lifts content in once it enters the viewport. Wraps children in
 * `MotionConfig reducedMotion="user"` so it automatically no-ops under
 * `prefers-reduced-motion`.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
