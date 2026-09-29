"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import * as React from "react";

interface CaseStudyMoreProps {
  children: React.ReactNode;
}

/**
 * Most visitors only skim a case study. This keeps the deep implementation
 * detail (backend/frontend/db/integration notes, decisions, lessons
 * learned) out of the initial scroll and behind one toggle, instead of
 * stacking all sixteen sections open by default.
 */
export function CaseStudyMore({ children }: CaseStudyMoreProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="border-t border-border pt-10">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="case-study-more"
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <span>
            <span className="block text-lg font-semibold text-foreground">
              Full technical write-up
            </span>
            <span className="mt-1 block text-sm text-muted">
              Business challenge, implementation details, key decisions, and lessons learned.
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-5 shrink-0 text-muted transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="case-study-more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-12 pt-10">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
