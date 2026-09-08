import { TransitionLink } from "../ui/TransitionLink";

export function AboutStudio() {
  return (
    <div className="xp-studio">
      <header className="xp-studio__hero">
        <p className="xp-label">Studio</p>
        <h1 className="xp-studio__display">
          <span>ABOUT</span>
          <span>ZERIV</span>
        </h1>
        <p className="xp-studio__lede">
          A Palestinian creative technology studio building digital products with clarity,
          craft and cultural intelligence.
        </p>
      </header>

      <section className="xp-about__statement">
        <p>
          ZERIV exists at the intersection of technology, design and culture. We build websites,
          applications, brands and intelligent systems for teams who need work that feels
          intentional — not assembled from templates.
        </p>
      </section>

      <section className="xp-about__grid">
        <div>
          <p className="xp-label">How we think</p>
          <h2 className="xp-about__h">Systems over surfaces</h2>
          <p className="xp-about__copy">
            Every interface is an expression of structure. We design the logic, the language and
            the experience together — so products stay coherent as they grow.
          </p>
        </div>
        <div>
          <p className="xp-label">What makes us different</p>
          <h2 className="xp-about__h">Culture as intelligence</h2>
          <p className="xp-about__copy">
            Palestinian identity shapes how we see pattern, rhythm and meaning. It appears as
            discipline in geometry and restraint in presentation — never as decoration pasted on.
          </p>
        </div>
        <div>
          <p className="xp-label">How we build</p>
          <h2 className="xp-about__h">Clarity, then craft</h2>
          <p className="xp-about__copy">
            We start with the problem, define the system, then execute with precision — modern
            stacks, careful motion, and production quality from the first release.
          </p>
        </div>
      </section>

      <section className="xp-about__band">
        <p className="xp-label">Position</p>
        <p className="xp-about__band-line">
          TECHNOLOGY <span>×</span> DESIGN <span>×</span> CULTURE
        </p>
        <p className="xp-about__copy">
          Based in Palestine. Working with clients who want digital work that can compete
          internationally — and still feel like it belongs somewhere real.
        </p>
      </section>

      <div className="xp-studio__cta">
        <TransitionLink href="/work" className="xp-studio__cta-link" data-cursor="expand">
          See selected work <span aria-hidden="true">→</span>
        </TransitionLink>
        <TransitionLink href="/contact" className="xp-studio__cta-link" data-cursor="expand">
          Start a project <span aria-hidden="true">→</span>
        </TransitionLink>
      </div>
    </div>
  );
}
