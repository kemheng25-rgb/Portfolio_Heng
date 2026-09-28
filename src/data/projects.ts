import type { ProjectCaseStudy } from "@/types/portfolio";

// All six case studies describe private enterprise systems built or supported
// during the author's professional experience. No source code, live demos,
// screenshots, or company-confidential details are shown or linked — see
// `systemLabel` on each entry. Technologies listed are limited to what the
// underlying work is documented to involve; specific frameworks are
// intentionally omitted where the source brief did not tie them to the
// project (see CLAUDE.md content rules: no invented technologies).

export const projects: ProjectCaseStudy[] = [
  {
    slug: "retail-erp-order-to-invoice",
    title: "Retail ERP and Order-to-Invoice Workflow",
    shortDescription:
      "An enterprise retail ERP workflow that moved more than 100 daily operational users from paper-based ordering to a centralized digital process.",
    systemLabel: "Private Enterprise System",
    overview:
      "This workflow covers the full order-to-invoice cycle for a retail ERP platform: creating an order, validating it, routing it through approval, and turning it into an invoice. It replaced a paper-based process that operational teams relied on for daily ordering.",
    businessChallenge:
      "Before this workflow existed, ordering was handled on paper. That made it slow to process, easy to lose track of, and hard to reconcile against invoicing. The business needed a single digital workflow that operational users could depend on every day instead of routing paperwork between teams.",
    usersAndStakeholders:
      "More than 100 daily operational users who previously placed and tracked orders on paper, plus the business stakeholders who owned the ordering and invoicing process and needed visibility into it.",
    responsibilities: [
      "Worked directly with business stakeholders to understand and digitize the existing paper-based ordering process.",
      "Led development of the order-to-invoice workflow.",
      "Worked across requirements, backend development, frontend development, testing, deployment, and production support.",
    ],
    architecture: {
      nodes: [
        { id: "client", label: "Order Entry (Web)", type: "client" },
        { id: "api", label: "Order API", type: "api" },
        { id: "service", label: "Approval & Invoicing Service", type: "service" },
        { id: "db", label: "Orders Database", type: "database" },
      ],
      edges: [
        { from: "client", to: "api", label: "Submit order" },
        { from: "api", to: "service", label: "Validate & route" },
        { from: "service", to: "db", label: "Persist order / invoice" },
        { from: "service", to: "client", label: "Status updates" },
      ],
    },
    workflowSteps: [
      "Operational user creates an order digitally instead of on paper.",
      "System validates the order against business rules.",
      "Order is routed for approval.",
      "Approved order is converted into an invoice.",
      "Order and invoice status is visible to the requesting user.",
    ],
    technicalApproach:
      "The workflow was built as a centralized digital process covering order creation, validation, approval, and invoicing, designed to replace the paper-based routing step by step so daily operations were not disrupted during the transition.",
    backendImplementation:
      "Backend responsibilities covered validating incoming orders, enforcing the approval workflow, and generating invoices from approved orders, while keeping order and invoice state consistent as requests moved through the process.",
    frontendImplementation:
      "The frontend gave operational users a digital order-entry experience to replace paper forms, along with visibility into where an order stood in the approval and invoicing process.",
    databaseConsiderations:
      "Order, approval, and invoice records needed to stay consistent with each other as an order moved through the workflow, since invoicing depends directly on the approved order data.",
    integrationConsiderations:
      "The workflow needed to fit into the existing retail ERP system rather than operate as a standalone tool, so it could be adopted by the operational teams already using that ERP.",
    engineeringDecisions: [
      "Centralized the order-to-invoice steps into one workflow instead of leaving ordering and invoicing as separate, loosely connected processes.",
      "Prioritized a smooth transition from paper so more than 100 daily users could adopt the new process without disrupting operations.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Moving over 100 daily operational users off a paper-based process they were used to.",
        solution:
          "Worked directly with business stakeholders to digitize the process the way it actually operated, rather than imposing an unfamiliar workflow.",
      },
      {
        challenge: "Keeping orders and invoices consistent as they moved through approval.",
        solution:
          "Backend validation and workflow routing were used to enforce order state before invoicing could occur.",
      },
    ],
    securityAndValidation:
      "Order data was validated before it could move to approval or invoicing, keeping invalid or incomplete orders from progressing through the workflow.",
    businessImpact:
      "More than 100 daily operational users moved from paper-based ordering to one centralized digital workflow, giving the business a consistent order-to-invoice process to rely on.",
    technologiesUsed: [
      "Order-to-invoice workflow design",
      "Backend validation and business logic",
      "Frontend order-entry interface",
      "Production deployment and support",
    ],
    lessonsLearned:
      "Digitizing a paper-based process well means starting from how the business actually works today, then building the workflow and approval logic around that reality rather than replacing it with something unfamiliar.",
  },
  {
    slug: "sap-mission-advance-reimbursement",
    title: "SAP-Integrated Mission, Advance, and Reimbursement System",
    shortDescription:
      "A digital employee claim and approval platform integrated with SAP.",
    systemLabel: "Private Enterprise System",
    overview:
      "This system digitizes mission requests, employee advances, and reimbursement claims, routing them through structured multi-step approvals and posting approved financial transactions into SAP.",
    businessChallenge:
      "Claim routing was previously manual, which made it harder to track approvals and reliably get financial data into SAP. The business needed a structured digital process for mission, advance, and reimbursement claims that fed directly into SAP's financial data.",
    usersAndStakeholders:
      "Employees submitting mission requests, advances, and reimbursement claims, the approvers responsible for financial sign-off, and the finance function relying on accurate SAP postings.",
    responsibilities: [
      "Developed SAP-integrated claim submission and approval workflows.",
      "Worked on mission requests, employee advances, reimbursements, and financial approvals.",
      "Integrated approved financial transactions with SAP, working with Cost Center, General Ledger, Internal Order, mission, and per-diem data.",
      "Added validation and error handling to improve data reliability.",
    ],
    architecture: {
      nodes: [
        { id: "client", label: "Claim Submission Portal", type: "client" },
        { id: "api", label: "Claims API", type: "api" },
        { id: "service", label: "Approval Workflow Service", type: "service" },
        { id: "db", label: "Claims Database", type: "database" },
        { id: "sap", label: "SAP", type: "external" },
      ],
      edges: [
        { from: "client", to: "api", label: "Submit claim" },
        { from: "api", to: "service", label: "Route for approval" },
        { from: "service", to: "db", label: "Persist claim & approvals" },
        { from: "service", to: "sap", label: "Post financial transaction" },
        { from: "sap", to: "service", label: "Cost Center / GL / IO data" },
      ],
    },
    workflowSteps: [
      "Employee submits a mission request, advance, or reimbursement claim.",
      "Claim is routed through structured, multi-step financial approvals.",
      "Approved claims are validated against Cost Center, General Ledger, and Internal Order data.",
      "Approved financial transactions are posted to SAP.",
      "Claim status remains auditable end to end.",
    ],
    technicalApproach:
      "The system replaced manual claim routing with a structured digital workflow, adding validation and error handling around the mission, advance, and reimbursement data before it reached SAP.",
    backendImplementation:
      "Backend work covered the claim submission and multi-step approval workflow, along with the logic to prepare mission, advance, reimbursement, and per-diem data for posting to SAP.",
    frontendImplementation:
      "The frontend gave employees a structured way to submit mission requests, advances, and reimbursement claims, and gave approvers visibility into claims awaiting their sign-off.",
    databaseConsiderations:
      "Claim, approval, and per-diem data needed to stay consistent and auditable, since approved records were the source of truth for what got posted to SAP.",
    integrationConsiderations:
      "Integration with SAP covered retrieving and synchronizing Cost Center, General Ledger, and Internal Order master data, and posting approved financial transactions back into SAP.",
    engineeringDecisions: [
      "Replaced manual claim routing with a structured, multi-step approval workflow rather than a single-step sign-off.",
      "Added validation and error handling specifically around the data feeding SAP, since that data represented real financial transactions.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Manual claim routing made approvals and SAP posting harder to track reliably.",
        solution:
          "Replaced manual routing with a structured digital approval workflow tied directly to SAP posting.",
      },
      {
        challenge: "Keeping mission, advance, reimbursement, and per-diem data reliable before it reached SAP.",
        solution:
          "Added validation and error handling around claim data ahead of financial posting.",
      },
    ],
    securityAndValidation:
      "Claims were validated at each step of the approval workflow, and error handling was added specifically to reduce data reliability issues before financial transactions were posted to SAP.",
    businessImpact:
      "Manual claim routing was replaced with a structured digital process for mission requests, advances, and reimbursements, with approved transactions posted directly into SAP.",
    technologiesUsed: [
      "SAP integration",
      "Financial transaction posting",
      "Cost Center, General Ledger, and Internal Order data synchronization",
      "Multi-step approval workflow",
      "Validation and error handling",
    ],
    lessonsLearned:
      "When a workflow feeds financial data into a system like SAP, validation and error handling are not an afterthought — they need to be built in around the data at every step leading up to the SAP post.",
  },
  {
    slug: "safety-tpm-compliance-dashboard",
    title: "Safety TPM and Compliance Dashboard",
    shortDescription:
      "A safety and compliance platform with real-time dashboards supporting more than 400 users.",
    systemLabel: "Private Enterprise System",
    overview:
      "This project enhanced an existing enterprise safety and compliance system, adding real-time operational dashboards that gave more than 400 users better visibility into compliance status.",
    businessChallenge:
      "Compliance status needed to be visible in real time rather than compiled after the fact, so teams could act on safety and compliance information as it changed.",
    usersAndStakeholders:
      "More than 400 users relying on the safety and compliance platform for day-to-day visibility, plus the teams responsible for acting on compliance status.",
    responsibilities: [
      "Enhanced an enterprise safety and compliance system.",
      "Developed real-time operational dashboards.",
      "Supported ongoing improvements and production issues.",
    ],
    architecture: {
      nodes: [
        { id: "client", label: "Compliance Dashboard", type: "client" },
        { id: "api", label: "Reporting API", type: "api" },
        { id: "service", label: "Aggregation Service", type: "service" },
        { id: "db", label: "Compliance Database", type: "database" },
      ],
      edges: [
        { from: "client", to: "api", label: "Request dashboard data" },
        { from: "api", to: "service", label: "Aggregate compliance status" },
        { from: "service", to: "db", label: "Read operational records" },
      ],
    },
    workflowSteps: [
      "Operational and compliance data is recorded in the underlying safety system.",
      "The aggregation layer summarizes current compliance status.",
      "Dashboards present that status to users in real time.",
      "Production issues affecting dashboard accuracy are investigated and resolved.",
    ],
    technicalApproach:
      "Work focused on extending an existing safety and compliance system with real-time dashboards, rather than building a new platform from scratch.",
    backendImplementation:
      "Backend work supported aggregating and serving operational compliance data so dashboards could reflect current status rather than stale reports.",
    frontendImplementation:
      "Dashboards were designed to give users clear, real-time visibility into compliance status as part of their daily workflow.",
    databaseConsiderations:
      "Dashboard accuracy depended on the underlying compliance data staying current and correctly aggregated as conditions changed.",
    integrationConsiderations:
      "The dashboards were built as an enhancement to the existing safety and compliance system rather than a separate platform, so they needed to work with that system's existing data.",
    engineeringDecisions: [
      "Prioritized real-time visibility over periodic reporting, so compliance status reflected current conditions.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Giving more than 400 users reliable visibility into compliance status.",
        solution:
          "Built real-time dashboards on top of the existing safety system and supported ongoing production issues to keep that visibility reliable.",
      },
    ],
    securityAndValidation:
      "Dashboard data was scoped to reflect accurate, current operational and compliance records for the users relying on it.",
    businessImpact:
      "More than 400 users gained improved, real-time visibility into compliance status through the enhanced dashboards.",
    technologiesUsed: [
      "Real-time operational dashboards",
      "Compliance data aggregation",
      "Production support",
    ],
    lessonsLearned:
      "Enhancing an existing enterprise system means understanding how it already works before adding new capability, so the new dashboards stayed accurate to the underlying compliance data.",
  },
  {
    slug: "retail-pos-transaction-engine",
    title: "Retail POS Transaction Engine",
    shortDescription:
      "A retail transaction engine supporting pricing, promotions, combo deals, inventory, invoicing, and customer reporting.",
    systemLabel: "Private Enterprise System",
    overview:
      "This transaction engine powers daily retail sales operations, handling complex pricing models, promotional logic, combo deals, inventory transactions, invoicing, and customer reporting.",
    businessChallenge:
      "Retail clients needed a transaction engine that could reliably apply complex pricing, promotions, and combo deals at the point of sale while keeping inventory and invoicing accurate.",
    usersAndStakeholders:
      "Retail clients and their point-of-sale operators relying on the engine for daily sales operations, and the implementation teams supporting those clients.",
    responsibilities: [
      "Developed and optimized core retail transaction workflows.",
      "Worked on complex pricing models, promotional logic, and combo deals.",
      "Worked with inventory transactions, invoicing, and customer reporting.",
    ],
    architecture: {
      nodes: [
        { id: "client", label: "POS Terminal", type: "client" },
        { id: "api", label: "Transaction API", type: "api" },
        { id: "service", label: "Pricing & Promotion Engine", type: "service" },
        { id: "db", label: "Transaction Database", type: "database" },
      ],
      edges: [
        { from: "client", to: "api", label: "Submit sale" },
        { from: "api", to: "service", label: "Apply pricing / promotions" },
        { from: "service", to: "db", label: "Record transaction & inventory" },
      ],
    },
    workflowSteps: [
      "A sale is initiated at the point of sale.",
      "Pricing, promotions, and combo deals are applied to the transaction.",
      "Inventory is updated to reflect the sale.",
      "An invoice is generated for the customer.",
      "Transaction data feeds customer reporting.",
    ],
    technicalApproach:
      "Development focused on optimizing the core retail transaction workflow so pricing, promotions, and combo deals could be applied reliably as part of every sale.",
    backendImplementation:
      "Backend logic handled complex pricing models, promotional rules, and combo deal calculations, along with the inventory and invoicing updates that followed each transaction.",
    frontendImplementation:
      "The point-of-sale experience needed to reflect pricing and promotions accurately at the moment of sale.",
    databaseConsiderations:
      "Transaction, inventory, and invoicing records needed to stay in sync so that reporting reflected what had actually happened at the point of sale.",
    integrationConsiderations:
      "The engine needed to support the daily sales operations of multiple retail clients, each with their own pricing and promotional setups.",
    engineeringDecisions: [
      "Optimized core transaction workflows to reliably support complex pricing, promotions, and combo deals rather than treating them as edge cases.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Reliably applying complex pricing models, promotions, and combo deals at the point of sale.",
        solution:
          "Developed and optimized the transaction engine specifically around these pricing and promotional rules.",
      },
    ],
    securityAndValidation:
      "Transactions were processed against defined pricing and promotional rules to keep sales, inventory, and invoicing consistent.",
    businessImpact:
      "The engine helped power daily sales operations for retail clients, supporting pricing, promotions, inventory, invoicing, and customer reporting.",
    technologiesUsed: [
      "Retail transaction processing",
      "Pricing and promotion logic",
      "Inventory transactions",
      "Invoicing and customer reporting",
    ],
    lessonsLearned:
      "Retail pricing and promotions get complex quickly — building the transaction engine around that complexity from the start made it easier to support new pricing and promotional rules later.",
  },
  {
    slug: "serial-batch-warranty-tracking",
    title: "Serial, Batch, and Warranty Tracking",
    shortDescription:
      "An inventory traceability solution that provided unit-level product tracking.",
    systemLabel: "Private Enterprise System",
    overview:
      "This solution engineered serial-number and batch-level inventory tracking, giving unit-level product traceability and supporting warranty validation, returns, and product-history tracking.",
    businessChallenge:
      "Without unit-level tracking, it was harder to validate warranty claims, process returns confidently, or see the movement history of individual products or batches.",
    usersAndStakeholders:
      "Retail and support teams needing to validate warranty claims, process returns, and look up product history at the unit level.",
    responsibilities: [
      "Engineered serial-number and batch-level inventory tracking.",
      "Supported warranty validation, returns, and product-history tracking.",
      "Improved visibility into inventory movement.",
    ],
    architecture: {
      nodes: [
        { id: "client", label: "Inventory / Service Console", type: "client" },
        { id: "api", label: "Tracking API", type: "api" },
        { id: "service", label: "Traceability Service", type: "service" },
        { id: "db", label: "Inventory Database", type: "database" },
      ],
      edges: [
        { from: "client", to: "api", label: "Look up unit / batch" },
        { from: "api", to: "service", label: "Resolve product history" },
        { from: "service", to: "db", label: "Read serial / batch records" },
      ],
    },
    workflowSteps: [
      "Products are recorded with serial-number or batch-level detail as they move through inventory.",
      "A unit or batch can be looked up to see its movement history.",
      "Warranty status is validated against that history.",
      "Returns are processed with visibility into the specific unit or batch involved.",
    ],
    technicalApproach:
      "The solution was engineered specifically around unit-level traceability, tracking products by serial number or batch rather than only by aggregate stock counts.",
    backendImplementation:
      "Backend logic tracked serial-number and batch-level inventory movement and exposed that history for warranty validation and returns processing.",
    frontendImplementation:
      "The interface let users look up and search product history at the unit or batch level, supporting warranty and returns workflows.",
    databaseConsiderations:
      "Tracking data needed enough granularity to resolve individual serial numbers and batches, since warranty validation and returns depended on that level of detail.",
    integrationConsiderations:
      "This traceability layer needed to work alongside existing inventory movement and sales data to provide a complete product history.",
    engineeringDecisions: [
      "Tracked inventory at the serial-number and batch level rather than only in aggregate, to support warranty validation and returns directly.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Providing reliable unit-level traceability for warranty validation and returns.",
        solution:
          "Engineered serial-number and batch-level tracking so individual units and batches could be looked up with their movement history.",
      },
    ],
    securityAndValidation:
      "Warranty validation relied on accurate serial-number and batch data, so data integrity in the tracking records was central to the solution.",
    businessImpact:
      "The solution improved visibility into inventory movement and supported warranty validation, returns, and product-history tracking at the unit level.",
    technologiesUsed: [
      "Serial-number tracking",
      "Batch tracking",
      "Inventory movement visibility",
      "Warranty validation and returns support",
    ],
    lessonsLearned:
      "Traceability is only as useful as the granularity it's tracked at — moving from aggregate stock counts to serial and batch-level records was what made warranty and returns workflows reliable.",
  },
  {
    slug: "sap-enterprise-system-integration",
    title: "SAP and Enterprise System Integration",
    shortDescription:
      "Integration between HR, ERP, financial, onboarding, and SAP systems.",
    systemLabel: "Private Enterprise System",
    overview:
      "This work integrated several internal systems — HR, ERP, and onboarding — with SAP, covering master-data synchronization, employee-data synchronization, and financial transaction posting.",
    businessChallenge:
      "Meal Allowance, Overtime, Mission, Advance, and Reimbursement data, along with employee and master data, needed to move reliably between internal systems and SAP without manual re-entry.",
    usersAndStakeholders:
      "Finance and HR teams depending on accurate, synchronized data in SAP, and the internal systems (onboarding, wholesale ERP, HR platforms) that needed to stay in sync with it.",
    responsibilities: [
      "Integrated Meal Allowance, Overtime, Mission, Advance, and Reimbursement data with SAP.",
      "Retrieved and synchronized Cost Center, General Ledger, Internal Order, mission, and per-diem master data.",
      "Connected a Wholesale ERP system with SAP through file-based transfers.",
      "Implemented employee-data synchronization between an onboarding system and SAP.",
      "Worked with validation, error handling, logging, and synchronization reliability.",
    ],
    architecture: {
      nodes: [
        { id: "onboarding", label: "Onboarding System", type: "external" },
        { id: "erp", label: "Wholesale ERP", type: "external" },
        { id: "integration", label: "Integration Layer", type: "service" },
        { id: "log", label: "Sync & Audit Log", type: "database" },
        { id: "sap", label: "SAP", type: "external" },
      ],
      edges: [
        { from: "onboarding", to: "integration", label: "Employee-data sync" },
        { from: "erp", to: "integration", label: "File-based transfer" },
        { from: "integration", to: "sap", label: "Master data / financial posting" },
        { from: "integration", to: "log", label: "Log & validate" },
      ],
    },
    workflowSteps: [
      "Source systems (onboarding, wholesale ERP, HR platforms) generate data that needs to reach SAP.",
      "The integration layer validates the data and applies error handling.",
      "Master data and employee data are synchronized with SAP; approved financial data is posted.",
      "Synchronization activity is logged for reliability and troubleshooting.",
    ],
    technicalApproach:
      "Integration work combined REST-based synchronization with file-based transfers where that was the existing mechanism (as with the Wholesale ERP), depending on what each source system supported.",
    backendImplementation:
      "Backend work implemented the synchronization logic for Meal Allowance, Overtime, Mission, Advance, and Reimbursement data, and for Cost Center, General Ledger, Internal Order, mission, and per-diem master data.",
    frontendImplementation:
      "This work was primarily backend and integration-focused; it did not center on end-user interface development.",
    databaseConsiderations:
      "Synchronization and audit logs needed to capture what was sent to SAP and the result, so issues could be traced back to their source.",
    integrationConsiderations:
      "Different source systems required different integration approaches — REST APIs for some data, file-based transfers for the Wholesale ERP connection to SAP — and employee-data synchronization specifically for the onboarding system.",
    engineeringDecisions: [
      "Used file-based transfer for the Wholesale ERP to SAP connection to match how that system already exchanged data.",
      "Built validation, error handling, and logging around every synchronization path to keep master data and financial postings reliable.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Keeping master data and employee data synchronized reliably across multiple internal systems and SAP.",
        solution:
          "Added validation, error handling, and logging around each synchronization path so issues could be caught and traced.",
      },
      {
        challenge: "Connecting a Wholesale ERP system to SAP without an existing API integration.",
        solution: "Implemented the connection through file-based transfers.",
      },
    ],
    securityAndValidation:
      "Data was validated before synchronization or posting, with error handling and logging in place to catch and trace issues in the synchronization process.",
    businessImpact:
      "Meal Allowance, Overtime, Mission, Advance, Reimbursement, employee, and master data now synchronize with SAP reliably instead of requiring manual re-entry across systems.",
    technologiesUsed: [
      "SAP integration",
      "REST API integration",
      "File-based system integration",
      "Master-data and employee-data synchronization",
      "Financial transaction posting",
      "Validation, error handling, and logging",
    ],
    lessonsLearned:
      "Enterprise integration rarely uses one mechanism everywhere — matching the integration approach (API vs. file-based) to what each source system actually supports mattered more than standardizing on a single method.",
  },
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projects.find((project) => project.slug === slug);
}
