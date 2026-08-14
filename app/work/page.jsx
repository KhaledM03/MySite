import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ProjectCard from "@/components/work/ProjectCard";
import { projects } from "@/data/projects";
import StructuredData from "@/components/seo/StructuredData";
import { createPageMetadata, SITE_URL } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Selected Work",
  description:
    "Engineering automation, hardware validation, digital systems, and client web products by Khaled Mousa.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="site-shell evidence-shell">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Selected Work — Khaled Mousa",
          url: `${SITE_URL}/work`,
          author: { "@id": `${SITE_URL}/#person` },
          hasPart: projects.map((project) => ({
            "@type": "CreativeWork",
            name: project.title,
            url: `${SITE_URL}/work/${project.slug}`,
          })),
        }}
      />
      <a className="skip-link" href="#work-content">Skip to selected work</a>
      <SiteHeader />

      <main id="work-content" className="work-page">
        <section className="work-hero" aria-labelledby="work-title">
          <div className="work-hero-copy">
            <p className="section-label">Selected work · Evidence index</p>
            <h1 id="work-title">Built, tested,<br /><em>then proven.</em></h1>
            <p>
              Three views into how I work across software and physical systems—leading with a measured automation result, then the real artifacts behind lab and client work.
            </p>
            <div className="work-hero-actions">
              <a className="button button-primary" href="#resetwave">Start with ResetWave ↓</a>
              <Link className="button button-secondary" href="/">Replay the field log ↗</Link>
            </div>
          </div>

          <div className="work-hero-visual" aria-hidden="true">
            <div className="work-orbit"><span>01</span><span>02</span><span>03</span></div>
            <Image
              src="/characters/khaled-radio.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 72vw, (max-width: 1100px) 36vw, 31vw"
            />
          </div>

          <div className="work-index-rail" aria-label="Project index summary">
            <span><b>01</b> Automation</span>
            <span><b>02</b> Hardware + logic</span>
            <span><b>03</b> Web products</span>
          </div>
        </section>

        <section className="project-index" aria-labelledby="project-index-title">
          <header className="project-index-header">
            <div>
              <p className="section-label">Proof over decoration</p>
              <h2 id="project-index-title">The project index</h2>
            </div>
            <p>
              Every entry identifies the problem, role, technology, and a repository- or résumé-backed proof point. Unfinished documentation is labeled honestly.
            </p>
          </header>

          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} featured={index === 0} />
            ))}
          </div>
        </section>

        <section className="evidence-note" aria-labelledby="evidence-note-title">
          <div>
            <p className="section-label">Documentation standard</p>
            <h2 id="evidence-note-title">Specific where public.<br />Sanitized where necessary.</h2>
          </div>
          <p>
            Internal infrastructure details, credentials, private source code, and company identifiers are intentionally excluded. The ResetWave case study focuses on the engineering problem, public technology record, validation, and measured outcome.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
