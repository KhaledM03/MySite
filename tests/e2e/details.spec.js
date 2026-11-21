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

test("recent builds show every project and the video loads only on play", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detail coverage runs once in Chromium.");
  const youtubeRequests = [];
  await page.route(/youtube(-nocookie)?\.com|ytimg\.com|googlevideo\.com/, (route) => {
    youtubeRequests.push(route.request().url());
    return route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>Video fixture</title>" });
  });
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  const builds = page.locator("#builds");
  await expect(builds.locator(".build-card")).toHaveCount(3);
  await expect(builds.getByRole("heading", { name: "Custom FPV drone" })).toBeVisible();
  await expect(builds.getByRole("heading", { name: "FM walkie-talkie pair" })).toBeVisible();
  await expect(builds.getByRole("heading", { name: "3D-printed window shelf" })).toBeVisible();
  await expect(builds.getByRole("link", { name: /Watch on YouTube/ })).toHaveAttribute("href", "https://youtu.be/DPGMJUyqAjA");

  await expect(builds.locator("iframe")).toHaveCount(0);
  await page.mouse.move(5, 5);
  expect(youtubeRequests).toEqual([]);

  await builds.getByRole("button", { name: /Play: Flying my FPV drone in class/ }).click();
  const frame = builds.locator('iframe[title="Flying my FPV drone in class"]');
  await expect(frame).toHaveAttribute("src", /^https:\/\/www\.youtube-nocookie\.com\/embed\/DPGMJUyqAjA\?autoplay=1/);

  await page.goto("/work", { waitUntil: "networkidle" });
  await expect(page.locator("#builds .build-card")).toHaveCount(3);
});

test("resting the pointer on the drone video starts a muted preview", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detail coverage runs once in Chromium.");
  await page.route(/youtube(-nocookie)?\.com|ytimg\.com|googlevideo\.com/, (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>Video fixture</title>" }));
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  const poster = page.getByRole("button", { name: /Play: Flying my FPV drone in class/ });
  await poster.scrollIntoViewIfNeeded();
  await poster.hover();
  await page.waitForTimeout(300);
  await page.mouse.move(5, 5);
  await page.waitForTimeout(1300);
  await expect(page.locator("#builds iframe")).toHaveCount(0);

  await poster.hover();
  const frame = page.locator('#builds iframe[title="Flying my FPV drone in class"]');
  await expect(frame).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/DPGMJUyqAjA\?autoplay=1&mute=1&loop=1/);
});

test("lab highlights, drone diagram, and current courses are on the homepage", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detail coverage runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.clock.setFixedTime(new Date("2026-11-21T12:00:00"));
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".intro-currently")).toContainText("Currently taking (Fall 2026): Digital Design (VHDL on FPGA)");
  const labs = page.locator("#labs");
  await expect(labs.locator(".lab-card")).toHaveCount(3);
  await expect(labs.getByRole("link", { name: /All labs on GitHub/ })).toHaveAttribute("href", "https://github.com/KhaledM03/engineering-labs");
  await expect(page.getByRole("img", { name: /FPV drone block diagram/ })).toBeVisible();
  await expect(labs.getByRole("table")).toContainText("A XOR B");
  await expect(labs.getByRole("img", { name: /peaking at 10.39 watts at 198 ohms/ })).toBeVisible();
  await expect(labs.getByRole("img", { name: /unsigned and signed comparators/ })).toBeVisible();

  const order = await page.evaluate(() => [...document.querySelectorAll("main > section")].map((section) => section.id || section.className));
  expect(order.slice(1)).toEqual(["work", "labs", "experience", "builds", "skills"]);

  await page.clock.setFixedTime(new Date("2027-02-10T12:00:00"));
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".intro-currently")).toContainText("Spring 2027");
  await page.clock.setFixedTime(new Date("2027-07-01T12:00:00"));
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".intro-currently")).toHaveCount(0);
});

test("visitor counting stays off until a site code is configured", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detail coverage runs once in Chromium.");
  const counted = [];
  page.on("request", (request) => {
    if (request.url().includes("goatcounter")) counted.push(request.url());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.goto("/work", { waitUntil: "networkidle" });
  expect(counted).toEqual([]);
});
