import { mkdir } from "node:fs/promises";
import path from "node:path";
import { test } from "../fixtures";

const outputDirectory = path.resolve("review/technical-audit/final/screenshots");

async function capture(page, name, viewport, url) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outputDirectory, `${name}.png`) });
}

test("generate final responsive review artifacts", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "The canonical artifact set uses Chromium.");
  await mkdir(outputDirectory, { recursive: true });

  for (const viewport of [
    { name: "375x812", width: 375, height: 812 },
    { name: "390x844", width: 390, height: 844 },
    { name: "768x1024", width: 768, height: 1024 },
    { name: "1366x768", width: 1366, height: 768 },
    { name: "1920x1080", width: 1920, height: 1080 },
    { name: "2560x1440", width: 2560, height: 1440 },
  ]) {
    await capture(page, `home-${viewport.name}`, viewport, "/");
  }

  for (const route of ["work", "experience", "privacy", "work/resetwave", "work/engineering-lab", "work/the-cove-dev"]) {
    await capture(page, `${route.replace("/", "-")}-1440x900`, { width: 1440, height: 900 }, `/${route}`);
  }

  for (const viewport of [
    { name: "390x844", width: 390, height: 844 },
    { name: "1440x900", width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator(".intro").getByRole("button", { name: "Contact me" }).click();
    await page.waitForTimeout(260);
    await page.screenshot({ path: path.join(outputDirectory, `contact-${viewport.name}.png`) });
    await page.keyboard.press("Escape");
  }
});
