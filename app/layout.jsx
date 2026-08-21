import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";
import FieldConsole from "@/components/ui/FieldConsole";
import InteractionLayer from "@/components/ui/InteractionLayer";
import ContactFieldCard from "@/components/ui/ContactFieldCard";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_PATH,
} from "@/lib/metadata";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Khaled Mousa",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Khaled Mousa", url: SITE_URL }],
  creator: "Khaled Mousa",
  publisher: "Khaled Mousa",
  category: "portfolio",
  keywords: [
    "Khaled Mousa",
    "computer engineering",
    "electrical engineering",
    "Python automation",
    "digital systems",
    "full-stack development",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: SOCIAL_IMAGE_ALT,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: SOCIAL_IMAGE_PATH, alt: SOCIAL_IMAGE_ALT }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4ead9",
  colorScheme: "light",
};

const identityData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Khaled Mousa",
      url: SITE_URL,
      image: `${SITE_URL}/characters/khaled-hero.webp`,
      jobTitle: "Computer and Electrical Engineering Student",
      description: DEFAULT_DESCRIPTION,
      sameAs: [
        "https://github.com/KhaledM03",
        "https://www.linkedin.com/in/thekhaledmousa/",
      ],
      knowsAbout: [
        "Computer engineering",
        "Electrical engineering",
        "Python automation",
        "Digital logic",
        "Circuit analysis",
        "Full-stack web development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={identityData} />
        {children}
        <ContactFieldCard />
        <FieldConsole />
        <InteractionLayer />
      </body>
    </html>
  );
}
