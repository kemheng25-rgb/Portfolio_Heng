import type {
  ContactDetails,
  DomainExpertise,
  EducationEntry,
  ExperienceEntry,
  LanguageEntry,
  NavLink,
  PersonalDetails,
  SiteConfig,
  SkillCategory,
  SocialLinks,
  Stat,
} from "@/types/portfolio";

export const siteConfig: SiteConfig = {
  name: "Kem Heng CHENG | Full-Stack Software Developer",
  // TODO: replace with the production domain once deployed.
  url: "https://kemhengcheng.dev",
  ogImage: "/opengraph-image",
};

export const personal: PersonalDetails = {
  displayName: "Kem Heng CHENG",
  professionalName: "CHENG KEM HENG",
  initials: "CKH",
  title: "Full-Stack Software Developer",
  specialization: "Enterprise and Business Systems",
  location: "Phnom Penh, Cambodia",
  experienceSince: "October 2023",
  resumePath: "/resume.pdf",
  resumeAvailable: true,
  profileImage: "/images/profile.jpg",
};

export const contact: ContactDetails = {
  email: "kemhengcheng1@gmail.com",
  phone: "(+855) 61 642 241",
  showPhone: true,
};

export const social: SocialLinks = {
  github: "https://github.com/kemheng25-rgb",
  linkedin: "https://www.linkedin.com/in/cheng-kemheng",
};

export const brand = {
  headline: "Full-Stack Developer Building Enterprise Systems People Can Rely On.",
  supportingStatement:
    "I turn complex and manual business processes into reliable digital systems—from requirements and architecture to implementation, integration, deployment, and production support.",
  ctaPrimary: "View My Work",
  ctaSecondary: "Contact Me",
  ctaResume: "Download Résumé",
};

export const stats: Stat[] = [
  { value: "~3 Years", label: "Professional Experience" },
  { value: "10+", label: "Enterprise & Business Systems Delivered" },
  { value: "500+", label: "Daily Active Users Supported" },
  { value: "End-to-End", label: "Delivery Ownership" },
];

export const summary: string[] = [
  "I am a Full-Stack Software Developer with nearly three years of experience building enterprise ERP, HR, finance, retail, and operational systems used in production.",
  "I enjoy owning software modules end to end—from understanding business requirements and designing the architecture to implementation, integration, deployment, and live support.",
  "My work focuses on turning manual, repetitive, and error-prone processes into reliable digital systems that employees and businesses can depend on. I am comfortable working across backend and frontend development, and I am always willing to learn the technology that best fits the business need.",
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      "Next.js",
      "Blazor",
      "JavaScript",
      "HTML",
      "CSS",
      "Responsive web development",
      "Component-based user interface development",
    ],
  },
  {
    category: "Backend",
    skills: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "ASP.NET MVC",
      "Node.js",
      "Java",
      "Spring Boot",
      "REST API development",
      "Server-side business logic",
    ],
  },
  {
    category: "Databases",
    skills: [
      "PostgreSQL",
      "Relational database design",
      "SQL",
      "Query optimization",
      "Data modeling",
    ],
  },
  {
    category: "Enterprise Integration",
    skills: [
      "SAP integration",
      "REST API integration",
      "File-based system integration",
      "Master-data synchronization",
      "Employee-data synchronization",
      "Financial transaction posting",
      "Cost Center data",
      "General Ledger data",
      "Internal Order data",
    ],
  },
  {
    category: "Tools and Delivery",
    skills: [
      "Git",
      "Bitbucket",
      "Jira",
      "Postman",
      "Agile",
      "Scrum",
      "Requirements analysis",
      "System architecture",
      "Production deployment",
      "Production support",
      "End-to-end module delivery",
    ],
  },
];

