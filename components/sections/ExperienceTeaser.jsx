import Image from "next/image";
import Link from "next/link";
import { experienceSources, pureGymReviews } from "@/data/experience";

export default function ExperienceTeaser() {
  return (
    <section id="experience" className="experience-teaser" aria-labelledby="experience-teaser-title">
      <div className="experience-teaser-heading">
        <p className="section-label">Field record · Experience</p>
        <h2 id="experience-teaser-title">Systems are technical.<br /><em>Trust is human.</em></h2>
        <p>A short evidence record of engineering exposure, client ownership, and helping people feel supported.</p>
        <Link className="button button-primary" href="/experience">Open the Field Record ↗</Link>
      </div>

      <div className="experience-teaser-evidence">
        <article className="teaser-company-note">
          <div className="teaser-note-topline"><span>Company evidence</span><span>Summer 2024</span></div>
          <blockquote>“{experienceSources.verified.boingo.companyPostExcerpt}”</blockquote>
          <p>Rockefeller Center · 5G and Wi-Fi operations exposure · public company post</p>
          <strong>Boingo Wireless</strong>
        </article>

        <article className="teaser-review-note">
          <div className="teaser-note-topline"><span>Member feedback</span><span>01 / 04</span></div>
          <blockquote>“{pureGymReviews[0].excerpt}”</blockquote>
          <p>{pureGymReviews[0].name} · Public Google review</p>
          <a href={pureGymReviews[0].url} target="_blank" rel="noreferrer">View public source ↗</a>
        </article>

        <div className="teaser-signature" aria-hidden="true">
          <Image src="/brand/chibi-khaled-header.webp" alt="" width={96} height={96} />
        </div>
      </div>
    </section>
  );
}
