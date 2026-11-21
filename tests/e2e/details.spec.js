import { expect, test } from "../fixtures";

test("hero trace, cursor, and illustration easter egg", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detail coverage runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".intro h1 em .intro-wave path")).toHaveCount(1);
  await expect(page.locator(".intro-caret")).toHaveAttribute("aria-hidden", "true");

  await page.locator(".intro-art").click();
  await expect(page.locator(".intro-bubble")).toHaveText("Hi! 👋");
  await page.locator(".intro-art").click();
  await expect(page.locator(".intro-bubble")).toHaveText("Still here.");
});

test("header lifts after scrolling and the footer offers copy and local time", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "Detail coverage runs once in Chromium.");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".site-header")).toHaveAttribute("data-scrolled", "false");
  await page.mouse.wheel(0, 400);
  await expect(page.locator(".site-header")).toHaveAttribute("data-scrolled", "true");

  const footer = page.locator(".site-footer");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer.locator(".site-footer-time")).toContainText(/It's \d{1,2}:\d{2} (AM|PM) for me in New York\./);
  await footer.getByRole("button", { name: "Copy email" }).click();
  await expect(footer.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("khaledmousa216@gmail.com");
});

test("timeline pads light up as roles scroll into view", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detail coverage runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  const lastRole = page.locator("#experience .timeline-item").last();
  await expect(lastRole).toHaveAttribute("data-reveal", "armed");
  await lastRole.scrollIntoViewIfNeeded();
  await expect.poll(() => lastRole.getAttribute("data-reveal"), { timeout: 4000 }).not.toBe("armed");
});
