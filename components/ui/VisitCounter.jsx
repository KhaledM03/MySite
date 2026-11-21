"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ANALYTICS } from "@/data/analytics";

// Cookieless page-view counting with GoatCounter. Each page view sends one
// image request with the path and referrer; nothing is stored in the browser
// and no third-party script is loaded. Visitors who ask not to be tracked
// (Do Not Track or Global Privacy Control) are never counted.
export default function VisitCounter() {
  const pathname = usePathname();

  useEffect(() => {
    if (!ANALYTICS.goatcounterCode) return;
    if (navigator.doNotTrack === "1" || navigator.globalPrivacyControl) return;
    if (!/^(www\.)?mousakhaled\.com$/.test(window.location.hostname)) return;

    const params = new URLSearchParams({
      p: pathname,
      t: document.title,
      r: document.referrer,
      s: `${window.screen.width},${window.screen.height},${window.devicePixelRatio || 1}`,
      rnd: Math.random().toString(36).slice(2),
    });
    const pixel = new window.Image();
    pixel.referrerPolicy = "no-referrer-when-downgrade";
    pixel.src = `https://${ANALYTICS.goatcounterCode}.goatcounter.com/count?${params}`;
  }, [pathname]);

  return null;
}
