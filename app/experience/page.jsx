import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import LongPageNav from "@/components/navigation/LongPageNav";
import StructuredData from "@/components/seo/StructuredData";
import { experienceSources, pureGymReviews } from "@/data/experience";
import { createPageMetadata, SITE_URL } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Experience — Engineering, Client Work & Leadership",
  description:
    "Explore Khaled Mousa's engineering experience, client ownership, leadership, and people-centered service through an evidence-led field record.",
  path: "/experience",
});

const sections = [
  { id: "field-overview", label: "Overview" },
  { id: "infrastructure", label: "Engineering" },
  { id: "ownership", label: "Ownership" },
  { id: "people", label: "People" },
  { id: "field-reflection", label: "Reflection" },
];

export default function ExperiencePage() {
  const { boingo, cove, pureGym } = experienceSources.verified;

  return (
    <div className="site-shell experience-shell">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Field Record",
          url: `${SITE_URL}/experience`,
          description:
            "An evidence-led record of engineering exposure, client ownership, and people-centered service.",
          author: { "@id": `${SITE_URL}/#person` },
          inLanguage: "en-US",
        }}
      />
      <a className="skip-link" href="#field-overview">Skip to Field Record</a>
      <SiteHeader />

      <main className="experience-page">
        <section id="field-top" className="experience-cover" aria-labelledby="field-title" tabIndex={-1}>
          <div className="experience-cover-copy">
            <p className="section-label">Experience · Evidence from the field</p>
            <h1 id="field-title">Field<br /><em>Record.</em></h1>
            <p className="experience-cover-deck">Systems are technical. Trust is human.</p>
            <p>
              A record of engineering exposure, client ownership, and the moments when people trusted me to improve their experience.
            </p>
            <div className="experience-cover-links">
              <a className="button button-primary" href="#field-overview">Read the record ↓</a>
              <Link className="button button-secondary" href="/work">View project evidence ↗</Link>
            </div>
          </div>

          <div className="experience-cover-stage" aria-hidden="true">
            <div className="field-orbit field-orbit-one" />
            <div className="field-orbit field-orbit-two" />
            <div className="field-stamp"><span>Record</span><strong>03 contexts</strong><small>Technology · ownership · care</small></div>
            <Image
              src="/characters/khaled-radio.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 78vw, 44vw"
            />
          </div>
        </section>

        <LongPageNav items={sections} ariaLabel="Field Record contents" topId="field-top" />

        <div className="field-story">
          <section id="field-overview" className="field-section field-overview" aria-labelledby="field-overview-title" tabIndex={-1}>
            <div>
              <p className="case-section-number">01 / The record</p>
              <h2 id="field-overview-title">Work becomes real when other people depend on it.</h2>
            </div>
            <div>
              <p className="field-lead">
                The strongest thread across these experiences is not a job-title ladder. It is learning how technical judgment, ownership, and care show up inside real organizations—and how trust is earned through the details.
              </p>
              <div className="field-principles" aria-label="Field Record themes">
                <span>Understand the system</span>
                <span>Own the handoff</span>
                <span>Support the person</span>
              </div>
            </div>
          </section>

          <section id="infrastructure" className="field-section field-infrastructure" aria-labelledby="infrastructure-title" tabIndex={-1}>
            <header className="field-section-heading">
              <div>
                <p className="case-section-number">02 / Engineering and infrastructure</p>
                <h2 id="infrastructure-title">See the scale. Learn the system.</h2>
              </div>
              <p>
                The résumé and company-post record place Khaled inside a Summer 2024 wireless-operations internship, with exposure to infrastructure work and the people and places behind large connected systems.
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
                  <span>Public company evidence</span>
                </div>
              </article>

              <div className="boingo-record">
                <div className="boingo-record-heading">
                  <span>Verified role</span>
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

            <aside className="field-boundary-note">
              <strong>Evidence boundary</strong>
              <p>
                This company record confirms the internship context. It does not establish that ResetWave was deployed into Boingo production systems or that Khaled designed Boingo’s network.
              </p>
              <Link href="/work/resetwave">Read the sanitized ResetWave case study ↗</Link>
            </aside>
          </section>

          <section id="ownership" className="field-section field-ownership" aria-labelledby="ownership-title" tabIndex={-1}>
            <div className="field-ownership-copy">
              <p className="case-section-number">03 / Products and ownership</p>
              <h2 id="ownership-title">Build for the constraint, not the screenshot.</h2>
              <p className="field-lead">
                At {cove.organization}, the verified work centers on responsive client-facing interfaces, client-side logic, debugging, modular design, and Git-based delivery.
              </p>
              <p>
                The useful lesson is ownership: making the interface behave clearly, working through real constraints, and leaving behind a product state that can be maintained—not merely a polished frame.
              </p>
              <Link className="field-inline-link" href="/work/the-cove-dev">Open The Cove Dev case study ↗</Link>
            </div>

            <figure className="field-cove-evidence">
              <div className="field-browser-bar" aria-hidden="true"><i /><i /><i /><span>Verified repository capture</span></div>
              <Image
                src="/media/the-cove-dev/home.webp"
                alt="The Cove Dev home interface with a purple hero, navigation, call to action, and phone mockup"
                width={1257}
                height={798}
                sizes="(max-width: 760px) 92vw, 52vw"
              />
              <figcaption>Home interface · evidence preserved in the project repository</figcaption>
            </figure>
          </section>

          <section id="people" className="field-section field-people" aria-labelledby="people-title" tabIndex={-1}>
            <header className="field-section-heading">
              <div>
                <p className="case-section-number">04 / People and operations</p>
                <h2 id="people-title">Care is an operational skill.</h2>
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
            <p className="review-rail-note">Swipe or scroll to inspect all four public sources. No ratings, dates, or profile images are reproduced here.</p>
          </section>

          <section id="field-reflection" className="field-section field-reflection" aria-labelledby="field-reflection-title" tabIndex={-1}>
            <div>
              <p className="case-section-number">05 / Reflection</p>
              <h2 id="field-reflection-title">The next system should matter outside the screen.</h2>
            </div>
            <div>
              <p className="field-lead">
                Engineering taught me to investigate the system. Client work taught me to own the result. Service work made the human consequence impossible to ignore.
              </p>
              <p>
                I want to keep building things that improve real work and real experiences—tools that are technically sound, understandable to operate, and useful to the person on the other side.
              </p>
              <div className="field-next-links">
                <Link href="/work"><span>Project evidence</span><strong>Explore the work →</strong></Link>
                <Link href="/work/resetwave"><span>Featured system</span><strong>Read ResetWave →</strong></Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
