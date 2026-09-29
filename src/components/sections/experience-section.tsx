import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { experience } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Professional experience"
      className="border-b border-border py-20 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Professional experience" />
        </Reveal>

        <ol className="mt-12 space-y-12">
          {experience.map((entry, index) => (
            <li key={`${entry.company}-${entry.startDate}`} className="relative pl-8 sm:pl-10">
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 flex size-4 items-center justify-center rounded-full border-2 border-accent bg-background"
              />
              {index !== experience.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-[7px] bottom-[-3rem] w-px bg-border"
                />
              )}

              <Reveal delay={0.05}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {entry.company}
                  </h3>
                  <span className="text-sm text-muted">
                    {entry.startDate} – {entry.endDate}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">{entry.position}</p>
                <p className="text-sm text-muted">{entry.location}</p>

                <div className="mt-6 space-y-6">
                  {entry.groups.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-base font-semibold text-foreground">{group.title}</h4>
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted marker:text-accent">
                        {group.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
