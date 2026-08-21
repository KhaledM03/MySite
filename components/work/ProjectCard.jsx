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
        <p className="project-problem">{project.problem}</p>
        <dl className="project-facts">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Proof</dt><dd>{project.proof}</dd></div>
        </dl>
        <ul className="technology-list" aria-label={`${project.name} technology`}>
          {project.technology.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <TransitionLink
          className="text-link"
          href={project.href}
          transitionLabel={`Opening ${project.name}`}
          data-magnetic
          data-signal="OPEN CASE"
        >
          {project.action} <span aria-hidden="true">↗</span>
        </TransitionLink>
      </div>
    </article>
  );
}
