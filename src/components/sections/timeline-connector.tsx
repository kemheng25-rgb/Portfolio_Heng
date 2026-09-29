"use client";

import { motion, useScroll, useTransform } from "motion/react";
import * as React from "react";

/**
 * The line between two experience entries: a static border-color track,
 * with an accent-colored fill that grows to match how far this specific
 * segment has scrolled through the viewport — a progress bar for "how far
 * through your career history" rather than a fixed decoration. No
 * reduced-motion override needed here: the fill only ever moves in direct
 * response to the user's own scroll position, there's no autoplay loop to
 * suppress.
 */
export function TimelineConnector() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute top-6 left-[7px] bottom-[-3rem] w-px bg-border"
    >
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 w-px bg-accent"
      />
    </div>
  );
}
