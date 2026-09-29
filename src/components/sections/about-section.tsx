import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { personal, stats, summary } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" aria-label="About" className="border-b border-border py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-5">
            {personal.profileImage && (
              <Image
                src={personal.profileImage}
                alt={personal.displayName}
                width={112}
                height={112}
                className="size-24 shrink-0 rounded-full border border-border object-cover sm:size-28"
              />
            )}
            <SectionHeading eyebrow="About" title="A brief introduction" />
          </div>
          <div className="mt-6 space-y-4 text-base leading-7 text-muted">
            {summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-background-elevated p-6"
              >
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-accent">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
