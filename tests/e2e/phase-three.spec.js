import { expect, test } from "../fixtures";
import { expectNoHorizontalOverflow } from "../helpers";

test("homepage answers a recruiter's first questions in the first screen", async ({ page, request, browserName }) => {
  test.skip(browserName !== "chromium", "First-screen content coverage runs once in Chromium.");

  for (const viewport of [
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    const intro = page.locator(".intro");
    await expect(intro.getByRole("heading", { level: 1 })).toHaveText("I build the bridge between hardware and software.");
    await expect(intro).toContainText("SUNY Farmingdale State College");
    await expect(intro).toContainText("Spring 2028");
    await expect(intro).toContainText("3.69");
    await expect(intro).toContainText("B.S. Computer Engineering");
    await expect(intro).toContainText("B.S. Electrical Engineering");

    const resume = intro.getByRole("link", { name: /View résumé/ });
    await expect(resume).toHaveAttribute("href", "/resume/khaled-mousa-resume.pdf");
    await expect(resume).toBeInViewport({ ratio: 1 });
    await expect(intro.getByRole("button", { name: "Contact me" })).toBeInViewport({ ratio: 1 });
  }

  const resumeResponse = await request.get("/resume/khaled-mousa-resume.pdf");
  expect(resumeResponse.ok()).toBeTruthy();
  expect(resumeResponse.headers()["content-type"]).toContain("application/pdf");
});

test("homepage lists every résumé role and links projects to their case studies", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Homepage content coverage runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  const roles = page.locator("#experience .timeline-item");
  await expect(roles).toHaveCount(5);
  for (const organization of ["The Cove Dev, LLC", "Boingo Hack-a-Thon 2024", "Boingo Wireless", "Empire Camera Installations", "Meta"]) {
    await expect(page.locator("#experience").getByRole("heading", { name: organization, exact: true })).toBeVisible();
  }

  const work = page.locator("#work");
  await expect(work.getByRole("link", { name: /Read the case study/ }).first()).toHaveAttribute("href", "/work/resetwave");
  await expect(work.getByRole("link", { name: /See the lab work/ })).toHaveAttribute("href", "/work/engineering-lab");
  await expect(page.locator("#skills .skills-group")).toHaveCount(4);
  await expect(page.locator(".field-console-launcher, .signal-cursor, .journey")).toHaveCount(0);
});

test("Contact Field Card contains verified channels, copies email, and restores focus", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "Clipboard and dialog behavior run once in Chromium.");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/work", { waitUntil: "networkidle" });

  const trigger = page.locator(".header-cta");
  await trigger.focus();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Let's build something useful/ });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Close contact card" })).toBeFocused();
  await expect(dialog.getByRole("link", { name: /khaledmousa216@gmail.com/ })).toHaveAttribute("href", "mailto:khaledmousa216@gmail.com");
  await expect(dialog.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/thekhaledmousa/");
  await expect(dialog.getByRole("link", { name: /Résumé/ })).toHaveAttribute("href", "/resume/khaled-mousa-resume.pdf");
  await dialog.getByRole("button", { name: "Copy email" }).click();
  await expect(dialog.getByText(/Copied\. The email address is on your clipboard/)).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("khaledmousa216@gmail.com");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("important case-study deep links clear sticky navigation and support history", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detailed deep-link positioning runs once in Chromium.");
  const cases = [
    { route: "/work/resetwave#outcome", target: "#outcome" },
    { route: "/work/engineering-lab#gallery", target: "#gallery" },
    { route: "/work/the-cove-dev#cove-interface", target: "#cove-interface" },
  ];

  await page.setViewportSize({ width: 1366, height: 768 });
  for (const item of cases) {
    await page.goto(item.route, { waitUntil: "networkidle" });
    await expect(page.locator(item.target)).toBeFocused();
    await expect.poll(async () => page.evaluate((selector) => {
      const target = document.querySelector(selector);
      const header = document.querySelector(".site-header");
      const nav = document.querySelector(".long-page-nav");
      return target.getBoundingClientRect().top >= header.getBoundingClientRect().bottom + nav.getBoundingClientRect().height - 2;
    }, item.target)).toBeTruthy();
  }

  await page.goto("/work/the-cove-dev#cove-overview", { waitUntil: "networkidle" });
  await page.locator('.cove-section-nav a[href="#cove-interface"]').click();
  await expect(page).toHaveURL(/#cove-interface$/);
  await page.goBack();
  await expect(page).toHaveURL(/#cove-overview$/);
});

test("Experience page shows the full role history on mobile", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Experience layout runs once in Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/experience", { waitUntil: "networkidle" });

  const roles = page.locator("#roles");
  await expect(roles.locator(".timeline-item")).toHaveCount(5);
  await expect(roles).toContainText("Wireless operations intern");
  await expect(roles).toContainText("EMG research assistant");
  await expect(page.getByRole("link", { name: /View résumé/ }).first()).toHaveAttribute("href", "/resume/khaled-mousa-resume.pdf");
  await expectNoHorizontalOverflow(page);
});

test("Cove portal returns to preserved evidence when the external frame fails", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "External failure behavior runs once in Chromium.");
  await page.route("https://thecovedev.com/**", (route) => route.abort("failed"));
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/work/the-cove-dev", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Interact with build/ }).click();
  await page.getByRole("button", { name: "Use preserved evidence" }).click();
  await expect(page.locator(".live-portal-stage")).toHaveAttribute("data-mode", "fallback");
  await expect(page.getByText(/live frame did not respond/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open full site/ })).toBeVisible();
});
