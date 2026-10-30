import { projects, featuredProjects } from "../data/projects";

interface StaticDetailsProps {
  projects: typeof projects;
  title: string;
  lede: string;
}

function StaticDetailsInner({ projects: projectsToShow, title, lede }: StaticDetailsProps) {
  return (
    <section
      id="project-details"
      className="static-details section-block section-pad"
      aria-labelledby="static-details-title"
      data-static-details
    >
      <div className="static-details-inner">
        <p className="static-details-kicker">Project details</p>
        <h2 id="static-details-title" className="static-details-title">
          {title}
        </h2>
        <p className="static-details-lede">
          {lede}
        </p>
        <div className="static-details-list">
          {projectsToShow.map((project) => (
            <article key={project.id} className="static-details-item">
              <header className="static-details-head">
                <h3 className="static-details-item-title">{project.title}</h3>
                <span className="static-details-year">{project.year}</span>
              </header>
              <p className="static-details-desc">{project.description}</p>
              <dl className="static-details-body">
                <div>
                  <dt>What it is</dt>
                  <dd>{project.what}</dd>
                </div>
                <div>
                  <dt>The problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{project.stack}</dd>
                </div>
              </dl>
              <ul className="static-details-tags">
                {project.tags.map((tag) => (
                  <li key={tag} className="tag-pill">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="static-details-links">
                <a href={project.github}>GitHub</a>
                {project.demo ? <a href={project.demo}>Live demo</a> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StaticDetailsHome() {
  return (
    <StaticDetailsInner
      projects={featuredProjects}
      title="Featured projects, in full"
      lede="These six write-ups normally open from a project card on the home page. They are printed here so the featured work reads without JavaScript."
    />
  );
}

export function StaticDetailsAll() {
  return (
    <StaticDetailsInner
      projects={projects}
      title="Every project, in full"
      lede="These write-ups normally open from a project card. They are printed here so the whole portfolio reads without JavaScript."
    />
  );
}
