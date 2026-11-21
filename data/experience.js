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
      period: "August 2025–present",
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
    id: "cove",
    organization: "The Cove Dev, LLC",
    role: "Full-stack web developer",
    period: "Aug 2025 – present",
    summary:
      "Build responsive web applications with dynamic interfaces for small-business clients using HTML, CSS, and JavaScript, with modular design and Git version control. The business made $6K in profit in 2025.",
    href: "/work/the-cove-dev",
    linkLabel: "Read the case study",
  },
  {
    id: "hackathon",
    organization: "Boingo Hack-a-Thon 2024",
    role: "Team lead",
    period: "Aug 2024",
    summary:
      "Led a software integration project built on Google Cloud and Vertex AI, and presented the architecture and results to executive leadership.",
  },
  {
    id: "boingo",
    organization: "Boingo Wireless",
    role: "Wireless operations intern",
    period: "Summer 2024",
    summary:
      "Supported the engineering team with system testing, validation, and troubleshooting, helped deploy and test Linux infrastructure, and built ResetWave, a Python automation tool that cut a 2-hour task to about 10 seconds.",
    href: "/work/resetwave",
    linkLabel: "Read about ResetWave",
  },
  {
    id: "empire",
    organization: "Empire Camera Installations",
    role: "Field technician (independent contractor)",
    period: "Summers 2023 – 2025",
    summary:
      "Installed and configured systems and hardware on site, and diagnosed and fixed hardware and connectivity problems.",
  },
  {
    id: "meta",
    organization: "Meta",
    role: "EMG research assistant (short-term)",
    period: "Summer 2023",
    summary:
      "Supported research on a wearable electromyography (EMG) sensing system, helping evaluate signal acquisition and hardware interaction for gesture and muscle-signal detection.",
  },
];
