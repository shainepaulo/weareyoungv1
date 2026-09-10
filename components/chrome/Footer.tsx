import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { SITE, STATS } from "@/lib/projects";

const LINE = ["Go", "your", "own", "WAY"];

export function Footer() {
  return (
    <footer className="footer tone-dark">
      <div className="footer__marquee" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="footer__marquee-track display" key={copy}>
            {[0, 1, 2].map((rep) =>
              LINE.map((word, i) => (
                <span key={`${rep}-${i}`}>
                  {word}
                  {i === LINE.length - 1 && <span className="dot" />}
                </span>
              )),
            )}
          </div>
        ))}
      </div>

      <div className="footer__body">
        <div className="footer__col mono-s">
          <h4>Agency</h4>
          <span>{SITE.name}</span>
          {SITE.address.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div className="footer__col mono-s">
          <h4>Contact</h4>
          <a className="u" href={`mailto:${SITE.mail}`}>
            {SITE.mail}
          </a>
          <a className="u" href={SITE.phoneHref}>
            {SITE.phone}
          </a>
        </div>

        <div className="footer__col mono-s">
          <h4>Navigate</h4>
          <Link className="u" href="/">
            Projects
          </Link>
          <Link className="u" href="/roster">
            Roster
          </Link>
          <Link className="u" href="/about">
            About
          </Link>
          <Link className="u" href="/contact">
            Contact
          </Link>
        </div>

        <div className="footer__col mono-s">
          <h4>Elsewhere</h4>
          <a className="u" href={SITE.studio.href} target="_blank" rel="noreferrer">
            {SITE.studio.label} — film studio ↗
          </a>
          <a className="u" href="https://vimeo.com/waytv" target="_blank" rel="noreferrer">
            Vimeo ↗
          </a>
        </div>

        <Mark className="footer__mark" />
      </div>

      <div className="footer__base">
        <span>
          © {new Date().getFullYear()} {SITE.name} — Paris
        </span>
        <span>
          {STATS.projects} projects · {STATS.brands} brands · {STATS.years} years
        </span>
      </div>
    </footer>
  );
}
