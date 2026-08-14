export const SITE_URL = "https://mousakhaled.com";

export const SITE_NAME = "Khaled Mousa — Engineering, Code & Systems";

export const DEFAULT_DESCRIPTION =
  "Khaled Mousa's portfolio of electrical and computer engineering, software, and systems work.";

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  imagePath,
  twitterImagePath,
}) {
  const socialImage = imagePath ?? `${path === "/" ? "" : path}/opengraph-image`;
  const twitterImage = twitterImagePath ?? `${path === "/" ? "" : path}/twitter-image`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${title} — Khaled Mousa`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
  };
}
