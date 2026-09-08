import { contact } from "../data/contact";
import { StudioContactForm } from "../ui/StudioContactForm";

export function ContactStudio() {
  return (
    <div className="xp-studio">
      <header className="xp-studio__hero">
        <p className="xp-label">Contact</p>
        <h1 className="xp-studio__display">
          <span>LET&apos;S BUILD</span>
          <span>WHAT&apos;S NEXT.</span>
        </h1>
        <p className="xp-studio__lede">
          Tell us what you&apos;re building. We&apos;ll respond with clarity — scope, approach and next steps.
        </p>
      </header>

      <div className="xp-contact">
        <aside className="xp-contact__aside">
          <div>
            <p className="xp-label">Email</p>
            <a href={`mailto:${contact.email}`} data-cursor="expand">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="xp-label">Phone</p>
            <a href={contact.phoneHref} data-cursor="expand">
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="xp-label">Location</p>
            <p>{contact.location}</p>
          </div>
          <div>
            <p className="xp-label">Social</p>
            <ul className="xp-contact__socials">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" data-cursor="open">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="xp-contact__form">
          <StudioContactForm />
        </div>
      </div>
    </div>
  );
}
