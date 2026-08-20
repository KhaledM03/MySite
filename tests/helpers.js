import { expect } from "@playwright/test";

export const PUBLIC_ROUTES = [
  "/",
  "/work",
  "/experience",
  "/work/resetwave",
  "/work/engineering-lab",
  "/work/the-cove-dev",
];

export const REQUIRED_VIEWPORTS = [
  { name: "mobile-320x568", width: 320, height: 568 },
  { name: "mobile-375x812", width: 375, height: 812 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-430x932", width: 430, height: 932 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "tablet-1024x768", width: 1024, height: 768 },
  { name: "desktop-1280x720", width: 1280, height: 720 },
  { name: "desktop-1366x768", width: 1366, height: 768 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
  { name: "desktop-2560x1440", width: 2560, height: 1440 },
];

export const MOBILE_VIEWPORTS = REQUIRED_VIEWPORTS.filter(({ width }) => width <= 430);

export async function waitForImages(page) {
  const images = page.locator("img");
  for (let index = 0; index < await images.count(); index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBeTruthy();
  }
}

export async function expectNoHorizontalOverflow(page) {
  const geometry = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(geometry.scrollWidth, JSON.stringify(geometry)).toBeLessThanOrEqual(geometry.clientWidth + 1);
}

export async function expectTargetBelowHeader(page, selector) {
  const [header, target] = await Promise.all([
    page.locator(".site-header").boundingBox(),
    page.locator(selector).boundingBox(),
  ]);
  expect(header).not.toBeNull();
  expect(target).not.toBeNull();
  expect(target.y).toBeGreaterThanOrEqual(header.y + header.height - 1);
}
