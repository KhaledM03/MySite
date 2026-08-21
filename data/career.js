// Career-system source ledger. Visitor-facing components should reuse these
// records instead of creating parallel claims or contact/resume paths.

export const CAREER_LINKS = {
  email: "khaledmousa216@gmail.com",
  mailto: "mailto:khaledmousa216@gmail.com",
  github: "https://github.com/KhaledM03",
  linkedin: "https://www.linkedin.com/in/thekhaledmousa/",
  resume: "/resume/khaled-mousa-resume.pdf",
  portfolioRepository: "https://github.com/KhaledM03/MySite",
};

// One canonical deployed résumé exists. The phone number and street-level
// details in the source document are intentionally not repeated in site UI.
export const CANONICAL_RESUME = {
  href: CAREER_LINKS.resume,
  label: "Khaled Mousa résumé",
  detail: "One-page engineering résumé · PDF",
};

// GitHub visibility was verified on 2026-08-21. ResetWave has no public
// repository, and the repositories associated with The Cove Dev are private.
// Therefore only this portfolio receives a public code link.
export const PUBLIC_CODE = {
  portfolio: {
    label: "Portfolio source",
    href: CAREER_LINKS.portfolioRepository,
    detail: "Public Next.js repository",
  },
};

export const CAPABILITY_EVIDENCE = [
  {
    id: "circuit-analysis",
    label: "Circuit analysis",
    summary: "Physical circuits, oscilloscope observation, and documented lab calculations.",
    project: "Engineering Lab",
    href: "/work/engineering-lab#electronics",
    proof: "Real bench, instrument, and report evidence",
  },
  {
    id: "digital-logic",
    label: "Digital logic",
    summary: "Logisim simulation, visible signal paths, testing, debugging, and validation.",
    project: "Engineering Lab",
    href: "/work/engineering-lab#logic",
    proof: "Preserved logic simulation evidence",
  },
  {
    id: "linux-systems",
    label: "Linux / systems",
    summary: "Linux infrastructure exposure, system testing, troubleshooting, and validation.",
    project: "Boingo Wireless + ResetWave",
    href: "/experience#infrastructure",
    proof: "Résumé and company-context record",
  },
  {
    id: "python-automation",
    label: "Python automation",
    summary: "A repeatable infrastructure-management workflow using Python and Linux.",
    project: "ResetWave",
    href: "/work/resetwave#outcome",
    proof: "Approximately 2 hours → approximately 10 seconds",
  },
  {
    id: "responsive-development",
    label: "Responsive development",
    summary: "Responsive client-facing interfaces, client-side logic, debugging, and Git delivery.",
    project: "The Cove Dev",
    href: "/work/the-cove-dev#cove-interface",
    proof: "Three preserved interface states",
  },
];

export const SYSTEMS_MAP_NODES = [
  {
    id: "physical-systems",
    number: "01",
    label: "Physical systems",
    action: "Observe",
    detail: "Instrument displays and bench evidence make physical behavior inspectable.",
    evidence: "Engineering Lab",
    stack: "Oscilloscope · measurement",
    proof: "Real photographed evidence",
    href: "/work/engineering-lab#electronics",
    capabilityIds: ["circuit-analysis"],
  },
  {
    id: "circuits-hardware",
    number: "02",
    label: "Circuits + hardware",
    action: "Analyze",
    detail: "Circuit-analysis coursework and documented calculations connect setup to measurement.",
    evidence: "Engineering Lab",
    stack: "EET 118 · circuit analysis",
    proof: "Report and bench context",
    href: "/work/engineering-lab#electronics",
    capabilityIds: ["circuit-analysis"],
  },
  {
    id: "digital-systems",
    number: "03",
    label: "Digital systems",
    action: "Simulate",
    detail: "Digital logic moves the work from physical signals into inspectable system behavior.",
    evidence: "Engineering Lab",
    stack: "Logisim · testing · validation",
    proof: "Preserved simulation evidence",
    href: "/work/engineering-lab#logic",
    capabilityIds: ["digital-logic"],
  },
  {
    id: "linux-networks",
    number: "04",
    label: "Linux / networks",
    action: "Validate",
    detail: "Wireless-operations experience adds infrastructure, Linux, testing, and troubleshooting context.",
    evidence: "Boingo Wireless",
    stack: "Linux · networks · validation",
    proof: "Résumé + company context",
    href: "/experience#infrastructure",
    capabilityIds: ["linux-systems"],
  },
  {
    id: "python-automation",
    number: "05",
    label: "Python automation",
    action: "Automate",
    detail: "ResetWave turns infrastructure knowledge into a repeatable operational workflow.",
    evidence: "ResetWave",
    stack: "Python · Linux · SSH",
    proof: "≈2 hours → ≈10 seconds",
    href: "/work/resetwave#outcome",
    capabilityIds: ["python-automation", "linux-systems"],
  },
  {
    id: "software-products",
    number: "06",
    label: "Software / web products",
    action: "Ship",
    detail: "Responsive interfaces carry system thinking into client-facing software products.",
    evidence: "The Cove Dev",
    stack: "HTML · CSS · JavaScript · Git",
    proof: "Three preserved interface states",
    href: "/work/the-cove-dev#cove-interface",
    capabilityIds: ["responsive-development"],
  },
];

export const FIELD_BRIEF_SIGNALS = [
  {
    label: "Build",
    title: "Computer + electrical engineering",
    detail: "Physical systems, circuits, digital logic, and testing.",
  },
  {
    label: "Automate",
    title: "Python systems automation",
    detail: "Linux workflows built around real operational constraints.",
  },
  {
    label: "Validate",
    title: "Physical + digital systems",
    detail: "Measurement, simulation, debugging, and functional validation.",
  },
  {
    label: "Ship",
    title: "Responsive software products",
    detail: "Client-facing interfaces with documented public evidence.",
  },
];

export const FIELD_BRIEF_EVIDENCE = [
  {
    number: "01",
    name: "ResetWave",
    signal: "Measured automation impact",
    proof: "≈2 hours → ≈10 seconds",
    href: "/work/resetwave#outcome",
  },
  {
    number: "02",
    name: "Engineering Lab",
    signal: "Physical + digital validation",
    proof: "Real measurement, logic, and CAD evidence",
    href: "/work/engineering-lab#gallery",
  },
  {
    number: "03",
    name: "The Cove Dev",
    signal: "Responsive client-facing work",
    proof: "Three preserved interface states",
    href: "/work/the-cove-dev#cove-interface",
  },
];

export const HERO_CAPABILITIES = [
  {
    number: "01",
    title: "Automation",
    detail: "Python · Linux · operational workflow",
    href: "/work/resetwave#outcome",
  },
  {
    number: "02",
    title: "Hardware",
    detail: "Circuits · measurement · troubleshooting",
    href: "/work/engineering-lab#electronics",
  },
  {
    number: "03",
    title: "Digital systems",
    detail: "Logic design · simulation · validation",
    href: "/work/engineering-lab#logic",
  },
  {
    number: "04",
    title: "Web products",
    detail: "JavaScript · responsive UI · Git",
    href: "/work/the-cove-dev#cove-interface",
  },
];
