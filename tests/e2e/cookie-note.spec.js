import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const note = (page) => page.getByRole("region", { name: "May I have a cookie?" });

test("cookie note asks once, stores only its answer, and sets no cookies", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "Cookie note behavior runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(note(page)).toBeVisible();
  await expect(note(page)).toContainText("this site doesn't use any");
  await expect(note(page).getByRole("link", { name: /privacy/i })).toHaveAttribute("href", "/privacy");
  expect(await page.evaluate(() => localStorage.length)).toBe(0);

  // The note sits in the corner and must not cover the résumé button.
  await expect(page.locator(".intro").getByRole("link", { name: /View résumé/ })).toBeInViewport({ ratio: 1 });
  const [noteBox, resumeBox] = await Promise.all([
    note(page).boundingBox(),
    page.locator(".intro-actions").boundingBox(),
  ]);
  expect(noteBox.x).toBeGreaterThan(resumeBox.x + resumeBox.width);

  await note(page).getByRole("button", { name: "Sure, have one" }).click();
  await expect(page.getByRole("status")).toHaveText(/Nom/);
  await expect(note(page)).toBeHidden({ timeout: 5000 });

  expect(await page.evaluate(() => ({ ...localStorage }))).toEqual({ "cookie-note-answer": "accepted" });
  expect(await context.cookies()).toEqual([]);

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await expect(note(page)).toHaveCount(0);
});

test("declining is respected and remembered", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Cookie note behavior runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/work", { waitUntil: "networkidle" });

  await note(page).getByRole("button", { name: "No cookies for you" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText(/won't ask again/);
  expect(await page.evaluate(() => localStorage.getItem("cookie-note-answer"))).toBe("declined");

  await page.goto("/experience", { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await expect(note(page)).toHaveCount(0);
});

test("on phones the note waits for a scroll instead of covering the intro", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Cookie note behavior runs once in Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await expect(note(page)).toHaveCount(0);

  await page.mouse.wheel(0, 600);
  await expect(note(page)).toBeVisible();
  const box = await note(page).boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(15);
  expect(box.x + box.width).toBeLessThanOrEqual(390 - 15);
});

test("cookie note meets the accessibility floor and works with blocked storage", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Cookie note behavior runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/privacy", { waitUntil: "networkidle" });
  await expect(note(page)).toBeVisible();
  await page.waitForTimeout(700);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
    .analyze();
  expect(results.violations).toEqual([]);

  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() { throw new DOMException("Blocked", "SecurityError"); },
    });
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/", { waitUntil: "networkidle" });
  await note(page).getByRole("button", { name: "Sure, have one" }).click();
  await expect(note(page)).toBeHidden({ timeout: 5000 });
  expect(errors).toEqual([]);
});
