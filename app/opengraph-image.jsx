import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = "Khaled Mousa — Engineering, Code & Systems";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return createSocialImage({
    kicker: "Portfolio",
    title: "Engineering, Code & Systems",
    detail: "Evidence-led work across automation, electronics, software, and physical systems.",
  });
}
