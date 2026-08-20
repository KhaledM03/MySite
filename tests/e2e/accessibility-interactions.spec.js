import { expect, test } from "@playwright/test";

test("mobile menu intentionally contains and restores focus", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Keyboard interaction coverage runs in Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work", { waitUntil: "networkidle" });

  const toggle = page.locator(".nav-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "Intro", exact: true })).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  expect(await page.locator("main > :not(.site-header)").evaluateAll((elements) => elements.every((element) => element.inert))).toBeTruthy();

  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(".wordmark")).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator(".wordmark")).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
  expect(await page.locator("main > :not(.site-header)").evaluateAll((elements) => elements.every((element) => !element.inert))).toBeTruthy();
});

test("evidence lightbox traps focus, closes with Escape, and restores the trigger", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Dialog keyboard coverage runs in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/work/engineering-lab", { waitUntil: "networkidle" });

  const trigger = page.getByRole("button", { name: /Inspect evidence/ }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  const close = page.getByRole("button", { name: /Close/ });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});
