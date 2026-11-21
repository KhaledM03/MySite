import { AluFigure, ComparatorFigure, PowerFigure } from "@/components/work/LabFigures";
import { LABS_REPOSITORY, labHighlights } from "@/data/labs";

const FIGURES = { alu: AluFigure, power: PowerFigure, comparator: ComparatorFigure };

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
        {labHighlights.map((lab) => {
          const Figure = FIGURES[lab.figure];
          return (
            <article key={lab.id} className="lab-card">
              <div className="lab-card-media">
                <Figure />
              </div>
              <div className="lab-card-copy">
                <p className="lab-card-course">{lab.course}</p>
                <h3>{lab.title}</h3>
                <p>{lab.summary}</p>
                <a className="timeline-link" href={lab.href} target="_blank" rel="noreferrer">
                  Code and write-up <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
