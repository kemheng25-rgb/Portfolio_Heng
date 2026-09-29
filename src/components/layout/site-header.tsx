"use client";

import { Download, Link as LinkIcon, Menu, X } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { navLinks, personal, social } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState<string>("/#home");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!isHome) return;

    const sectionIds = navLinks.map((link) => link.href.replace("/#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveHref(`/#${visible.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-background/70",
        scrolled && "header-scrolled",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/#home"
          className="flex items-center gap-2 rounded-md px-1 text-lg font-semibold tracking-tight text-foreground"
        >
          <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background-elevated text-accent">
            {personal.initials}
          </span>
          <span className="hidden sm:inline">{personal.displayName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = isHome && activeHref === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-2")}
          >
            <LinkIcon aria-hidden="true" />
          </a>
          {personal.resumeAvailable && (
            <a
              href={personal.resumePath}
              download
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              <Download aria-hidden="true" />
              Résumé
            </a>
          )}
          <Link href="/#contact" className={buttonVariants({ variant: "primary", size: "sm" })}>
            Contact Me
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            className="overflow-hidden border-t border-border bg-background md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-background-elevated"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-2 pt-2">
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ variant: "secondary", size: "sm" })}
                >
                  <LinkIcon aria-hidden="true" />
                  GitHub
                </a>
                {personal.resumeAvailable && (
                  <a
                    href={personal.resumePath}
                    download
                    onClick={() => setOpen(false)}
                    className={buttonVariants({ variant: "secondary", size: "sm" })}
                  >
                    <Download aria-hidden="true" />
                    Résumé
                  </a>
                )}
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
    </MotionConfig>
  );
}
