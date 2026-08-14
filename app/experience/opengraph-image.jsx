import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const size = socialImageSize;
export const contentType = socialImageContentType;
export const alt = "Field Record — Khaled Mousa";

export default function Image() {
  return createSocialImage({
    kicker: "Experience · Field Record",
    title: "Field Record",
    detail: "Systems are technical. Trust is human.",
    accent: "#573244",
  });
}
