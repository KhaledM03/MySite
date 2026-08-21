import Link from "next/link";
import {
  CANONICAL_RESUME,
  FIELD_BRIEF_EVIDENCE,
  FIELD_BRIEF_SIGNALS,
  PUBLIC_CODE,
} from "@/data/career";

export default function FieldBrief() {
  return (
    <section id="field-brief" className="field-brief" aria-labelledby="field-brief-title" tabIndex={-1}>
      <header className="field-brief-header">
        <div>
          <p className="section-label">Quick signal · 30 second field brief</p>
          <h2 id="field-brief-title">What I build,<br /><em>and where the proof lives.</em></h2>
        </div>
        <p>
          Computer and electrical engineering across physical systems, Linux automation, and responsive software—connected by testing, validation, and work that matters beyond the screen.
        </p>
      </header>

      <div className="field-brief-signal-grid" aria-label="Engineering summary">
        {FIELD_BRIEF_SIGNALS.map((signal, index) => (
          <article key={signal.label}>
            <span>{String(index + 1).padStart(2, "0")} / {signal.label}</span>
            <h3>{signal.title}</h3>
            <p>{signal.detail}</p>
          </article>
        ))}
      </div>

      <div className="field-brief-proof">
        <div className="field-brief-proof-heading">
          <span>Strongest signals</span>
          <strong>Claim → evidence</strong>
        </div>
        <div className="field-brief-proof-list">
          {FIELD_BRIEF_EVIDENCE.map((item) => (
            <Link key={item.name} href={item.href} data-signal="TRACE EVIDENCE">
              <span>{item.number}</span>
              <div><strong>{item.name}</strong><small>{item.signal}</small></div>
              <b>{item.proof}</b>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </div>

      <footer className="field-brief-actions">
        <div className="field-brief-resume">
          <span>Ready to scan</span>
          <strong>{CANONICAL_RESUME.label}</strong>
          <small>{CANONICAL_RESUME.detail}</small>
        </div>
        <div>
          <a className="button button-primary" href={CANONICAL_RESUME.href} target="_blank" rel="noreferrer" data-magnetic data-signal="OPEN PDF ↗">
            View résumé <span aria-hidden="true">↗</span>
          </a>
          <button className="button button-secondary" type="button" data-contact-trigger data-magnetic>
            Open contact card <span aria-hidden="true">↗</span>
          </button>
          <a className="field-brief-code" href={PUBLIC_CODE.portfolio.href} target="_blank" rel="noreferrer" data-signal="VIEW CODE ↗">
            View portfolio code <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </section>
  );
}
