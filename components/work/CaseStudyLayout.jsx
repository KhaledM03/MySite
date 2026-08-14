import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";

export default function CaseStudyLayout({ children }) {
  return (
    <div className="site-shell evidence-shell">
      <a className="skip-link" href="#case-study-content">Skip to case study</a>
      <SiteHeader />

      <main id="case-study-content" className="case-study-page">
        <section className="case-study-hero" aria-labelledby="resetwave-title">
          <div className="case-study-hero-copy">
            <Link className="back-link" href="/work">← All work</Link>
            <p className="section-label">Case study 01 · Engineering automation</p>
            <h1 id="resetwave-title" style={{ viewTransitionName: "project-resetwave-title" }}>ResetWave</h1>
            <p className="case-study-deck">
              A sanitized account of an internship automation system built to make a repetitive infrastructure-management task dramatically faster.
            </p>
            <div className="result-comparison" aria-label="Task timing improved from approximately two hours to approximately ten seconds">
              <div><span>Before</span><strong>≈ 2 hours</strong></div>
              <i aria-hidden="true">→</i>
              <div><span>After</span><strong>≈ 10 seconds</strong></div>
            </div>
            <p className="calculation-note">7,200 seconds ÷ 10 seconds = approximately 720× faster.</p>
          </div>

          <div
            className="case-study-cover"
            aria-hidden="true"
            style={{ viewTransitionName: "project-resetwave-media" }}
          >
            <div className="cover-terminal">
              <span>RESETWAVE / OPERATIONAL RUN</span>
              <i /><i /><i /><i />
              <b>VALIDATION COMPLETE</b>
            </div>
            <Image
              src="/characters/khaled-engineering.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 88vw, 44vw"
            />
          </div>
        </section>

        <div className="case-study-meta" aria-label="Project summary">
          <div><span>Context</span><strong>Boingo Wireless internship</strong></div>
          <div><span>Period</span><strong>Summer 2024</strong></div>
          <div><span>Role</span><strong>Engineering automation</strong></div>
          <div><span>Published detail</span><strong>Sanitized</strong></div>
        </div>

        <div className="case-study-layout">
          <aside className="case-study-toc" aria-label="Case study contents">
            <span>On this page</span>
            <a href="#overview">Overview</a>
            <a href="#problem">Problem & role</a>
            <a href="#workflow">Workflow</a>
            <a href="#approach">Approach</a>
            <a href="#validation">Validation</a>
            <a href="#outcome">Outcome</a>
            <a href="#reflection">Reflection</a>
          </aside>
          <article className="case-study-document">{children}</article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
