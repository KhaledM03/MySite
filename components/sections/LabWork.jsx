import Image from "next/image";
import { LABS_REPOSITORY, labHighlights } from "@/data/labs";

export default function LabWork() {
  return (
    <section id="labs" className="home-section lab-work" aria-labelledby="labs-title">
      <header className="home-section-header">
        <h2 id="labs-title">From the lab</h2>
        <a className="text-link" href={LABS_REPOSITORY} target="_blank" rel="noreferrer">
          All labs on GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="lab-grid">
        {labHighlights.map((lab) => (
          <article key={lab.id} className="lab-card">
            <figure className={`lab-card-media${lab.image.fit === "contain" ? " lab-card-media-screen" : ""}`}>
              <Image
                src={lab.image.src}
                alt={lab.image.alt}
                width={lab.image.width}
                height={lab.image.height}
                sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 31vw"
                style={lab.image.position ? { objectPosition: lab.image.position } : undefined}
              />
              <figcaption className="lab-card-result">
                <span aria-hidden="true">✓</span> {lab.result}
              </figcaption>
            </figure>
            <div className="lab-card-copy">
              <p className="lab-card-course">{lab.course}</p>
              <h3>{lab.title}</h3>
              <p>{lab.summary}</p>
              <a className="timeline-link" href={lab.href} target="_blank" rel="noreferrer">
                Code and write-up <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
