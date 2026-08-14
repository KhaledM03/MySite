import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = "Engineering Lab Collection — Khaled Mousa";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return createSocialImage({
    kicker: "Collection 02 · Physical + digital",
    title: "Engineering Lab",
    detail: "Real evidence from electronics measurement, digital logic simulation, and CAD studies.",
    accent: "#8a9d74",
  });
}
