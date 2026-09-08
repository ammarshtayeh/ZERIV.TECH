import { getAdjacentProjects, getProject } from "../data/projects";
import { CinematicMedia } from "../ui/CinematicMedia";
import { TransitionLink } from "../ui/TransitionLink";

interface Props {
  slug: string;
}

export function CaseStudy({ slug }: Props) {
  const project = getProject(slug);
  if (!project) return null;

  const { next } = getAdjacentProjects(slug);

  return (
    <article className="xp-case" data-accent={project.accent}>
      <header className="xp-case__hero">
        <p className="xp-label">
          <TransitionLink href="/work">Work</TransitionLink>
          <span aria-hidden="true"> / </span>
          {project.index}
        </p>
        <h1 className="xp-case__name">{project.name}</h1>
        <p className="xp-case__statement">{project.summary}</p>
        <dl className="xp-case__meta">
          <div>
            <dt className="xp-label">Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt className="xp-label">Services</dt>
            <dd>{project.disciplines.join(" · ")}</dd>
          </div>
          <div>
            <dt className="xp-label">Industry</dt>
            <dd>{project.industry}</dd>
          </div>
        </dl>
      </header>

      <figure className="xp-case__media xp-case__media--hero">
        <CinematicMedia source={project.media} sizes="100vw" priority />
      </figure>

      <section className="xp-case__block">
        <p className="xp-label">Overview</p>
        <h2 className="xp-case__h">What was the project?</h2>
        <p className="xp-case__copy">{project.overview}</p>
      </section>

      <section className="xp-case__split">
        <div>
          <p className="xp-label">Challenge</p>
          <h2 className="xp-case__h">The problem</h2>
          <p className="xp-case__copy">{project.challenge}</p>
        </div>
        <div>
          <p className="xp-label">Approach</p>
          <h2 className="xp-case__h">How we worked</h2>
          <p className="xp-case__copy">{project.approach}</p>
        </div>
      </section>

      <section className="xp-case__block xp-case__block--bright">
        <p className="xp-label">Experience</p>
        <h2 className="xp-case__h">Design &amp; product surface</h2>
        <figure className="xp-case__media">
          <CinematicMedia source={project.media} sizes="(max-width: 900px) 92vw, 80vw" />
        </figure>
      </section>

      <section className="xp-case__block">
        <p className="xp-label">Technology</p>
        <h2 className="xp-case__h">Stack</h2>
        <ul className="xp-case__stack">
          {project.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {project.url && (
          <a
            className="xp-case__live"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
          >
            Visit live site <span aria-hidden="true">↗</span>
          </a>
        )}
      </section>

      {next && (
        <nav className="xp-case__next" aria-label="Next project">
          <p className="xp-label">Next project</p>
          <TransitionLink href={`/work/${next.id}`} className="xp-case__next-link" data-cursor="view">
            <span className="xp-case__next-index">{next.index}</span>
            <span className="xp-case__next-name">{next.name}</span>
            <span aria-hidden="true">→</span>
          </TransitionLink>
        </nav>
      )}
    </article>
  );
}
