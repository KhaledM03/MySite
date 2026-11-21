import { test as base, expect } from "@playwright/test";

// Most tests are about something other than the cookie note, so they start
// with it already answered and out of the way. Tests about the note itself,
// and the storage audit, import from "@playwright/test" directly.
export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.addInitScript(() => {
      try {
        window.localStorage.setItem("cookie-note-answer", "accepted");
      } catch {
        // Storage may be unavailable; the note then simply appears.
      }
    });
    await provide(page);
  },
});

export { expect };
