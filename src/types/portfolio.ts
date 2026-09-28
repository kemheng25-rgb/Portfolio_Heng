export interface SiteConfig {
  name: string;
  url: string;
  ogImage: string;
}

export interface PersonalDetails {
  displayName: string;
  professionalName: string;
  initials: string;
  title: string;
  specialization: string;
  location: string;
  experienceSince: string;
  resumePath: string;
  /** Set to true once a real resume file exists at `public/resume.pdf`. */
  resumeAvailable: boolean;
  /** Path under `public/` to a profile photo, or undefined to hide it. */
  profileImage?: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  /** Lets the developer hide the phone number without touching any component. */
  showPhone: boolean;
}

export interface SocialLinks {
  github: string;
  /** TODO: add the complete LinkedIn profile URL, then flip this to a string. */
  linkedin?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface DomainExpertise {
  title: string;
  description: string;
}

export interface ExperienceGroup {
  title: string;
  bullets: string[];
}

export interface ExperienceEntry {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  groups: ExperienceGroup[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  /** TODO: add the exact graduation date; omitted from the UI until then. */
  graduationDate?: string;
}

export interface LanguageEntry {
  name: string;
  proficiency: string;
}

export type DiagramNodeType = "client" | "api" | "service" | "database" | "external";

export interface DiagramNode {
  id: string;
  label: string;
  type: DiagramNodeType;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchitectureDiagram {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  shortDescription: string;
  /** e.g. "Private Enterprise System" */
  systemLabel: string;
  overview: string;
  businessChallenge: string;
  usersAndStakeholders: string;
  responsibilities: string[];
  architecture: ArchitectureDiagram;
  workflowSteps: string[];
  technicalApproach: string;
  backendImplementation: string;
  frontendImplementation: string;
  databaseConsiderations: string;
  integrationConsiderations: string;
  engineeringDecisions: string[];
  challengesAndSolutions: ChallengeSolution[];
  securityAndValidation: string;
  businessImpact: string;
  technologiesUsed: string[];
  lessonsLearned: string;
}

export interface NavLink {
  label: string;
  href: string;
}
