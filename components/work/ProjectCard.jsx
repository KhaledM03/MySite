import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project, featured = false }) {
  const actionProps = project.externalAsset
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <article
      id={project.slug}
      className={`project-card project-card-${project.tone}${featured ? " project-card-featured" : ""}`}
    >
      <div className="project-card-visual" aria-hidden={!project.image}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            sizes={featured ? "(max-width: 760px) 92vw, 52vw" : "(max-width: 760px) 92vw, 43vw"}
          />
        ) : (
          <div className="resetwave-visual" aria-hidden="true">
            <span>MANUAL</span>
            <b>02:00:00</b>
            <i>→</i>
            <span>AUTOMATED</span>
            <strong>00:00:10</strong>
            <svg viewBox="0 0 560 140" fill="none">
              <path d="M8 92C74 92 64 28 132 28S188 110 256 110 323 48 390 48 449 80 552 16" />
            </svg>
          </div>
        )}
      </div>

      <div className="project-card-copy">
        <div className="project-card-topline">
          <span>{project.number}</span>
          <span>{project.status}</span>
        </div>
        <p className="project-eyebrow">{project.eyebrow}</p>
        <h2>{project.name}</h2>
        <p className="project-problem">{project.problem}</p>
        <dl className="project-facts">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Proof</dt><dd>{project.proof}</dd></div>
        </dl>
        <ul className="technology-list" aria-label={`${project.name} technology`}>
          {project.technology.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <Link className="text-link" href={project.href} {...actionProps}>
          {project.action} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
