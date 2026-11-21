import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import TransitionLink from "@/components/navigation/TransitionLink";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ProjectSignalPreview from "@/components/work/ProjectSignalPreview";
import { AVAILABILITY, CANONICAL_RESUME, CAREER_LINKS, EDUCATION, SKILL_GROUPS } from "@/data/career";
import { projects } from "@/data/projects";
import {
  createPageMetadata,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
} from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <div className="site-shell home-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />

      <main id="main" tabIndex={-1}>
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro-copy">
            <h1 id="intro-title">I build the bridge between <em>hardware</em> and software.</h1>
            <p className="intro-lead">
              I&apos;m Khaled Mousa, an engineering student at {EDUCATION.school}. I build Python automation, digital systems, and web products, then test them until they hold up.
            </p>

            <dl className="intro-facts">
              <div>
                <dt>Degrees</dt>
                <dd>B.S. Computer Engineering<br />B.S. Electrical Engineering</dd>
              </div>
              <div><dt>Graduating</dt><dd>{EDUCATION.graduation}</dd></div>
              <div><dt>GPA</dt><dd>{EDUCATION.gpa}</dd></div>
              <div><dt>Looking for</dt><dd>{AVAILABILITY}</dd></div>
            </dl>

            <div className="intro-actions">
              <a className="button button-primary" href={CANONICAL_RESUME.href} target="_blank" rel="noreferrer">
                View résumé <span aria-hidden="true">↗</span>
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </a>
              <button className="button button-secondary" type="button" data-contact-trigger>
                Contact me
              </button>
            </div>

            <p className="intro-links">
              <a href={CAREER_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href={CAREER_LINKS.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            </p>
          </div>

          <div className="intro-art" aria-hidden="true">
            <div className="intro-burst" />
            <Image
              src="/characters/khaled-hero.webp"
              alt=""
              width={1023}
              height={1537}
              priority
              sizes="(max-width: 760px) 70vw, 40vw"
            />
          </div>
        </section>

        <section id="work" className="home-work" aria-labelledby="work-title">
          <header className="home-work-header">
            <h2 id="work-title">Selected work</h2>
            <div>
              <p>Three projects across automation, hardware, and web development. Each one opens into a full write-up.</p>
              <Link className="button next-button" href="/work">All projects</Link>
            </div>
          </header>

          <div className="home-project-grid">
            {projects.map((project) => (
              <article className={`home-project-card home-project-${project.tone}`} key={project.slug}>
                <p>{project.eyebrow}</p>
                <h3>{project.name}</h3>
                <ProjectSignalPreview project={project} />
                <dl className="home-project-proof">
                  <div><dt>Built</dt><dd>{project.build}</dd></div>
                  <div><dt>Result</dt><dd>{project.proof}</dd></div>
                </dl>
                <TransitionLink href={project.href} transitionLabel={`Opening ${project.name}`}>
                  {project.action} <span aria-hidden="true">→</span>
                </TransitionLink>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="home-section" aria-labelledby="experience-title">
          <header className="home-section-header">
            <h2 id="experience-title">Experience</h2>
            <Link className="text-link" href="/experience">More on my experience <span aria-hidden="true">→</span></Link>
          </header>
          <ExperienceTimeline />
        </section>

        <section id="skills" className="home-section home-skills" aria-labelledby="skills-title">
          <header className="home-section-header">
            <h2 id="skills-title">Skills</h2>
            <p>What I work with, and the courses behind it.</p>
          </header>
          <div className="skills-grid">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className="skills-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
