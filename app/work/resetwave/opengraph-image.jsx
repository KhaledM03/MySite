import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = "ResetWave Automation Case Study — Khaled Mousa";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return createSocialImage({
    kicker: "Case study 01 · Automation",
    title: "ResetWave",
    detail: "A sanitized Python and Linux workflow with a documented timing result.",
    accent: "#d95f48",
  });
}
