import Image from "next/image";
import Link from "next/link";
import TransitionLink from "@/components/navigation/TransitionLink";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import StructuredData from "@/components/seo/StructuredData";
import EvidenceLightbox from "@/components/work/EvidenceLightbox";
import { coveDevSources } from "@/data/projects";
import { createPageMetadata, SITE_URL } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "The Cove Dev — Full-Stack Client Work",
  description:
    "See Khaled Mousa's responsive full-stack client work for The Cove Dev through verified interface screenshots, design decisions, and project evidence.",
  path: "/work/the-cove-dev",
});

const media = {
  home: {
    src: "/media/the-cove-dev/home.webp",
    width: 1257,
    height: 798,
    alt: "The Cove Dev home interface with purple gradient hero, navigation, call to action, and phone mockup",
  },
  about: {
    src: "/media/the-cove-dev/about.webp",
    width: 1263,
    height: 749,
    alt: "The Cove Dev about interface with a purple hero, navigation, introductory copy, and technology marks",
  },
  services: {
    src: "/media/the-cove-dev/services.webp",
    width: 1263,
    height: 746,
    alt: "The Cove Dev services interface with a purple hero, service message, call to action, and phone mockup",
  },
};

function CoveEvidence({ item, sizes = "(max-width: 760px) 92vw, 56vw" }) {
  return (
    <EvidenceLightbox {...item}>
      <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes={sizes} />
    </EvidenceLightbox>
  );
}

