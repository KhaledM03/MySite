import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { CAREER_LINKS } from "@/data/career";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "How Khaled Mousa's portfolio handles privacy: no cookies, no analytics, no ads, and no third-party trackers.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="site-shell evidence-shell">
      <a className="skip-link" href="#privacy-content">Skip to content</a>
      <SiteHeader />

      <main id="privacy-content" className="privacy-page" tabIndex={-1}>
        <header className="privacy-header">
          <h1>Privacy, <em>the short version.</em></h1>
          <p>This site doesn&apos;t track you. Here is exactly what happens when you visit.</p>
        </header>

        <div className="privacy-body">
          <section aria-labelledby="privacy-cookies">
            <h2 id="privacy-cookies">Cookies</h2>
            <p>
              None. Not even the one the little note asks for. That note is a joke, and saying no changes nothing about how the site works.
            </p>
          </section>

          <section aria-labelledby="privacy-storage">
            <h2 id="privacy-storage">What your browser stores</h2>
            <p>
              One thing: your answer to &ldquo;May I have a cookie?&rdquo;, saved in your browser&apos;s local storage so the question doesn&apos;t come back. It never leaves your device. Clearing this site&apos;s data in your browser resets it.
            </p>
          </section>

          <section aria-labelledby="privacy-tracking">
            <h2 id="privacy-tracking">Analytics, ads, and trackers</h2>
            <p>
              There are none. Every script, font, and image on this site is served from this site. Nothing is loaded from ad networks, analytics services, or social media widgets. The only outside content is the drone video, and only if you choose to play it.
            </p>
          </section>

          <section aria-labelledby="privacy-hosting">
            <h2 id="privacy-hosting">Hosting</h2>
            <p>
              The site is hosted on Netlify, which keeps standard server logs, such as IP address and request time, to keep the service secure and running. Netlify explains this in its <a href="https://www.netlify.com/privacy/" target="_blank" rel="noreferrer">privacy policy</a>.
            </p>
          </section>

          <section aria-labelledby="privacy-embeds">
            <h2 id="privacy-embeds">Embedded video, preview, and outside links</h2>
            <p>
              The FPV drone video shows a photo from this site until you press play. Only then does it load YouTube&apos;s privacy-enhanced player (youtube-nocookie.com), and YouTube&apos;s own policies apply from that point.
            </p>
            <p>
              On The Cove Dev case study, the live preview of thecovedev.com only loads after you press &ldquo;Interact with build&rdquo;. Links to GitHub, LinkedIn, YouTube, and Google reviews open those sites, which have their own policies.
            </p>
          </section>

          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact">Questions</h2>
            <p>
              Email me at <a href={CAREER_LINKS.mailto}>{CAREER_LINKS.email}</a>.
            </p>
          </section>

          <p className="privacy-updated">Last updated November 21, 2026.</p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
