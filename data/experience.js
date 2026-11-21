// Experience source ledger. Visitor-facing components use `verified` data only.
// Missing Boingo media/post URL and PureGym employment details stay internal
// until Khaled supplies a matching public source or direct confirmation.
export const experienceSources = {
  verified: {
    boingo: {
      organization: "Boingo Wireless",
      period: "Summer 2024",
      role: "Wireless Operations Intern",
      office: "Rockefeller Center",
      companyPostLabel: "Boingo Wireless company post",
      companyPostExcerpt:
        "Meet Khaled and Emely, our 2024 summer interns from Queens College in New York.",
      activities: [
        "Exposure to how large-scale 5G and Wi-Fi networks are designed, built, and managed",
        "A behind-the-scenes visit to the Boingo network at World Trade Center Oculus",
        "A visit to New York Hall of Science",
        "Attendance at a City & State New York transportation leadership event",
        "Contribution to social-media content for Boingo’s LinkedIn community",
      ],
    },
    cove: {
      organization: "The Cove Dev, LLC",
      period: "August–December 2025",
      role: "Full-Stack Web Development",
      summary:
        "Responsive client-facing development, dynamic interfaces, client-side logic, debugging, modular design, and Git-based delivery.",
    },
    pureGym: {
      summary:
        "Four members of the gym where I worked mentioned me by name in public Google reviews, for safety, care, cleanliness, and making them feel welcome.",
      sourceLabel: "Public Google review",
    },
  },
  unresolved: {
    boingoPostUrl: true,
    boingoMedia: true,
    pureGymTitle: true,
    pureGymDates: true,
    pureGymBranchConfirmation: true,
    reviewsInitiative: true,
  },
};

export const pureGymReviews = [
  {
    name: "Josef Sarabia",
    excerpt: "Making sure our safety is a priority and everyone is comfortable.",
    quote:
      "Appreciate all the hard work khaled does when he’s in the gym. Making sure our safety is a priority and everyone is comfortable. The new equipment is also a nice addition.",
    url: "https://share.google/xHQpn40Wejbj3ZTGS",
  },
  {
    name: "Ekta Golpo Bolar Chhilo",
    excerpt: "Specially Khaled takes care of the ambience. Its neat and tidy.",
    quote:
      "One of the value for money gym in the neighbourhood. Staff is proffesional.Specially Khaled takes care of the ambience. Its neat and tidy. Ofcourse there are chances of betterment. 8.5/10.",
    url: "https://share.google/rpKUScDQShMxPdL9U",
  },
  {
    name: "Syed Wasay",
    excerpt: "He showed me around guided me around and I felt so confident",
    quote:
      "Khaled the best employee he helped me around the gym today. He showed me around guided me around and I felt so confident and will be coming to this gym every single day!",
    url: "https://share.google/S7gyJZXRp8ScxSqMt",
  },
  {
    name: "Isabel Tajes",
    excerpt: "Love this gym been going since January! Khaled was the best worker!",
    quote: "Love this gym been going since January! Khaled was the best worker!",
    url: "https://share.google/GYqmokk4N04TatoPd",
  },
];

// Full role history, newest first. Wording follows the canonical résumé PDF.
export const experienceTimeline = [
  {
    id: "ai-evaluation",
    organization: "Mercor, Aligner & Handshake AI",
    role: "AI model evaluator (contract)",
    period: "Current",
    summary:
      "Evaluate and rate AI model responses against detailed project rubrics for accuracy, reasoning, and instruction-following, and write structured feedback used to improve the models.",
  },
  {
    id: "broderick",
    organization: "J.C. Broderick & Associates",
    role: "Environmental field technician",
    period: "Jun – Aug 2026",
    summary:
      "Performed industrial hygiene sampling, air quality monitoring, and on-site data collection at client sites, and supported environmental assessments and compliance documentation.",
  },
  {
    id: "cove",
    organization: "The Cove Dev, LLC",
    role: "Founder and full-stack developer",
    period: "Aug – Dec 2025",
    summary:
      "Built and deployed client websites and web applications with React, Next.js, and JavaScript. Ran the business on my own and earned about $6K in profit in 2025.",
    href: "/work/the-cove-dev",
    linkLabel: "Read the case study",
  },
  {
    id: "boingo",
    organization: "Boingo Wireless",
    role: "Wireless operations intern",
    period: "Summer 2024",
    summary:
      "Built ResetWave, a Python tool that sends commands to wireless LAN controllers over SSH, cutting an access-point reset workflow from about 2 hours to 10 seconds. Troubleshot live controllers and access points, supported a field deployment in Texas, and led a team in the company’s 3-day hackathon, presenting a Google Cloud and Vertex AI concept to executive leadership.",
    href: "/work/resetwave",
    linkLabel: "Read about ResetWave",
  },
  {
    id: "empire",
    organization: "Empire Camera Installations",
    role: "Field technician (independent contractor)",
    period: "2023 – 2025",
    summary:
      "Installed and configured IP security camera systems at client sites over Ethernet and Power over Ethernet, and diagnosed hardware, wiring, and network faults on site.",
  },
  {
    id: "meta",
    organization: "Meta Quest Research",
    role: "EMG research assistant",
    period: "Summer 2021",
    summary:
      "Supported wearable electromyography (EMG) signal collection, hardware evaluation, and gesture-recognition testing.",
  },
];
