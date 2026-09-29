import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { DomainSection } from "@/components/sections/domain-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PixelScanDivider } from "@/components/layout/pixel-scan-divider";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";

export default function Home() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="circuit-trace pointer-events-none absolute inset-y-0 left-10 hidden 2xl:block"
      />
      <HeroSection />
      <AboutSection />
      <DomainSection />
      <ProjectsSection />
      <PixelScanDivider />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
