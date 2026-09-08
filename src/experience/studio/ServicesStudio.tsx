import { capabilities } from "../data/services";
import { getProject } from "../data/projects";
import { ServiceVisual } from "../ui/ServiceVisual";
import { TransitionLink } from "../ui/TransitionLink";

export function ServicesStudio() {
  return (
    <div className="xp-studio">
      <header className="xp-studio__hero">
        <p className="xp-label">What we do</p>
        <h1 className="xp-studio__display">
          <span>CAPABILITIES</span>
        </h1>
        <p className="xp-studio__lede">
          Web, mobile, design, brand, AI and creative technology — built as systems that last.
        </p>
      </header>

      <div className="xp-svc">
        {capabilities.map((c) => {
          const related = c.related.map((id) => getProject(id)).filter(Boolean);
          return (
            <article key={c.id} className="xp-svc__block" id={c.id}>
              <div className="xp-svc__intro">
                <p className="xp-label">{c.index}</p>
                <h2 className="xp-svc__title">{c.title}</h2>
                <p className="xp-svc__line">{c.line}</p>
              </div>

              <div className="xp-svc__grid">
                <div className="xp-svc__visual">
                  <ServiceVisual kind={c.id} />
                </div>
                <div className="xp-svc__detail">
                  <div>
                    <p className="xp-label">Who it&apos;s for</p>
                    <p className="xp-svc__copy">{c.audience}</p>
                  </div>
                  <div>
                    <p className="xp-label">What it can include</p>
                    <ul className="xp-svc__list">
                      {c.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="xp-label">Technology</p>
                    <p className="xp-label xp-svc__tags">{c.tech.join(" · ")}</p>
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <div className="xp-svc__related">
                  <p className="xp-label">Related work</p>
                  <ul>
                    {related.map(
                      (p) =>
                        p && (
                          <li key={p.id}>
                            <TransitionLink href={`/work/${p.id}`} data-cursor="view">
                              {p.name} <span aria-hidden="true">→</span>
                            </TransitionLink>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="xp-studio__cta">
        <p className="xp-studio__cta-copy">Have a project in mind?</p>
        <TransitionLink href="/contact" className="xp-studio__cta-link" data-cursor="expand">
          Start a project <span aria-hidden="true">→</span>
        </TransitionLink>
      </div>
    </div>
  );
}
