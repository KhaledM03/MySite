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

// Education and skills mirror the canonical résumé PDF. Update both together.
export const EDUCATION = {
  school: "SUNY Farmingdale State College",
  degrees: "B.S. Computer Engineering + B.S. Electrical Engineering",
  graduation: "Spring 2028",
  gpa: "3.69",
};

// What the homepage says Khaled is looking for. Edit this one line when the
// search changes (for example, a specific term or role).
export const AVAILABILITY = "Engineering internships";

export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["C++", "Python", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Engineering",
    items: ["Circuit analysis", "Digital systems", "System testing", "Hardware troubleshooting", "Signal analysis"],
  },
  {
    title: "Tools",
    items: ["Git / GitHub", "Linux", "Node.js", "MATLAB", "Logisim", "Fusion 360", "Oscilloscope"],
  },
  {
    title: "Coursework",
    items: [
      "Circuit Analysis",
      "Digital Logic Design",
      "Computer Architecture",
      "Data Structures",
      "Object-Oriented Programming",
      "Computer Organization & Assembly",
      "UNIX / Linux Operating Systems",
    ],
  },
];
