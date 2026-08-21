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
        "Four public member reviews independently mentioned Khaled by name for safety, care, confidence, cleanliness, and service.",
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

// Fast-scan records intentionally omit employment details that remain
// unresolved in the source ledger.
export const experienceScanRecords = [
  {
    number: "01",
    organization: experienceSources.verified.boingo.organization,
    role: experienceSources.verified.boingo.role,
    period: experienceSources.verified.boingo.period,
    signal: "Linux · wireless operations · testing · validation",
    href: "#infrastructure",
    action: "Open engineering record",
  },
  {
    number: "02",
    organization: experienceSources.verified.cove.organization,
    role: experienceSources.verified.cove.role,
    period: experienceSources.verified.cove.period,
    signal: "Responsive interfaces · client-side logic · Git",
    href: "#ownership",
    action: "Open product record",
  },
  {
    number: "03",
    organization: "Public member evidence",
    role: "People-centered service record",
    period: "Four independent sources",
    signal: "Safety · care · confidence · cleanliness",
    href: "#people",
    action: "Inspect public sources",
  },
];
