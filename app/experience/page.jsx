import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import LongPageNav from "@/components/navigation/LongPageNav";
import StructuredData from "@/components/seo/StructuredData";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import { CANONICAL_RESUME, EDUCATION } from "@/data/career";
import { experienceSources, pureGymReviews } from "@/data/experience";
import { createPageMetadata, SITE_URL } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Experience — Engineering, Client Work & Leadership",
  description:
    "Khaled Mousa's experience: a Boingo Wireless internship, field technician work, founding The Cove Dev, environmental field work, AI model evaluation, and EMG research at Meta.",
  path: "/experience",
  image: "/og/experience.png",
  imageAlt: "Khaled Mousa: where I’ve worked.",
});

const sections = [
  { id: "roles", label: "All roles" },
  { id: "education", label: "Education" },
  { id: "infrastructure", label: "Boingo" },
  { id: "ownership", label: "The Cove Dev" },
  { id: "people", label: "People" },
];

export default function ExperiencePage() {
  const { boingo, cove, pureGym } = experienceSources.verified;

  return (
    <div className="site-shell experience-shell">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Experience — Khaled Mousa",
          url: `${SITE_URL}/experience`,
          description:
            "Engineering, client work, field work, leadership, and research experience.",
          author: { "@id": `${SITE_URL}/#person` },
          inLanguage: "en-US",
        }}
      />
      <a className="skip-link" href="#roles">Skip to experience</a>
      <SiteHeader />

      <main className="experience-page">
        <section id="field-top" className="experience-cover" aria-labelledby="field-title" tabIndex={-1}>
          <div className="experience-cover-copy">
            <p className="section-label">Experience</p>
            <h1 id="field-title">Where I&apos;ve <em>worked.</em></h1>
            <p>
              A wireless operations internship, field work installing camera systems and sampling air quality, a web development business I founded, AI model evaluation, and early research at Meta.
            </p>
            <div className="experience-cover-links">
              <a className="button button-primary" href={CANONICAL_RESUME.href} target="_blank" rel="noreferrer">
                View résumé <span aria-hidden="true">↗</span>
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </a>
              <Link className="button button-secondary" href="/work">See the projects</Link>
            </div>
          </div>

          <div className="experience-cover-stage" aria-hidden="true">
            <div className="field-orbit field-orbit-one" />
            <div className="field-orbit field-orbit-two" />
            <Image
              src="/characters/khaled-radio.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 78vw, 44vw"
            />
          </div>
        </section>

        <LongPageNav items={sections} ariaLabel="Experience contents" topId="field-top" />

        <div className="field-story">
          <section id="roles" className="field-section field-roles" aria-labelledby="roles-title" tabIndex={-1}>
            <header className="field-section-heading">
              <div>
                <h2 id="roles-title">All roles</h2>
              </div>
              <p>Newest first, matching my résumé.</p>
            </header>
            <ExperienceTimeline />
          </section>

          <section id="education" className="field-section field-education" aria-labelledby="education-title" tabIndex={-1}>
            <header className="field-section-heading">
              <div>
                <h2 id="education-title">Education</h2>
              </div>
              <p>I transferred from Queens College to Farmingdale for a hands-on engineering technology program.</p>
            </header>
            <ol className="timeline">
              <li className="timeline-item">
                <p className="timeline-period">Expected May 2028</p>
                <div className="timeline-body">
                  <h3>{EDUCATION.school}</h3>
                  <p className="timeline-role">{EDUCATION.degrees.join(" and ")}</p>
                  <p className="timeline-summary">GPA {EDUCATION.gpa}. {EDUCATION.honors}.</p>
                </div>
              </li>
              <li className="timeline-item">
                <p className="timeline-period">{EDUCATION.previous.period}</p>
                <div className="timeline-body">
                  <h3>{EDUCATION.previous.school}</h3>
                  <p className="timeline-summary">{EDUCATION.previous.detail}</p>
                </div>
              </li>
            </ol>
          </section>

          <section id="infrastructure" className="field-section field-infrastructure" aria-labelledby="infrastructure-title" tabIndex={-1}>
            <header className="field-section-heading">
              <div>
                <p className="case-section-number">Summer 2024</p>
                <h2 id="infrastructure-title">Inside the Boingo internship.</h2>
              </div>
              <p>
                Boingo runs Wi-Fi and 5G networks in places like airports, stadiums, and transit hubs. The internship put me next to the engineers who build and operate them.
              </p>
            </header>

            <div className="boingo-evidence-grid">
              <article className="company-post-card">
                <div className="company-post-header">
                  <span>{boingo.companyPostLabel}</span>
                  <span>{boingo.period}</span>
                </div>
                <blockquote>“{boingo.companyPostExcerpt}”</blockquote>
                <p>
                  The post locates the internship at {boingo.office} and documents network-site, science, transportation-leadership, and social-content experiences.
                </p>
                <div className="company-post-signoff">
                  <strong>{boingo.organization}</strong>
                  <span>Public company post</span>
                </div>
              </article>

              <div className="boingo-record">
                <div className="boingo-record-heading">
                  <span>Role</span>
                  <strong>{boingo.role}</strong>
                  <small>{boingo.organization} · {boingo.period}</small>
                </div>
                <ol>
                  {boingo.activities.map((activity, index) => (
                    <li key={activity}><span>{String(index + 1).padStart(2, "0")}</span><p>{activity}</p></li>
                  ))}
                </ol>
              </div>
            </div>

            <p className="field-boundary-note">
              ResetWave, the automation tool I built during this internship, is written up with internal systems, credentials, and company identifiers left out. <Link href="/work/resetwave">Read the ResetWave case study</Link>.
            </p>
          </section>

          <section id="ownership" className="field-section field-ownership" aria-labelledby="ownership-title" tabIndex={-1}>
            <div className="field-ownership-copy">
              <p className="case-section-number">Aug – Dec 2025</p>
              <h2 id="ownership-title">Running The Cove Dev.</h2>
              <p className="field-lead">
                At {cove.organization}, I built and shipped websites and web apps for small-business clients: the interface, the client-side logic, the debugging, and Git-based delivery.
              </p>
              <p>
                Running it taught me ownership: making the interface behave clearly, working within a client&apos;s real constraints, and handing over something they can maintain.
              </p>
              <Link className="field-inline-link" href="/work/the-cove-dev">Open The Cove Dev case study ↗</Link>
            </div>

            <figure className="field-cove-evidence">
              <div className="field-browser-bar" aria-hidden="true"><i /><i /><i /><span>thecovedev.com</span></div>
              <Image
                src="/media/the-cove-dev/home.webp"
                alt="The Cove Dev home interface with a purple hero, navigation, call to action, and phone mockup"
                width={1257}
                height={798}
                sizes="(max-width: 760px) 92vw, 52vw"
              />
              <figcaption>The Cove Dev home page</figcaption>
            </figure>
          </section>

          <section id="people" className="field-section field-people" aria-labelledby="people-title" tabIndex={-1}>
            <header className="field-section-heading">
              <div>
                <p className="case-section-number">Customer service</p>
                <h2 id="people-title">What gym members said.</h2>
              </div>
              <p>{pureGym.summary}</p>
            </header>

            <div className="review-rail" aria-label="Public PureGym member reviews">
              {pureGymReviews.map((review, index) => (
                <article className="review-card" key={review.name}>
                  <div className="review-card-index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>/ {String(pureGymReviews.length).padStart(2, "0")}</span>
                  </div>
                  <blockquote>“{review.excerpt}”</blockquote>
                  <div className="review-card-source">
                    <div><strong>{review.name}</strong><span>{experienceSources.verified.pureGym.sourceLabel}</span></div>
                    <a href={review.url} target="_blank" rel="noreferrer" aria-label={`View ${review.name}’s public Google review`}>View source ↗</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="review-rail-note">Swipe or scroll to see all four. Each links to the original public review.</p>
          </section>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
