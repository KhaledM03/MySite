import HeroProfileJourney from "@/components/sections/HeroProfileJourney";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Engineering, Code & Systems",
  description:
    "Khaled Mousa builds and validates software, electronics, automation, and systems through evidence-led engineering work.",
  path: "/",
});

export default function HomePage() {
  return <HeroProfileJourney />;
}
