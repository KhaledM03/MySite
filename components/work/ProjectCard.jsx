import TransitionLink from "@/components/navigation/TransitionLink";
import ProjectSignalPreview from "@/components/work/ProjectSignalPreview";

export default function ProjectCard({ project, featured = false }) {
  return (
    <article
      id={project.slug}
      className={`project-card project-card-${project.tone}${featured ? " project-card-featured" : ""}`}
    >
      <div
        className="project-card-visual"
        style={{ viewTransitionName: `project-${project.slug}-media` }}
      >
        <ProjectSignalPreview project={project} variant="index" />
      </div>

      <div className="project-card-copy">
        <div className="project-card-topline">
          <span>{project.number}</span>
          <span>{project.status}</span>
        </div>
        <p className="project-eyebrow">{project.eyebrow}</p>
        <h2 style={{ viewTransitionName: `project-${project.slug}-title` }}>{project.name}</h2>
        <dl className="project-proof-stack">
          <div><dt>Problem</dt><dd>{project.problem}</dd></div>
          <div><dt>Build</dt><dd>{project.build}</dd></div>
          <div><dt>Proof</dt><dd>{project.proof}</dd></div>
        </dl>
        <p className="project-stack-label">Stack</p>
        <ul className="technology-list" aria-label={`${project.name} technology stack`}>
          {project.technology.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <TransitionLink
          className="text-link"
          href={project.href}
          transitionLabel={`Opening ${project.name}`}
          data-magnetic
          data-signal="OPEN CASE"
        >
          Trace the evidence <span aria-hidden="true">↗</span>
        </TransitionLink>
      </div>
    </article>
  );
}
