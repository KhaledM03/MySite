import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = "Selected Work — Khaled Mousa";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return createSocialImage({
    kicker: "Selected work",
    title: "Built, tested, then proven.",
    detail: "Automation, hardware validation, digital systems, and client web products.",
    accent: "#d5a23b",
  });
}
