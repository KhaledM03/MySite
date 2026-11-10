import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="site-shell evidence-shell">
      <a className="skip-link" href="#not-found-content">Skip to content</a>
      <SiteHeader />
      <main id="not-found-content" className="not-found-page">
        <p className="section-label">Error 404 · No signal</p>
        <h1>This page is <em>off the map.</em></h1>
        <p>
          The link may be out of date, or the page may have moved. The project work and the field record are both still here.
        </p>
        <div className="not-found-actions">
          <Link className="button button-primary" href="/work">View selected work</Link>
          <Link className="button button-secondary" href="/">Back to the start</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
