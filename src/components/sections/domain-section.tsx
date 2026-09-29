import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { domainExpertise } from "@/data/portfolio";

export function DomainSection() {
  return (
    <section
      id="domains"
      aria-label="Business domain expertise"
      className="border-b border-border py-20 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Business Domain Expertise"
            title="Business problems, not just tools"
            description="Systems only hold up in production when they match how the business actually works. These are the domains I've built and supported systems for."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domainExpertise.map((domain, index) => (
            <Reveal key={domain.title} delay={Math.min(index * 0.04, 0.3)}>
              <div className="h-full rounded-lg border border-border bg-background-elevated p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
                <span className="flex items-center gap-2 text-xs font-medium tracking-wide text-accent uppercase">
                  <span
                    aria-hidden="true"
                    className="pixel-status-dot"
                    style={{ animationDelay: `${-(index * 0.4)}s` }}
                  />
                  Domain
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                  {domain.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{domain.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
