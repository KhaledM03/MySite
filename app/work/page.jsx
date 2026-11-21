import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ProjectCard from "@/components/work/ProjectCard";
import { projects } from "@/data/projects";
import StructuredData from "@/components/seo/StructuredData";
import { createPageMetadata, SITE_URL } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Selected Work — Engineering & Software Projects",
  description:
    "Explore Khaled Mousa's engineering, automation, electronics, digital systems, and full-stack development projects through evidence-led case studies.",
  path: "/work",
  image: "/og/work.png",
  imageAlt: "Khaled Mousa projects: built, tested, then proven.",
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
            name: project.name,
            url: `${SITE_URL}/work/${project.slug}`,
          })),
        }}
      />
      <a className="skip-link" href="#work-content">Skip to selected work</a>
      <SiteHeader />

      <main id="work-content" className="work-page">
        <section className="work-hero" aria-labelledby="work-title">
          <div className="work-hero-copy">
            <p className="section-label">Projects</p>
            <h1 id="work-title">Built, tested,<br /><em>then proven.</em></h1>
            <p>
              Three projects across software and physical systems: an automation tool with a measured result, hands-on lab work, and client websites.
            </p>
            <div className="work-hero-actions">
              <a className="button button-primary" href="#resetwave">Start with ResetWave ↓</a>
              <Link className="button button-secondary" href="/experience">See my experience</Link>
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
              <h2 id="project-index-title">All projects</h2>
            </div>
            <p>
              Each project lists the problem, what I built, the tools, and the result.
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
            <h2 id="evidence-note-title">What I leave out.</h2>
          </div>
          <p>
            Internal infrastructure details, credentials, private source code, and company identifiers stay out of these write-ups. ResetWave in particular focuses on the problem, the approach, testing, and the measured result.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