export default function TheCoveDevPage() {
  return (
    <div className="site-shell evidence-shell cove-shell">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "The Cove Dev Case Study",
          url: `${SITE_URL}/work/the-cove-dev`,
          description:
            "An evidence-backed case study of responsive client web interface work documented through repository screenshots and résumé evidence.",
          author: { "@id": `${SITE_URL}/#person` },
          keywords: coveDevSources.verified.technology.join(", "),
        }}
      />
      <a className="skip-link" href="#cove-content">Skip to The Cove Dev case study</a>
      <SiteHeader />

      <main id="cove-content" className="cove-page">
        <section className="cove-cover" aria-labelledby="cove-title">
          <div className="cove-cover-copy">
            <Link className="back-link" href="/work">← All work</Link>
            <p className="section-label">Case study 03 · Client web products</p>
            <h1 id="cove-title" style={{ viewTransitionName: "project-the-cove-dev-title" }}>
              The Cove<br /><em>Dev.</em>
            </h1>
            <p className="cove-deck">
              Responsive client-facing interface work, documented through preserved repository captures and the verified résumé record.
            </p>
            <ul className="cove-cover-tags" aria-label="Verified technology">
              {coveDevSources.verified.technology.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <a className="cove-external-link" href="https://thecovedev.com/" target="_blank" rel="noreferrer">
              Visit The Cove Dev <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="cove-cover-stage" style={{ viewTransitionName: "project-the-cove-dev-media" }}>
            <div className="cove-browser cove-browser-primary">
              <div className="cove-browser-bar" aria-hidden="true"><i /><i /><i /><span>Interface capture / Home</span></div>
              <Image
                src={media.home.src}
                alt={media.home.alt}
                width={media.home.width}
                height={media.home.height}
                priority
                sizes="(max-width: 760px) 94vw, 58vw"
              />
            </div>
            <div className="cove-stage-note" aria-hidden="true">
              <span>Verified capture set</span>
              <strong>Home · About · Services</strong>
            </div>
          </div>
        </section>

        <div className="cove-meta" aria-label="Project summary">
          <div><span>Organization</span><strong>{coveDevSources.verified.organization}</strong></div>
          <div><span>Period</span><strong>{coveDevSources.verified.period}</strong></div>
          <div><span>Role</span><strong>{coveDevSources.verified.role}</strong></div>
          <div><span>Evidence</span><strong>Résumé + repository captures</strong></div>
        </div>

        <nav className="cove-section-nav" aria-label="The Cove Dev contents">
          <a href="#cove-overview"><span>01</span> Overview</a>
          <a href="#cove-role"><span>02</span> Role</a>
          <a href="#cove-interface"><span>03</span> Interface</a>
          <a href="#cove-decisions"><span>04</span> Decisions</a>
          <a href="#cove-evidence"><span>05</span> Evidence</a>
          <a href="#cove-outcomes"><span>06</span> Outcomes</a>
        </nav>

        <div className="cove-story">
          <section id="cove-overview" className="cove-section cove-overview" aria-labelledby="cove-overview-title">
            <header>
              <p className="case-section-number">01 / Overview</p>
              <h2 id="cove-overview-title">A client interface record grounded in what is public.</h2>
            </header>
            <div className="cove-overview-grid">
              <div>
                <h3>Problem space</h3>
                <p>Small-business client work called for responsive web applications with dynamic interfaces that remain clear and usable across changing content and screen sizes.</p>
              </div>
              <div>
                <h3>Documented role</h3>
                <p>Khaled’s résumé records full-stack web development for The Cove Dev from August 2025 to the present.</p>
              </div>
              <div>
                <h3>Evidence boundary</h3>
                <p>The public record confirms the role, core technologies, responsibilities, and three interface captures. It does not establish client identities, per-screen contribution, analytics, business metrics, or a mobile capture set.</p>
              </div>
            </div>
            <Link className="cove-field-record-link" href="/experience#ownership">See how this work fits the wider Field Record ↗</Link>
          </section>

          <section id="cove-role" className="cove-section cove-role" aria-labelledby="cove-role-title">
            <div className="cove-role-copy">
              <p className="case-section-number">02 / Role and responsibilities</p>
              <h2 id="cove-role-title">Build the interface, then refine its behavior.</h2>
              <p className="cove-lead">
                The verified record centers on responsive development, dynamic user interfaces, client-side logic, debugging, modular design, and Git-based version control.
              </p>
            </div>
            <ol className="cove-responsibility-list">
              {coveDevSources.verified.responsibilities.map((responsibility, index) => (
                <li key={responsibility}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{responsibility}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="cove-interface" className="cove-section cove-interface" aria-labelledby="cove-interface-title">
            <header className="cove-section-header">
              <p className="case-section-number">03 / Interface and responsive work</p>
              <h2 id="cove-interface-title">A consistent system across three public-facing states.</h2>
              <p>Visible elements repeat with purpose: persistent navigation, a focused headline, short supporting copy, a primary call to action, and product imagery framed by the purple visual system.</p>
            </header>

            <div className="cove-interface-stack">
              <figure className="cove-interface-feature">
                <div className="cove-browser">
                  <div className="cove-browser-bar" aria-hidden="true"><i /><i /><i /><span>Home</span></div>
                  <CoveEvidence item={media.home} />
                </div>
                <figcaption><span>Home interface</span> A large value proposition, email call to action, and phone mockup establish the first visual state.</figcaption>
              </figure>
              <div className="cove-interface-pair">
                <figure>
                  <CoveEvidence item={media.about} sizes="(max-width: 760px) 92vw, 40vw" />
                  <figcaption><span>About interface</span> A text-led introduction and visible technology marks extend the same navigation and visual language.</figcaption>
                </figure>
                <figure>
                  <CoveEvidence item={media.services} sizes="(max-width: 760px) 92vw, 40vw" />
                  <figcaption><span>Services interface</span> A service-focused headline, call to action, and product mockup preserve the same hierarchy.</figcaption>
                </figure>
              </div>
            </div>

            <div className="cove-responsive-note">
              <span>Responsive evidence</span>
              <p>The résumé verifies responsive web application work. The preserved repository set currently contains desktop captures only, so this page does not manufacture mobile screenshots or infer unrecorded breakpoint behavior.</p>
            </div>
          </section>

          <section id="cove-decisions" className="cove-section cove-decisions" aria-labelledby="cove-decisions-title">
            <header>
              <p className="case-section-number">04 / Technical decisions and delivery</p>
              <h2 id="cove-decisions-title">Decisions tied to the documented work.</h2>
            </header>
            <div className="cove-decision-grid">
              <article><span>01</span><h3>Responsive foundation</h3><p>HTML and CSS support layouts intended to adapt across screen sizes while retaining a clear content hierarchy.</p></article>
              <article><span>02</span><h3>Client-side behavior</h3><p>JavaScript supplies the documented client-side logic behind dynamic interface behavior.</p></article>
              <article><span>03</span><h3>Modular structure</h3><p>Reusable design patterns help keep navigation, calls to action, and visual framing consistent across interface states.</p></article>
              <article><span>04</span><h3>Debug and version</h3><p>Debugging focused on performance and usability, with Git preserving the development record.</p></article>
            </div>
            <div className="cove-delivery-rail" aria-label="Documented workflow">
              <div><span>Build</span><strong>Responsive interface</strong></div>
              <div><span>Implement</span><strong>Client-side logic</strong></div>
              <div><span>Debug</span><strong>Performance + usability</strong></div>
              <div><span>Version</span><strong>Git workflow</strong></div>
            </div>
          </section>

          <section id="cove-evidence" className="cove-section cove-evidence" aria-labelledby="cove-evidence-title">
            <header className="cove-section-header">
              <p className="case-section-number">05 / Real interface evidence</p>
              <h2 id="cove-evidence-title">Inspect the preserved captures.</h2>
              <p>Select any image for a larger view. The deployed WebP files are metadata-free copies; the original PNG captures remain preserved in the repository.</p>
            </header>
            <div className="cove-evidence-grid">
              {Object.entries(media).map(([key, item]) => (
                <figure key={key}>
                  <CoveEvidence item={item} sizes="(max-width: 760px) 92vw, 30vw" />
                  <figcaption>{key === "home" ? "Home" : key === "about" ? "About" : "Services"} interface capture</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="cove-outcomes" className="cove-section cove-outcomes" aria-labelledby="cove-outcomes-title">
            <div>
              <p className="case-section-number">06 / Verified outcomes and next steps</p>
              <h2 id="cove-outcomes-title">A real interface record, without inflated results.</h2>
            </div>
            <div>
              <p className="cove-lead">The defensible outcome is the work itself: responsive and dynamic client web application development, modular implementation, debugging, and three preserved interface states.</p>
              <ul className="cove-next-steps">
                <li>Capture verified mobile and tablet states alongside desktop evidence.</li>
                <li>Document the exact contribution and constraints for each publishable client project.</li>
                <li>Pair future outcomes with approved analytics or delivery records before publishing them.</li>
              </ul>
            </div>
          </section>

          <nav className="project-navigation" aria-label="Previous and next projects">
            <TransitionLink href="/work/engineering-lab" transitionLabel="Opening Engineering Lab">
              <span>Previous project</span><strong>← Engineering Lab</strong>
            </TransitionLink>
            <Link href="/work"><span>Project index</span><strong>All work ↑</strong></Link>
            <TransitionLink href="/work/resetwave" transitionLabel="Opening ResetWave">
              <span>Next project</span><strong>ResetWave →</strong>
            </TransitionLink>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
