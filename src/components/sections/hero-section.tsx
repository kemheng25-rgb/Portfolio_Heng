import { ArrowRight, Download, Mail } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PixelSkyline } from "@/components/layout/pixel-skyline";
import { HeroNetwork } from "@/components/sections/hero-network";
import { buttonVariants } from "@/components/ui/button";
import { brand, personal } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section id="home" aria-label="Introduction" className="relative">
      <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-medium tracking-wide text-accent uppercase">
            {personal.title} &middot; {personal.specialization}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            {brand.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{brand.supportingStatement}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#projects" className={buttonVariants({ size: "lg" })}>
              {brand.ctaPrimary}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="/#contact"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <Mail aria-hidden="true" />
              {brand.ctaSecondary}
            </Link>
            {personal.resumeAvailable && (
              <a
                href={personal.resumePath}
                download
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                <Download aria-hidden="true" />
                {brand.ctaResume}
              </a>
            )}
          </div>

          <p className="mt-6 text-sm text-muted">{personal.location}</p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md rounded-xl border border-border bg-background-elevated/60 p-6">
          <HeroNetwork />
        </div>
      </Container>
      <PixelSkyline compact />
    </section>
  );
}
