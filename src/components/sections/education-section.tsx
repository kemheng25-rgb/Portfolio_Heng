import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { education, languages } from "@/data/portfolio";

export function EducationSection() {
  return (
    <section
      id="education"
      aria-label="Education and languages"
      className="border-b border-border py-20 sm:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Education" title="Education" />
          <ul className="mt-6 space-y-4">
            {education.map((entry) => (
              <li
                key={entry.institution}
                className="rounded-lg border border-border bg-background-elevated p-6"
              >
                <p className="text-base font-semibold text-foreground">{entry.degree}</p>
                <p className="mt-1 text-sm text-muted">{entry.institution}</p>
                <p className="text-sm text-muted">{entry.location}</p>
                {entry.graduationDate && (
                  <p className="mt-2 text-sm text-accent">{entry.graduationDate}</p>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Languages" title="Languages" />
          <ul className="mt-6 space-y-3">
            {languages.map((language) => (
              <li
                key={language.name}
                className="flex items-center justify-between rounded-lg border border-border bg-background-elevated px-6 py-4"
              >
                <span className="text-base font-medium text-foreground">{language.name}</span>
                <span className="text-sm text-muted">{language.proficiency}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
