import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" aria-label="Featured projects" className="border-b border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Featured Projects"
            title="Enterprise systems built and supported in production"
            description="These are private enterprise systems built for employers. No source code, live demos, or confidential details are shown — each case study focuses on the problem, the workflow, and my responsibilities."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.05, 0.3)}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col rounded-lg border border-border bg-background-elevated p-6 transition-colors hover:border-accent/60"
              >
                <span className="text-xs font-medium tracking-wide text-accent uppercase">
                  {project.systemLabel}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  {project.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  View case study
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
