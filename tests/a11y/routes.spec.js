import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PUBLIC_ROUTES } from "../helpers";

test("public routes meet the automated WCAG accessibility floor", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Axe coverage runs once in Chromium.");

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .analyze();
      expect(results.violations, `${viewport.width}x${viewport.height} ${route}`).toEqual([]);
    }
  }
});

test("Phase II interactive states meet the automated accessibility floor", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Dynamic axe coverage runs once in Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press("Control+k");
  let results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  expect(results.violations, "Field Console").toEqual([]);
  await page.keyboard.press("Escape");

  await page.goto("/work/engineering-lab", { waitUntil: "networkidle" });
  const hotspot = page.getByRole("button", { name: /01 Signal: Photographed oscilloscope trace/ });
  await hotspot.scrollIntoViewIfNeeded();
  await hotspot.click();
  // Contrast is only meaningful once scroll-reveal entrances have settled.
  await page.waitForFunction(() => !document.querySelector('[data-reveal="in"]'));
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  expect(results.violations, "Engineering evidence hotspot").toEqual([]);

  await page.goto("/work/the-cove-dev", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Interact with build/ }).click();
  await page.waitForFunction(() => !document.querySelector('[data-reveal="in"]'));
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  expect(results.violations, "Mobile live-project fallback").toEqual([]);

  await page.goto("/#field-brief", { waitUntil: "networkidle" });
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  expect(results.violations, "Field Brief and Systems Map").toEqual([]);

  await page.getByRole("button", { name: /Open contact card/ }).click();
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  expect(results.violations, "Contact Field Card").toEqual([]);
});
