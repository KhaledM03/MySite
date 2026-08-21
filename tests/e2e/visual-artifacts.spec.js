import { mkdir } from "node:fs/promises";
import path from "node:path";
import { test } from "@playwright/test";

const outputDirectory = path.resolve("review/technical-audit/final/screenshots");

async function capture(page, name, viewport, url) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: "networkidle" });
  const hash = url.includes("#") ? url.slice(url.indexOf("#")) : "";
  const sceneSelector = {
    "#arrival": ".hero-copy",
    "#profile": ".profile-copy",
    "#engineering": ".engineering-copy",
  }[hash];
  if (sceneSelector) {
    await page.waitForFunction((selector) => (
      document.activeElement === document.querySelector(selector)
      && Number(getComputedStyle(document.querySelector(selector)).opacity) > 0.98
    ), sceneSelector);
  }
  await page.waitForTimeout(80);
  await page.screenshot({ path: path.join(outputDirectory, `${name}.png`) });
}

test("generate final responsive review artifacts", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "The canonical artifact set uses Chromium.");
  await mkdir(outputDirectory, { recursive: true });

  await capture(page, "home-375x812-profile", { width: 375, height: 812 }, "/#profile");
  await capture(page, "home-390x844-profile", { width: 390, height: 844 }, "/#profile");

  for (const hash of ["arrival", "profile", "engineering"]) {
    await capture(page, `home-1366x768-${hash}`, { width: 1366, height: 768 }, `/#${hash}`);
    await capture(page, `home-1920x1080-${hash}`, { width: 1920, height: 1080 }, `/#${hash}`);
  }
  await capture(page, "home-2560x1440-arrival", { width: 2560, height: 1440 }, "/#arrival");

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/#arrival", { waitUntil: "networkidle" });
  for (let step = 0; step < 40; step += 1) {
    const workTop = await page.locator(".home-work").evaluate((element) => element.getBoundingClientRect().top);
    if (workTop < 620) break;
    await page.mouse.wheel(0, 180);
    await page.waitForTimeout(30);
  }
  await page.screenshot({ path: path.join(outputDirectory, "home-1366x768-release.png") });

  await capture(page, "work-1440x900", { width: 1440, height: 900 }, "/work");
  await capture(page, "experience-1440x900", { width: 1440, height: 900 }, "/experience");
  await capture(page, "engineering-lab-1440x900", { width: 1440, height: 900 }, "/work/engineering-lab");

  for (const viewport of [
    { name: "390x844", width: 390, height: 844 },
    { name: "768x1024", width: 768, height: 1024 },
    { name: "1440x900", width: 1440, height: 900 },
    { name: "2560x1440", width: 2560, height: 1440 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator(".home-work").scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(outputDirectory, `phase-two-project-worlds-${viewport.name}.png`) });

    await page.goto("/work/the-cove-dev", { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(outputDirectory, `phase-two-cove-portal-${viewport.name}.png`) });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(320);
  await page.screenshot({ path: path.join(outputDirectory, "phase-two-console-390x844.png") });
  await page.keyboard.press("Escape");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work/engineering-lab", { waitUntil: "networkidle" });
  const hotspot = page.getByRole("button", { name: /01 Signal: Photographed oscilloscope trace/ });
  await hotspot.scrollIntoViewIfNeeded();
  await hotspot.click();
  await page.waitForTimeout(240);
  await page.screenshot({ path: path.join(outputDirectory, "phase-two-hotspot-1440x900.png") });
});
