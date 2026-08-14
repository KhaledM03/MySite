import { SITE_URL } from "@/lib/metadata";

const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/work", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work/resetwave", priority: 0.8, changeFrequency: "yearly" },
  { path: "/work/engineering-lab", priority: 0.8, changeFrequency: "yearly" },
  { path: "/work/the-cove-dev", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap() {
  return routes.map(({ path, ...entry }) => ({
    url: `${SITE_URL}${path}`,
    ...entry,
  }));
}
