import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { skillCategories } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" aria-label="Technical skills" className="border-b border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Technical Skills" title="Tools I build enterprise systems with" />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.category} delay={Math.min(index * 0.05, 0.3)}>
              <div className="h-full rounded-lg border border-border bg-background-elevated p-6">
                <h3 className="text-sm font-semibold tracking-wide text-accent uppercase">
                  {category.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border px-3 py-1 text-sm text-foreground transition-all duration-200 hover:scale-105 hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
