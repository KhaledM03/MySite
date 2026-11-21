/** @type {import('next').NextConfig} */
const analytics = require("./data/analytics.json");

// Cookieless visitor counting sends one image request per page view.
const analyticsHost = analytics.goatcounterCode
  ? ` https://${analytics.goatcounterCode}.goatcounter.com`
  : "";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // The Cove Dev live preview, and the FPV drone video (loaded only on play).
  "frame-src 'self' https://thecovedev.com https://www.youtube-nocookie.com",
  `img-src 'self' data: blob:${analyticsHost}`,
  "manifest-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
].join("; ");

const nextConfig = {
  reactStrictMode: true,
  // Lets date-aware homepage facts render correctly before the browser takes over.
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          // Browsers that have visited once will only ever use HTTPS for two
          // years. Subdomains are left out on purpose until they all serve HTTPS.
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Permissions-Policy", value: "browsing-topics=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
