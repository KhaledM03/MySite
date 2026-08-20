export const SITE_URL = "https://mousakhaled.com";

export const SITE_NAME = "Khaled Mousa";

export const DEFAULT_TITLE =
  "Khaled Mousa — Engineering, Software & Automation";

export const DEFAULT_DESCRIPTION =
  "Computer and electrical engineering student building at the intersection of hardware and software. Explore Khaled Mousa's work in Python automation, digital systems, engineering, and full-stack development.";

export const SOCIAL_IMAGE_PATH = "/og/mousakhaled-preview.png";

export const SOCIAL_IMAGE_ALT =
  "Khaled Mousa's portfolio homepage with engineering headline and illustrated character";

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
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
      title: socialTitle,
      description,
      images: [
        {
          url: SOCIAL_IMAGE_PATH,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
  };
}
