"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

// Dark is the site's unconditional default (see globals.css): no attribute
// means dark, regardless of OS preference.
function getCurrentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // localStorage unavailable (private mode, disabled storage) — theme still
    // applies for this page view, it just won't persist.
  }
}

interface ThemeToggleProps {
  className?: string;
}

/**
 * The icon shown reflects the current theme via CSS attribute selectors
 * (`.theme-toggle-sun` / `.theme-toggle-moon` in globals.css), not React
 * state, so it's correct on first paint even before this component hydrates.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const handleClick = () => {
    const next: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Toggle color theme"
      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-2", className)}
    >
      <Sun aria-hidden="true" className="theme-toggle-sun" />
      <Moon aria-hidden="true" className="theme-toggle-moon" />
    </button>
  );
}
