import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/reveal";
import { ArchitectureDiagramView } from "@/components/projects/architecture-diagram";
import { WorkflowDiagram } from "@/components/projects/workflow-diagram";
import { getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/data/portfolio";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// The six case studies are a fixed, enumerable set — any slug outside of
// generateStaticParams should 404 immediately rather than be rendered
// on-demand.
export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const url = `${siteConfig.url}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description: project.shortDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
    },
  };
}

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 text-base leading-7 text-muted">{children}</div>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Projects", url: `${siteConfig.url}/#projects` },
    { name: project.title, url: `${siteConfig.url}/projects/${project.slug}` },
  ]);

  return (
    <article className="py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />

      <Container className="max-w-3xl">
        <Reveal>
          <span className="text-xs font-medium tracking-wide text-accent uppercase">
            {project.systemLabel}
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{project.shortDescription}</p>
        </Reveal>

        <div className="mt-12 space-y-12">
          <Reveal>
            <DetailBlock title="Project Overview">
              <p>{project.overview}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Business Challenge">
              <p>{project.businessChallenge}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Users and Stakeholders">
              <p>{project.usersAndStakeholders}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="My Responsibilities">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
                {project.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Simplified Architecture">
              <ArchitectureDiagramView diagram={project.architecture} />
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Workflow">
              <WorkflowDiagram steps={project.workflowSteps} />
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Technical Approach">
              <p>{project.technicalApproach}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Backend Implementation">
              <p>{project.backendImplementation}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Frontend Implementation">
              <p>{project.frontendImplementation}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Database Considerations">
              <p>{project.databaseConsiderations}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Integration Considerations">
              <p>{project.integrationConsiderations}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Important Engineering Decisions">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
                {project.engineeringDecisions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Challenges and Solutions">
              <div className="space-y-4">
                {project.challengesAndSolutions.map((entry) => (
                  <div
                    key={entry.challenge}
                    className="rounded-lg border border-border bg-background-elevated p-4"
                  >
                    <p className="font-medium text-foreground">{entry.challenge}</p>
                    <p className="mt-1">{entry.solution}</p>
                  </div>
                ))}
              </div>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Security and Data Validation">
              <p>{project.securityAndValidation}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Business Impact">
              <p>{project.businessImpact}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Technologies Used">
              <ul className="flex flex-wrap gap-2">
                {project.technologiesUsed.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <DetailBlock title="Lessons Learned">
              <p>{project.lessonsLearned}</p>
            </DetailBlock>
          </Reveal>

          <Reveal>
            <div className="rounded-lg border border-border bg-background-elevated p-4 text-sm text-muted">
              {project.systemLabel}: built for an employer as part of professional work. No
              source code, live demo, or confidential information is shown here.
            </div>
          </Reveal>
        </div>
      </Container>
    </article>
  );
}
