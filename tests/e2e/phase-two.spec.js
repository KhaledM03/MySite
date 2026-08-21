import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow } from "../helpers";

test("Field Console filters destinations, supports keyboard navigation, and restores focus", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Command keyboard behavior runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/work", { waitUntil: "networkidle" });

  const restoreTarget = page.getByRole("link", { name: /Replay the field log/ });
  await restoreTarget.focus();
  await page.keyboard.press("Control+k");

  const dialog = page.getByRole("dialog", { name: "Field Console" });
  const search = page.getByPlaceholder("Search projects, chapters, or signals…");
  await expect(dialog).toBeVisible();
  await expect(search).toBeFocused();
  await search.fill("lab");
  await expect(page.getByRole("option", { name: /Engineering Lab/ })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(restoreTarget).toBeFocused();

  await page.keyboard.press("Control+k");
  await search.fill("reset");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/resetwave$/);
});

test("Live Project Portal stays lazy, activates by intent, and switches device frames", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "External portal behavior runs once in Chromium.");
  await page.route("https://thecovedev.com/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<!doctype html><title>Embedded Cove fixture</title><main>Interactive build fixture</main>",
    });
  });
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/work/the-cove-dev", { waitUntil: "networkidle" });

  await expect(page.locator(".live-project-portal iframe")).toHaveCount(0);
  await page.getByRole("button", { name: /Interact with build/ }).click();
  const frame = page.locator('.live-project-portal iframe[title="Live interactive preview of The Cove Dev"]');
  await expect(frame).toHaveCount(1);
  await expect(frame).toHaveAttribute("loading", "lazy");

  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".live-portal-stage")).toHaveAttribute("data-device", "mobile");
  await page.getByRole("button", { name: "Tablet", exact: true }).click();
  await expect(page.locator(".live-portal-stage")).toHaveAttribute("data-device", "tablet");
});

test("mobile portal uses a controlled capture sequence without an iframe", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Mobile portal fallback runs once in Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work/the-cove-dev", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Interact with build/ }).click();

  await expect(page.locator(".live-project-portal iframe")).toHaveCount(0);
  await expect(page.getByText(/01 \/ 03.*Home capture/)).toBeVisible();
  await page.getByRole("button", { name: "Next interface capture" }).click();
  await expect(page.getByText(/02 \/ 03.*About capture/)).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("Engineering Lab hotspots open from the keyboard and restore the trigger", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Evidence keyboard behavior runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/work/engineering-lab", { waitUntil: "networkidle" });

  const hotspot = page.getByRole("button", { name: /01 Signal: Photographed oscilloscope trace/ });
  await hotspot.scrollIntoViewIfNeeded();
  await hotspot.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Photographed oscilloscope trace", { exact: true })).toBeVisible();
  await expect(hotspot).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(hotspot).toHaveAttribute("aria-expanded", "false");
  await expect(hotspot).toBeFocused();
});

test("case-study rail reports the active section on desktop and mobile", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Progress rail behavior runs once in Chromium.");

  for (const viewport of [{ width: 1366, height: 768 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/work/the-cove-dev", { waitUntil: "networkidle" });
    await page.locator("#cove-interface").scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('.cove-section-nav a[href="#cove-interface"]').getAttribute("aria-current")).toBe("location");
    if (viewport.width <= 760) {
      await expect(page.locator(".cove-section-nav .long-page-nav-compact")).toContainText("Interface");
      await expect(page.locator(".cove-section-nav .long-page-nav-links")).toBeHidden();
    }
  }
});

test("new interactions remain complete under reduced motion", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Reduced-motion interaction coverage runs once in Chromium.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".signal-cursor")).toBeHidden();
  const motionState = await page.locator(".resetwave-signal li").first().evaluate((element) => ({
    animationName: getComputedStyle(element).animationName,
    opacity: getComputedStyle(element).opacity,
  }));
  expect(motionState).toEqual({ animationName: "none", opacity: "1" });

  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog", { name: "Field Console" })).toBeVisible();
  await page.keyboard.press("Escape");
});

test("Phase II surfaces preserve document width at key breakpoints", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Focused overflow coverage runs once in Chromium.");
  for (const viewport of [{ width: 320, height: 568 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    for (const route of ["/", "/work/engineering-lab", "/work/the-cove-dev"]) {
      await page.goto(route, { waitUntil: "networkidle" });
      await expectNoHorizontalOverflow(page);
    }
  }
});
