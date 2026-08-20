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
