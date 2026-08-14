export const projects = [
  {
    slug: "resetwave",
    number: "01",
    name: "ResetWave",
    eyebrow: "Engineering automation · Summer 2024",
    problem:
      "A repetitive engineering task for remotely managing infrastructure devices took approximately two hours.",
    role: "Engineering automation project during a Boingo Wireless internship",
    technology: ["Python", "Linux", "SSH", "Paramiko", "ThreadPoolExecutor"],
    proof: "Approximately 2 hours → approximately 10 seconds",
    status: "Full case study",
    href: "/work/resetwave",
    action: "Read the case study",
    tone: "plum",
  },
  {
    slug: "engineering-lab",
    number: "02",
    name: "Engineering Lab",
    eyebrow: "Hardware · digital systems · validation",
    problem:
      "Coursework and hands-on builds required physical measurements, simulated logic, debugging, and functional validation.",
    role: "Computer and electrical engineering student",
    technology: ["Circuit analysis", "Logisim", "Oscilloscope", "Fusion 360"],
    proof: "Real lab captures, digital logic simulation, and CAD studies",
    status: "Full collection",
    href: "/work/engineering-lab",
    action: "Enter the lab",
    image: "/media/engineering-lab/oscilloscope-card.webp",
    imageWidth: 1600,
    imageHeight: 1120,
    imageAlt: "Oscilloscope and function generator measuring a circuit on a lab bench",
    tone: "sage",
  },
  {
    slug: "the-cove-dev",
    number: "03",
    name: "The Cove Dev",
    eyebrow: "Client web products · Aug 2025–present",
    problem:
      "Small-business clients needed responsive web applications with dynamic user interfaces.",
    role: "Full-stack web development",
    technology: ["HTML", "CSS", "JavaScript", "Git"],
    proof: "Verified repository screenshots show responsive client-facing interfaces",
    status: "Full case study",
    href: "/work/the-cove-dev",
    action: "Read the case study",
    image: "/media/the-cove-dev/home.webp",
    imageWidth: 1257,
    imageHeight: 798,
    imageAlt: "Responsive landing-page interface created for The Cove Dev",
    tone: "coral",
  },
];

export const resetWaveFacts = {
  organization: "Boingo Wireless",
  period: "Summer 2024",
  role: "Wireless Operations Intern · engineering automation project",
  before: "Approximately 2 hours",
  after: "Approximately 10 seconds",
  calculation:
    "7,200 seconds ÷ 10 seconds = 720, so the measured timing represents an approximate 720× speedup.",
  resumeTechnology: ["Python", "Linux"],
  repositoryTechnology: ["SSH", "Paramiko", "ThreadPoolExecutor"],
};

// Source ledger: visitor-facing copy may use verified fields only. Items marked
// unresolved stay internal until Khaled supplies matching source evidence.
export const engineeringLabSources = {
  verified: {
    courseAssociation: "EET 118",
    relatedReport: "EET-118 — EXPERIMENT #6C",
    reportDate: "Wednesday, March 25",
    reportTopics: [
      "DC voltage",
      "ripple voltage",
      "RMS voltage",
      "percentage error",
      "total RMS voltage",
    ],
    measuredCapacitance: "58.1 μF",
    board: "Board #21",
    resumeSkills: [
      "Circuit Analysis",
      "Digital Logic Design",
      "Logisim simulation",
      "testing",
      "debugging",
      "validation",
    ],
  },
  unresolved: {
    photographToExperimentMapping: true,
    oscilloscopeChannelDefinitions: true,
    logisimCircuitPurpose: true,
    fusionModelPurpose: true,
    individualOrTeamStatus: true,
  },
};

// Source ledger: résumé statements and preserved repository captures are kept
// separate from details that are not established by the current public record.
export const coveDevSources = {
  verified: {
    organization: "The Cove Dev, LLC",
    period: "August 2025–present",
    role: "Full-Stack Web Development",
    technology: ["HTML", "CSS", "JavaScript", "Git"],
    responsibilities: [
      "Developed responsive web applications with dynamic user interfaces for clients",
      "Implemented client-side logic and debugging to improve performance and usability",
      "Applied modular design and version control using Git",
    ],
    repositoryMedia: [
      "Home interface capture",
      "About interface capture",
      "Services interface capture",
    ],
  },
  unresolved: {
    namedClientIdentities: true,
    perScreenContribution: true,
    mobileCaptureSet: true,
    analyticsOrBusinessMetrics: true,
    clientHandoffArtifacts: true,
  },
};
