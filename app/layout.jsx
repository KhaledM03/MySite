import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/metadata";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Khaled Mousa",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Khaled Mousa", url: SITE_URL }],
  creator: "Khaled Mousa",
  category: "portfolio",
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export const viewport = {
  themeColor: "#f4ead9",
  colorScheme: "light",
};

const identityData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Khaled Mousa",
    url: SITE_URL,
    description:
      "Computer and electrical engineering student working across software, electronics, automation, and systems.",
    sameAs: [
      "https://github.com/KhaledM03",
      "https://www.linkedin.com/in/thekhaledmousa/",
    ],
    knowsAbout: [
      "Computer engineering",
      "Electrical engineering",
      "Python automation",
      "Full-stack web development",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={identityData} />
        {children}
      </body>
    </html>
  );
}
