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

// Education and skills mirror the canonical résumé PDF. GPA, honors, and
// transfer credits follow the transcript (cumulative GPA through Spring 2026).
// Graduation timing and what Khaled is looking for live in lib/status.js and
// follow the calendar automatically.
export const EDUCATION = {
  school: "Farmingdale State College (SUNY)",
  degrees: [
    "B.S. Computer Engineering Technology",
    "B.S. Electrical Engineering Technology",
  ],
  gpa: "3.63",
  honors: "Dean’s List, Fall 2025 and Spring 2026",
  previous: {
    school: "CUNY Queens College",
    period: "2022 – 2025",
    detail: "64 credits transferred, including Computer Programming I & II, Digital Electronics, Discrete Math, Calculus I & II, and Linear Algebra.",
  },
};

export const SKILL_GROUPS = [
  {
    title: "Lab and test",
    items: ["Soldering", "Oscilloscopes", "Digital multimeters", "Function generators", "NI Multisim", "MATLAB"],
  },
  {
    title: "Digital and embedded",
    items: ["VHDL", "Vivado", "Nexys A7 FPGA", "Logisim", "Assembly language"],
  },
  {
    title: "Networking and field systems",
    items: ["Cisco 9800 WLC", "Access points", "Ethernet / PoE", "IP camera systems", "Linux", "SSH", "Datadog"],
  },
  {
    title: "Programming",
    items: ["Python (Paramiko)", "C++", "JavaScript", "React", "Next.js", "Node.js", "HTML / CSS", "Git / GitHub"],
  },
  {
    title: "Coursework",
    items: [
      "Electric Circuits I & II",
      "Semiconductor Devices & Circuits",
      "Electronic Devices & Amplifiers",
      "Digital Design (VHDL / FPGA)",
      "Circuit Network Analysis",
      "Data Structures",
      "UNIX Operating Systems",
    ],
  },
];
