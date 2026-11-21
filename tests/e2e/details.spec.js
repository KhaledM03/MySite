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

test("recent builds show both projects and the video loads only on play", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detail coverage runs once in Chromium.");
  const youtubeRequests = [];
  await page.route(/youtube(-nocookie)?\.com|ytimg\.com|googlevideo\.com/, (route) => {
    youtubeRequests.push(route.request().url());
    return route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>Video fixture</title>" });
  });
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  const builds = page.locator("#builds");
  await expect(builds.locator(".build-card")).toHaveCount(2);
  await expect(builds.getByRole("heading", { name: "Custom FPV drone" })).toBeVisible();
  await expect(builds.getByRole("heading", { name: "FM walkie-talkie pair" })).toBeVisible();
  await expect(builds.getByRole("link", { name: /Watch on YouTube/ })).toHaveAttribute("href", "https://youtu.be/DPGMJUyqAjA");

  await expect(builds.locator("iframe")).toHaveCount(0);
  expect(youtubeRequests).toEqual([]);

  await builds.getByRole("button", { name: /Play: Flying my FPV drone in class/ }).click();
  const frame = builds.locator('iframe[title="Flying my FPV drone in class"]');
  await expect(frame).toHaveAttribute("src", /^https:\/\/www\.youtube-nocookie\.com\/embed\/DPGMJUyqAjA\?autoplay=1/);

  await page.goto("/work", { waitUntil: "networkidle" });
  await expect(page.locator("#builds .build-card")).toHaveCount(2);
});
