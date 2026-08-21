import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow } from "../helpers";

test("Systems Map exposes evidence from the keyboard and navigates to proof", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Detailed Systems Map behavior runs once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/", { waitUntil: "networkidle" });

  const automationNode = page.getByRole("link", { name: /05 Python automation.*ResetWave.*2 hours.*10 seconds/i });
  await automationNode.scrollIntoViewIfNeeded();
  await automationNode.focus();
  await expect(page.getByRole("complementary", { name: "Selected systems-map evidence" })).toContainText("ResetWave");
  await expect(page.getByText("Signal verified", { exact: true })).toBeVisible();
  await automationNode.click();
  await expect(page).toHaveURL(/\/work\/resetwave#outcome$/);
  await expect(page.locator("#outcome")).toBeFocused();
});

test("Systems Map becomes a complete vertical signal chain on mobile and reduced motion", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Responsive Systems Map behavior runs once in Chromium.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#systems-map", { waitUntil: "networkidle" });

  await expect(page.locator(".systems-map-nodes > li")).toHaveCount(6);
  const layout = await page.locator(".systems-map-nodes").evaluate((element) => ({
    columns: getComputedStyle(element).gridTemplateColumns.split(" ").length,
    signalAnimation: getComputedStyle(element, "::after").animationName,
  }));
  expect(layout.columns).toBe(1);
  expect(layout.signalAnimation).toBe("none");
  await expect(page.locator(".systems-node-mobile-proof").first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("30 Second Field Brief provides direct evidence, resume, code, and contact paths", async ({ page, request, browserName }) => {
  test.skip(browserName !== "chromium", "Field Brief conversion paths run once in Chromium.");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/#field-brief", { waitUntil: "networkidle" });

  const brief = page.locator("#field-brief");
  await expect(brief.getByRole("heading", { name: /What I build/ })).toBeVisible();
  await expect(brief).toBeFocused();
  await expect.poll(async () => page.evaluate(() => {
    const target = document.querySelector("#field-brief");
    const header = document.querySelector(".site-header");
    return target.getBoundingClientRect().top >= header.getBoundingClientRect().bottom - 1;
  })).toBeTruthy();
  await expect(brief.getByRole("link", { name: /ResetWave/ })).toHaveAttribute("href", "/work/resetwave#outcome");
  await expect(brief.getByRole("link", { name: /Engineering Lab/ })).toHaveAttribute("href", "/work/engineering-lab#gallery");
  await expect(brief.getByRole("link", { name: /The Cove Dev/ })).toHaveAttribute("href", "/work/the-cove-dev#cove-interface");
  await expect(brief.getByRole("link", { name: /View résumé/ })).toHaveAttribute("href", "/resume/khaled-mousa-resume.pdf");
  await expect(brief.getByRole("link", { name: /View portfolio code/ })).toHaveAttribute("href", "https://github.com/KhaledM03/MySite");

  const resumeResponse = await request.get("/resume/khaled-mousa-resume.pdf");
  expect(resumeResponse.ok()).toBeTruthy();
  expect(resumeResponse.headers()["content-type"]).toContain("application/pdf");
});

test("Contact Field Card contains verified channels, copies email, and restores focus", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "Clipboard and dialog behavior run once in Chromium.");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/work", { waitUntil: "networkidle" });

  const trigger = page.getByRole("button", { name: /Let's talk/ });
  await trigger.focus();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Let's build something useful/ });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Close contact card" })).toBeFocused();
  await expect(dialog.getByRole("link", { name: /khaledmousa216@gmail.com/ })).toHaveAttribute("href", "mailto:khaledmousa216@gmail.com");
  await expect(dialog.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/thekhaledmousa/");
  await expect(dialog.getByRole("link", { name: /Résumé/ })).toHaveAttribute("href", "/resume/khaled-mousa-resume.pdf");
  await dialog.getByRole("button", { name: "Copy email" }).click();
  await expect(dialog.getByText(/SIGNAL COPIED/)).toBeVisible();
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

test("Experience fast scan preserves verified roles and evidence boundaries", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Experience scanning layer runs once in Chromium.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/experience", { waitUntil: "networkidle" });

  const rail = page.getByRole("navigation", { name: "Fast scan of field records" });
  await expect(rail).toContainText("Boingo Wireless");
  await expect(rail).toContainText("Wireless Operations Intern");
  await expect(rail).toContainText("The Cove Dev, LLC");
  await expect(rail).toContainText("Public member evidence");
  await expect(rail).not.toContainText("PureGym employee");
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
