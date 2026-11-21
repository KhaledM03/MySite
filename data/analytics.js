// Visitor counting (GoatCounter, cookieless). The site code lives in
// data/analytics.json so next.config.js can read it too: set "goatcounterCode"
// to the code from goatcounter.com (for example "mousakhaled" for
// https://mousakhaled.goatcounter.com), or leave it null to turn counting off.
// The security policy and the privacy page follow this setting automatically.
import settings from "./analytics.json";

export const ANALYTICS = settings;

export const ANALYTICS_HOST = ANALYTICS.goatcounterCode
  ? `https://${ANALYTICS.goatcounterCode}.goatcounter.com`
  : null;
