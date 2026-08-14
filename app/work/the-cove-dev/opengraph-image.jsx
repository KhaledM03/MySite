import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = "The Cove Dev Case Study — Khaled Mousa";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return createSocialImage({
    kicker: "Case study 03 · Client web products",
    title: "The Cove Dev",
    detail: "Responsive interface work documented through verified screenshots and résumé evidence.",
    accent: "#70506f",
  });
}
