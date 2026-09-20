/**
 * The "built by bpcloudtech" credit for a site we built, with the cloud of our
 * mark. Drop-in and self-contained: one file, React only, no Tailwind class, no
 * design token from the host site, no client hook — it renders in a server
 * component as happily as in a client one.
 *
 * Colour without theme detection: the type takes `currentColor` at reduced
 * opacity, and the cloud mixes our blue into `currentColor` too. A footer's
 * text colour already contrasts with its own background, so the mix lands near
 * #3a6081 on a pale panel and near #80a7c8 on a dark one — the two ends of the
 * accent in our own mark, arrived at without asking the host which theme it is
 * in. That matters because sites signal the theme differently (`.dark`,
 * `[data-theme]`, `prefers-color-scheme`), and a media query gets it wrong on a
 * site whose theme is set by class while the OS asks for the other one.
 *
 * Master copy: bpcloudtech/shared/built-by/BuiltBy.tsx. Edit it there and copy
 * the file out; the sites carry a copy rather than a dependency.
 */

const HREF = "https://bpcloudtech.com";

const LABELS = {
  en: ["built and operated", "by"],
  de: ["erstellt und betrieben", "von"],
} as const;

const NAME = "bpcloudtech";

const CSS = `
.bpct{--bpct-brand:#4a86b8;display:inline-flex;align-items:center;gap:.5em;
  text-align:left;color:inherit;font-size:.8125rem;line-height:1.3;
  text-decoration:none;opacity:.65;transition:opacity .15s ease}
.bpct:hover,.bpct:focus-visible{opacity:1}
.bpct:focus-visible{outline:2px solid currentColor;outline-offset:3px;border-radius:3px}
.bpct-mark{width:2.65em;height:2.65em;flex:none;color:var(--bpct-brand);
  color:color-mix(in srgb,var(--bpct-brand) 65%,currentColor)}
.bpct-lines{display:flex;flex-direction:column}
.bpct-line{display:flex;justify-content:space-between;gap:.3em}
.bpct-name{font-weight:600;letter-spacing:.12em;margin-right:-.12em}
`;

export type BuiltByProps = {
  /** Language of the label. */
  locale?: "en" | "de" | string;
  /** Appended as `?from=` on the link, so the visit is attributable. */
  from?: string;
  /** Replaces the whole label; the cloud stays. */
  label?: string;
  className?: string;
};

export function BuiltBy({ locale = "en", from, label, className }: BuiltByProps) {
  const [first, lead] = LABELS[locale === "de" ? "de" : "en"];
  const href = from ? `${HREF}/?from=${encodeURIComponent(from)}` : HREF;

  return (
    <>
      {/* React 19 hoists this into <head> and keeps one copy however often the
          component is rendered; on React 18 it stays inline and still applies. */}
      <style href="bpct-built-by" precedence="default" dangerouslySetInnerHTML={{ __html: CSS }} />
      <a className={className ? `bpct ${className}` : "bpct"} href={href} target="_blank" rel="noopener">
        <svg className="bpct-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="currentColor">
          <circle cx="18.25" cy="14.3" r="7.9" />
          <circle cx="9.25" cy="18.25" r="6.2" />
          <rect x="3" y="18.8" width="26" height="6.8" rx="3.4" />
        </svg>
        {label ? (
          <span>{label}</span>
        ) : (
          <span className="bpct-lines">
            {/* Both lines are laid out as a row that spreads its words across
                the block, so the short line ends flush with the long one. */}
            <span className="bpct-line">
              {first.split(" ").map((word) => (
                <span key={word}>{word}</span>
              ))}
            </span>
            <span className="bpct-line">
              <span>{lead}</span>
              <span className="bpct-name">{NAME}</span>
            </span>
          </span>
        )}
      </a>
    </>
  );
}

export default BuiltBy;