export const domainExpertise: DomainExpertise[] = [
  {
    title: "Enterprise Resource Planning",
    description:
      "Connecting ordering, inventory, and invoicing into one operational workflow so operations teams stop relying on disconnected manual steps.",
  },
  {
    title: "HR and Allowance Systems",
    description:
      "Digitizing recruitment, onboarding, and allowance processes so HR teams can track requests and approvals in one place instead of paper or spreadsheets.",
  },
  {
    title: "Financial Claims and Expense Approvals",
    description:
      "Structuring mission, advance, and reimbursement requests through multi-step approvals so finance teams get consistent, auditable claim data.",
  },
  {
    title: "SAP Integration",
    description:
      "Synchronizing master data and posting financial transactions between internal systems and SAP, including Cost Center, General Ledger, and Internal Order data.",
  },
  {
    title: "Sales and Wholesale Distribution",
    description:
      "Connecting wholesale ERP operations with downstream financial systems through reliable file-based transfers.",
  },
  {
    title: "Retail Point of Sale",
    description:
      "Powering day-to-day retail transactions, including pricing, promotions, and combo deals, at the point of sale.",
  },
  {
    title: "Inventory Management",
    description:
      "Tracking stock movement and inventory transactions so retail and wholesale teams keep an accurate view of what is on hand.",
  },
  {
    title: "Serial and Batch Tracking",
    description:
      "Providing unit-level traceability for products through serial-number and batch tracking, from receiving through sale.",
  },
  {
    title: "Warranty Management",
    description:
      "Validating warranty status and supporting returns and product-history lookups for retail customers and support teams.",
  },
  {
    title: "Employee Recruitment and Onboarding",
    description:
      "Supporting recruitment and onboarding platforms, including synchronizing new employee data into downstream systems such as SAP.",
  },
  {
    title: "Safety and Compliance Tracking",
    description:
      "Giving safety and compliance teams real-time dashboards instead of manually compiled status reports.",
  },
  {
    title: "Enterprise Reporting",
    description:
      "Building configurable, template-driven reporting so implementation teams can adapt reports to different client requirements with less engineering involvement.",
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "Chip Mong Group",
    position: "Full-Stack Developer, IT Strategy",
    startDate: "April 2025",
    endDate: "Present",
    location: "Phnom Penh, Cambodia",
    groups: [
      {
        title: "CMG Retail ERP",
        bullets: [
          "Led development of an order-to-invoice business workflow.",
          "Helped move more than 100 daily operational users from paper-based ordering to one centralized digital workflow.",
          "Worked across requirements, backend development, frontend development, testing, deployment, and production support.",
          "Collaborated directly with business stakeholders to understand and digitize operational processes.",
        ],
      },
      {
        title: "Mission, Advance, and Reimbursement",
        bullets: [
          "Developed SAP-integrated claim submission and approval workflows.",
          "Replaced manual claim routing with a structured digital process.",
          "Worked on mission requests, employee advances, reimbursements, and financial approvals.",
          "Integrated approved financial transactions with SAP.",
          "Worked with Cost Center, General Ledger, Internal Order, mission, and per-diem data.",
          "Added validation and error handling to improve data reliability.",
        ],
      },
      {
        title: "Safety TPM System",
        bullets: [
          "Enhanced an enterprise safety and compliance system.",
          "Developed real-time operational dashboards.",
          "Provided more than 400 users with improved visibility into compliance status.",
          "Supported ongoing improvements and production issues.",
        ],
      },
      {
        title: "HR and Operations Systems",
        bullets: [
          "Supported and maintained business-critical internal systems.",
          "Worked with Meal Allowance, Recruitment Management, Onboarding, and other HR operational platforms.",
          "Investigated production issues and delivered fixes and improvements.",
          "Helped keep daily HR operations running reliably.",
        ],
      },
      {
        title: "SAP and Enterprise Integration",
        bullets: [
          "Integrated Meal Allowance, Overtime, Mission, Advance, and Reimbursement data with SAP.",
          "Retrieved and synchronized Cost Center, General Ledger, Internal Order, mission, and per-diem master data.",
          "Connected a Wholesale ERP system with SAP through file-based transfers.",
          "Implemented employee-data synchronization between an onboarding system and SAP.",
          "Worked with validation, error handling, logging, and synchronization reliability.",
        ],
      },
      {
        title: "AI Development Tooling Evaluation",
        bullets: [
          "Selected to help lead a company-wide evaluation of AI development tools.",
          "Evaluated technical fit, practical use cases, security considerations, and compatibility with internal development workflows.",
          "Helped define how AI tools could support the development team responsibly.",
        ],
      },
      {
        title: "Cross-Functional Collaboration",
        bullets: [
          "Work directly with business leads, users, technical teams, and other stakeholders.",
          "Participate in Agile and Scrum ceremonies.",
          "Translate operational requirements into maintainable software features.",
          "Deliver features and continue supporting them after release.",
        ],
      },
    ],
  },
  {
    company: "Centric Kernel POS",
    position: "Software Developer",
    startDate: "October 2023",
    endDate: "March 2025",
    location: "Phnom Penh, Cambodia",
    groups: [
      {
        title: "Retail Transaction Engine",
        bullets: [
          "Developed and optimized core retail transaction workflows.",
          "Worked on complex pricing models.",
          "Implemented promotional logic and combo deals.",
          "Worked with inventory transactions, invoicing, and customer reporting.",
          "Helped power daily sales operations for retail clients.",
        ],
      },
      {
        title: "Inventory and Warranty Tracking",
        bullets: [
          "Engineered serial-number and batch-level inventory tracking.",
          "Provided unit-level product traceability.",
          "Supported warranty validation, returns, and product-history tracking.",
          "Improved visibility into inventory movement.",
        ],
      },
      {
        title: "Configurable Reporting",
        bullets: [
          "Designed template-driven invoice and reporting functionality.",
          "Enabled implementation teams to configure operational reports with less engineering involvement.",
          "Supported different client reporting requirements.",
        ],
      },
      {
        title: "Implementation and Production Support",
        bullets: [
          "Supported clients from initial implementation and launch through ongoing maintenance.",
          "Investigated production issues.",
          "Delivered fixes, performance improvements, and feature enhancements.",
          "Communicated with implementation teams and business users.",
        ],
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Royal University of Phnom Penh",
    location: "Phnom Penh, Cambodia",
    // TODO: add the exact graduation date.
    graduationDate: undefined,
  },
];

export const languages: LanguageEntry[] = [
  { name: "Khmer", proficiency: "Native" },
  { name: "English", proficiency: "Professional working proficiency" },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
