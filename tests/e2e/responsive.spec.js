import { expect, test } from "../fixtures";
import {
  MOBILE_VIEWPORTS,
  PUBLIC_ROUTES,
  REQUIRED_VIEWPORTS,
  expectNoHorizontalOverflow,
  waitForImages,
} from "../helpers";

const crossBrowserViewports = [
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "desktop-1366x768", width: 1366, height: 768 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
];

test("public route matrix has stable structure, images, and width", async ({ page, browserName }) => {
  test.setTimeout(browserName === "chromium" ? 180_000 : 90_000);
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const viewports = browserName === "chromium" ? REQUIRED_VIEWPORTS : crossBrowserViewports;
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of PUBLIC_ROUTES) {
      consoleErrors.length = 0;
      pageErrors.length = 0;
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `${browserName} ${viewport.name} ${route}`).toBeLessThan(400);
      await expect(page.locator("h1"), `${viewport.name} ${route}`).toHaveCount(1);
      const brokenLoadedImages = await page.locator("img").evaluateAll((images) => images
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src));
      expect(brokenLoadedImages).toEqual([]);
      await expectNoHorizontalOverflow(page);
      expect(pageErrors, `${browserName} ${viewport.name} ${route}`).toEqual([]);
      expect(consoleErrors, `${browserName} ${viewport.name} ${route}`).toEqual([]);
    }
  }
});

test("all rendered images load at a representative viewport", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Image loading runs once in Chromium.");
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of PUBLIC_ROUTES) {
    await page.goto(route, { waitUntil: "networkidle" });
    await waitForImages(page);
  }
});

test("homepage intro stacks copy above the illustration on phones", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "The full mobile geometry matrix runs in Chromium.");

  for (const viewport of MOBILE_VIEWPORTS) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    const [actions, art] = await Promise.all([
      page.locator(".intro-actions").boundingBox(),
      page.locator(".intro-art").boundingBox(),
    ]);
    expect(actions, viewport.name).not.toBeNull();
    expect(art, viewport.name).not.toBeNull();
    expect(actions.y + actions.height, viewport.name).toBeLessThanOrEqual(art.y + 1);
    await expect(page.locator(".intro h1"), viewport.name).toBeInViewport();
    await expectNoHorizontalOverflow(page);
  }
});

test("section links land below the fixed header", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Anchor positioning runs in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });

  for (const hash of ["work", "experience", "skills"]) {
    await page.goto(`/#${hash}`, { waitUntil: "networkidle" });
    await expect.poll(() => page.evaluate((id) => {
      const target = document.getElementById(id).getBoundingClientRect().top;
      const header = document.querySelector(".site-header").getBoundingClientRect().bottom;
      return target >= header - 1 && target < header + 80;
    }, hash), hash).toBeTruthy();
  }
});

test("header navigation reaches every page and marks the current one", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Navigation behavior runs in Chromium.");

  for (const viewport of [{ width: 390, height: 844 }, { width: 1366, height: 768 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    const openMenu = async () => {
      if (viewport.width > 980) return;
      await page.locator(".nav-toggle").click();
      await expect(page.locator(".nav-toggle")).toHaveAttribute("aria-expanded", "true");
    };

    await openMenu();
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.locator('#primary-navigation a[href="/work"]')).toHaveAttribute("aria-current", "page");

    await openMenu();
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Experience", exact: true }).click();
    await expect(page).toHaveURL(/\/experience$/);

    await expect(page.locator('#primary-navigation a[href="/experience"]')).toHaveAttribute("aria-current", "page");
    await expect(page.locator("#primary-navigation a", { hasText: "Résumé" }))
      .toHaveAttribute("href", "/resume/khaled-mousa-resume.pdf");
    await page.locator(".wordmark").click();
    await expect(page).toHaveURL(/\/$/);
  }
});

test("200 percent root text sizing remains usable without horizontal overflow", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Text-resize coverage runs in Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of PUBLIC_ROUTES) {
    await page.goto(route, { waitUntil: "networkidle" });
    await page.locator("html").evaluate((html) => {
      html.style.fontSize = "200%";
    });
    await expectNoHorizontalOverflow(page);
    await expect(page.locator("h1")).toBeVisible();
  }
});
