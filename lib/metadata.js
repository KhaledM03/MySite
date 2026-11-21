export const SITE_URL = "https://mousakhaled.com";

export const SITE_NAME = "Khaled Mousa";

export const DEFAULT_TITLE =
  "Khaled Mousa — Engineering, Software & Automation";

export const DEFAULT_DESCRIPTION =
  "Computer and electrical engineering technology student building at the intersection of hardware and software. Explore Khaled Mousa's work in Python automation, digital systems, engineering, and full-stack development.";

export const SOCIAL_IMAGE_PATH = "/og/home.png";

export const SOCIAL_IMAGE_ALT =
  "Khaled Mousa: I build the bridge between hardware and software.";

// Each page can point at its own preview card in public/og (see
// scripts/generate-og-images.mjs). Pages without one use the home card.

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = SOCIAL_IMAGE_PATH,
  imageAlt = SOCIAL_IMAGE_ALT,
}) {
  const socialTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
  };
}
