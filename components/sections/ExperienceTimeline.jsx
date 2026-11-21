import Link from "next/link";
import { experienceTimeline } from "@/data/experience";

export default function ExperienceTimeline({ headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;

  return (
    <ol className="timeline">
      {experienceTimeline.map((entry) => (
        <li key={entry.id} className="timeline-item">
          <p className="timeline-period">{entry.period}</p>
          <div className="timeline-body">
            <Heading>{entry.organization}</Heading>
            <p className="timeline-role">{entry.role}</p>
            <p className="timeline-summary">{entry.summary}</p>
            {entry.href ? (
              <Link className="timeline-link" href={entry.href}>
                {entry.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
