// Generates the link-preview cards (Open Graph images) shown when the site is
// shared in Messages, LinkedIn, Slack, Discord, and similar apps.
//
// Usage: start the site (`npm run build && npm start`), then run
//   node scripts/generate-og-images.mjs
// Images are written to public/og/<slug>.png at 1200x630.

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const BASE_URL = process.env.OG_BASE_URL ?? "http://127.0.0.1:3000";
const OUTPUT = path.resolve("public/og");

const CARDS = [
  {
    slug: "home",
    title: "I build the bridge between <em>hardware</em> and software.",
    detail: "Computer &amp; Electrical Engineering Technology<br>Farmingdale State College (SUNY)",
    art: "/characters/khaled-hero.webp",
  },
  {
    slug: "work",
    title: "Built, tested, <em>then proven.</em>",
    detail: "Projects: ResetWave, Engineering Lab,<br>and The Cove Dev",
    art: "/characters/khaled-radio.webp",
  },
  {
    slug: "experience",
    title: "Where I&rsquo;ve <em>worked.</em>",
    detail: "Boingo Wireless, field work, The Cove Dev,<br>and research at Meta",
    art: "/characters/khaled-radio.webp",
  },
  {
    slug: "resetwave",
    title: "2 hours &rarr; <em>10&nbsp;seconds.</em>",
    detail: "ResetWave: Python automation built during<br>a Boingo Wireless internship",
    art: "/characters/khaled-engineering.webp",
  },
  {
    slug: "engineering-lab",
    title: "Engineering <em>Lab.</em>",
    detail: "Circuits, oscilloscopes, digital logic,<br>and CAD, documented from the bench",
    art: "/characters/khaled-engineering.webp",
  },
  {
    slug: "the-cove-dev",
    title: "The Cove <em>Dev.</em>",
    detail: "Client websites and web apps,<br>designed, built, and shipped",
    art: "/characters/khaled-engineering.webp",
  },
];

// A gently decaying sine wave, like a trace on an oscilloscope.
function wavePath(width, height, cycles) {
  const points = [];
  for (let x = 0; x <= width; x += 4) {
    const t = x / width;
    const amplitude = (height / 2) * (0.35 + 0.65 * Math.sin(Math.PI * t));
    const y = height / 2 - amplitude * Math.sin(t * cycles * Math.PI * 2);
    points.push(`${x === 0 ? "M" : "L"}${x},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

function cardHtml({ title, detail, art }) {
  // Short titles get bigger type so the card never looks empty.
  const titleSize = title.replace(/<[^>]+>|&[a-z]+;/g, "x").length > 34 ? 78 : 104;
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative;
    font-family: ui-sans-serif, system-ui, sans-serif;
    color: #fffaf0;
    background:
      radial-gradient(circle at 81% 54%, rgba(255, 236, 196, 0.42), rgba(243, 183, 47, 0.22) 22%, transparent 38%),
      linear-gradient(90deg, rgba(255, 250, 240, 0.05) 1px, transparent 1px) 0 0 / 48px 48px,
      linear-gradient(rgba(255, 250, 240, 0.05) 1px, transparent 1px) 0 0 / 48px 48px,
      #573244;
  }
  .brand { position: absolute; top: 54px; left: 72px; display: flex; align-items: center; gap: 16px; }
  .brand img { width: 52px; height: 52px; border-radius: 50%; background: #fffaf0; padding: 3px; }
  .brand span { font-size: 22px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; }
  h1 {
    position: absolute; top: 150px; left: 72px; width: 690px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: ${titleSize}px; font-weight: 500; line-height: 0.98; letter-spacing: -0.045em;
  }
  h1 em { color: #f3b72f; }
  p { position: absolute; left: 72px; bottom: 112px; width: 640px; color: rgba(255, 250, 240, 0.78); font-size: 27px; line-height: 1.38; }
  .url { position: absolute; left: 72px; bottom: 54px; color: #f3b72f; font-size: 24px; font-weight: 800; letter-spacing: 0.04em; }
  .art { position: absolute; right: 38px; bottom: -24px; height: 640px; filter: drop-shadow(18px 26px 22px rgba(0, 0, 0, 0.28)); }
  .wave { position: absolute; left: 0; right: 0; bottom: 26px; width: 1200px; height: 70px; opacity: 0.55; }
</style></head><body>
  <svg class="wave" viewBox="0 0 1200 70" aria-hidden="true">
    <path d="${wavePath(1200, 70, 9)}" fill="none" stroke="#e96d50" stroke-width="3" stroke-linecap="round" />
  </svg>
  <div class="brand"><img src="${BASE_URL}/brand/chibi-khaled-header.webp" alt=""><span>Khaled Mousa</span></div>
  <h1>${title}</h1>
  <p>${detail}</p>
  <div class="url">mousakhaled.com</div>
  <img class="art" src="${BASE_URL}${art}" alt="">
</body></html>`;
}

const browser = await chromium.launch({ executablePath: process.env.OG_CHROMIUM_PATH });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await mkdir(OUTPUT, { recursive: true });

for (const card of CARDS) {
  await page.setContent(cardHtml(card), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const file = path.join(OUTPUT, `${card.slug}.png`);
  await page.screenshot({ path: file, type: "png" });
  console.log(`wrote ${path.relative(process.cwd(), file)}`);
}

await browser.close();
