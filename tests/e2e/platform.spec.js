import { expect, test } from "@playwright/test";
import { PUBLIC_ROUTES } from "../helpers";

const canonicalRoutes = new Map([
  ["/", "https://mousakhaled.com"],
  ["/work", "https://mousakhaled.com/work"],
  ["/experience", "https://mousakhaled.com/experience"],
  ["/work/resetwave", "https://mousakhaled.com/work/resetwave"],
  ["/work/engineering-lab", "https://mousakhaled.com/work/engineering-lab"],
  ["/work/the-cove-dev", "https://mousakhaled.com/work/the-cove-dev"],
]);

test("metadata, structured data, and security headers remain production-safe", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "Platform metadata coverage runs once in Chromium.");
  const titles = new Set();

  for (const route of PUBLIC_ROUTES) {
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status()).toBeLessThan(400);
    const headers = response.headers();
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy"]).toContain("frame-src 'self' https://thecovedev.com");
    expect(headers["content-security-policy"]).toContain("object-src 'none'");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");

    const metadata = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent)),
      localStorageEntries: localStorage.length,
      sessionStorageEntries: sessionStorage.length,
    }));
    expect(metadata.title).toBeTruthy();
    expect(titles.has(metadata.title), `Duplicate title: ${metadata.title}`).toBeFalsy();
    titles.add(metadata.title);
    expect(metadata.description).toBeTruthy();
    expect(metadata.canonical.replace(/\/$/, "")).toBe(canonicalRoutes.get(route));
    expect(metadata.ogImage).toBe("https://mousakhaled.com/og/mousakhaled-preview.png");
    expect(metadata.jsonLd.length).toBeGreaterThan(0);
    expect(metadata.localStorageEntries).toBe(0);
    expect(metadata.sessionStorageEntries).toBe(0);
  }

  expect(await context.cookies()).toEqual([]);
});

test("discovery and brand assets resolve with exact public routes", async ({ request, browserName }) => {
  test.skip(browserName !== "chromium", "Discovery endpoint coverage runs once in Chromium.");
  const sitemapResponse = await request.get("/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  expect(sitemapResponse.ok()).toBeTruthy();
  for (const canonical of canonicalRoutes.values()) {
    expect(sitemap.match(new RegExp(`<loc>${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>`, "g"))?.length).toBe(1);
  }
  expect(sitemap).not.toContain("localhost");

  const robotsResponse = await request.get("/robots.txt");
  const robots = await robotsResponse.text();
  expect(robotsResponse.ok()).toBeTruthy();
  expect(robots).toContain("Allow: /");
  expect(robots).toContain("Sitemap: https://mousakhaled.com/sitemap.xml");

  for (const asset of [
    "/manifest.webmanifest",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/icon-192.png",
    "/icon-512.png",
    "/og/mousakhaled-preview.png",
  ]) {
    expect((await request.get(asset)).ok(), asset).toBeTruthy();
  }
});
