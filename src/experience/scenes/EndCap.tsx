/**
 * Temporary terminus while Scenes 03–07 are in production.
 * Keeps the page from ending mid-thought and signals what comes next.
 */
export function EndCap() {
  return (
    <section className="xp-endcap" aria-label="Next scene">
      <div className="xp-endcap__row">
        <span className="xp-label">SCN_03 — CAPABILITIES</span>
        <span className="xp-label xp-endcap__status">
          <i aria-hidden="true" /> IN PRODUCTION
        </span>
      </div>
      <p className="xp-endcap__note">
        Web · Mobile · UI/UX · Branding · AI · Creative Technology
      </p>
    </section>
  );
}
