import { expect, test } from "@playwright/test";
import {
  MOBILE_VIEWPORTS,
  PUBLIC_ROUTES,
  REQUIRED_VIEWPORTS,
  expectNoHorizontalOverflow,
  expectTargetBelowHeader,
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

test("mobile journey allocates copy and artwork to separate flow rows", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "The full mobile geometry matrix runs in Chromium.");

  const pairs = [
    [".hero-copy", ".hero-character", "hero-copy", "hero-art"],
    [".profile-copy", ".radio-character", "profile-copy", "profile-art"],
    [".engineering-copy", ".engineering-character", "engineering-copy", "engineering-art"],
  ];

  for (const viewport of MOBILE_VIEWPORTS) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    const flowMode = await page.locator(".journey-stage").evaluate((stage) => ({
      journeyHeight: getComputedStyle(stage.closest(".journey")).height,
      position: getComputedStyle(stage).position,
      stageHeight: getComputedStyle(stage).height,
    }));
    expect(flowMode.position).toBe("relative");
    expect(flowMode.stageHeight).toBe(flowMode.journeyHeight);

    for (const [copySelector, artSelector, copyArea, artArea] of pairs) {
      await page.locator(artSelector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      const [copy, art] = await Promise.all([
        page.locator(copySelector).boundingBox(),
        page.locator(artSelector).boundingBox(),
      ]);
      const areas = await page.evaluate(({ copySelector, artSelector }) => ({
        copy: getComputedStyle(document.querySelector(copySelector)).gridArea,
        art: getComputedStyle(document.querySelector(artSelector)).gridArea,
      }), { copySelector, artSelector });
      expect(areas).toEqual({ copy: copyArea, art: artArea });
      expect(copy).not.toBeNull();
      expect(art).not.toBeNull();
      expect(copy.y + copy.height, `${viewport.name} ${copySelector}`).toBeLessThanOrEqual(art.y + 2);
    }
    await expectNoHorizontalOverflow(page);
  }
});

test("chapter navigation, direct hashes, and history preserve the approved scenes", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detailed navigation behavior runs in Chromium.");

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1366, height: 768 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/#arrival", { waitUntil: "networkidle" });
    const navigateFromHeader = async (name) => {
      if (viewport.width <= 980) {
        await page.locator(".nav-toggle").click();
        await expect(page.locator(".nav-toggle")).toHaveAttribute("aria-expanded", "true");
      }
      await page.getByRole("link", { name, exact: true }).click();
    };
    await expect(page.locator(".hero-copy")).toBeFocused();
    await expectTargetBelowHeader(page, ".hero-copy");

    await navigateFromHeader("Profile");
    await expect(page).toHaveURL(/#profile$/);
    await expect(page.locator(".profile-copy")).toBeFocused();
    await expectTargetBelowHeader(page, ".profile-copy");

    await navigateFromHeader("Engineering");
    await expect(page).toHaveURL(/#engineering$/);
    await expect(page.locator(".engineering-copy")).toBeFocused();
    await expectTargetBelowHeader(page, ".engineering-copy");

    await navigateFromHeader("Work");
    await expect(page).toHaveURL(/\/work$/);
    await navigateFromHeader("Intro");
    await expect(page).toHaveURL(/#arrival$/);
    await expect(page.locator(".hero-copy")).toBeFocused();
    await expect.poll(() => page.evaluate(() => Math.round(scrollY))).toBe(0);

    await page.goBack();
    await expect(page).toHaveURL(/\/work$/);
    await page.goForward();
    await expect(page).toHaveURL(/#arrival$/);
    await expect.poll(() => page.evaluate(() => Math.round(scrollY))).toBe(0);

    for (const [hash, selector] of [
      ["arrival", ".hero-copy"],
      ["profile", ".profile-copy"],
      ["engineering", ".engineering-copy"],
    ]) {
      await page.goto(`/#${hash}`, { waitUntil: "networkidle" });
      await expect(page.locator(selector)).toBeFocused();
      await expectTargetBelowHeader(page, selector);
    }
  }
});

test("desktop journey has no empty viewport and releases continuously through the evidence layers", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Cinematic scroll timing runs in Chromium.");

  for (const viewport of [
    { width: 1366, height: 768 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/#arrival", { waitUntil: "networkidle" });
    let reachedBrief = false;
    let reachedMap = false;
    let reachedWork = false;
    let firstReleaseState = null;

    for (let step = 0; step < 60; step += 1) {
      const state = await page.evaluate(() => {
        const selectors = [
          ".hero-copy", ".profile-copy", ".engineering-copy",
          ".hero-character", ".radio-character", ".engineering-character", ".drone-primary",
        ];
        const visibleSceneElements = selectors.filter((selector) => {
          const element = document.querySelector(selector);
          const rect = element.getBoundingClientRect();
          return Number(getComputedStyle(element).opacity) > 0.05
            && rect.bottom > 80 && rect.top < innerHeight;
        });
        const visibleEvidenceLayers = [".field-brief", ".systems-map", ".home-work"]
          .filter((selector) => {
            const rect = document.querySelector(selector).getBoundingClientRect();
            return rect.top < innerHeight && rect.bottom > 80;
          });
        return { visibleSceneElements, visibleEvidenceLayers };
      });

      expect(
        state.visibleSceneElements.length > 0 || state.visibleEvidenceLayers.length > 0,
        `${viewport.width}x${viewport.height} step ${step}: ${JSON.stringify(state)}`,
      ).toBeTruthy();

      if (!firstReleaseState && state.visibleEvidenceLayers.includes(".field-brief")) {
        firstReleaseState = state;
      }
      reachedBrief ||= state.visibleEvidenceLayers.includes(".field-brief");
      reachedMap ||= state.visibleEvidenceLayers.includes(".systems-map");
      reachedWork ||= state.visibleEvidenceLayers.includes(".home-work");
      if (reachedWork) {
        break;
      }
      await page.mouse.wheel(0, Math.max(120, Math.round(viewport.height / 6)));
      await page.waitForTimeout(40);
    }

    expect(reachedBrief).toBeTruthy();
    expect(reachedMap).toBeTruthy();
    expect(reachedWork).toBeTruthy();
    expect(firstReleaseState.visibleSceneElements).toContain(".engineering-copy");
  }
});

test("reduced motion presents a static readable journey", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Reduced-motion layout runs in Chromium.");
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1366, height: 768 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    const state = await page.evaluate(() => ({
      htmlScrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      journeyHeight: getComputedStyle(document.querySelector(".journey")).height,
      stagePosition: getComputedStyle(document.querySelector(".journey-stage")).position,
      opacities: [".hero-copy", ".profile-copy", ".engineering-copy"]
        .map((selector) => getComputedStyle(document.querySelector(selector)).opacity),
    }));
    expect(state.htmlScrollBehavior).toBe("auto");
    expect(state.stagePosition).toBe("relative");
    expect(state.opacities).toEqual(["1", "1", "1"]);
    await expectNoHorizontalOverflow(page);
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
