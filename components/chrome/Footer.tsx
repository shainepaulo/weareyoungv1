"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram } from "@/components/brand/Instagram";
import { Mark } from "@/components/brand/Mark";
import { BRAND_MARKS } from "@/lib/brands";
import { SITE, STATS } from "@/lib/projects";

const LINE = ["Go", "your", "own", "WAY"];

/**
 * What runs across the foot of the page, per route:
 *
 *   /roster          the client marks
 *   /  and /contact  nothing
 *   everywhere else  the claim, as it has always been
 *
 * Same strip, same animation — only the cargo changes.
 */
type Band = "words" | "brands" | "none";

function bandFor(pathname: string): Band {
  if (pathname === "/roster") return "brands";
  if (pathname === "/" || pathname === "/contact") return "none";
  return "words";
}

export function Footer() {
  const pathname = usePathname();
  const band = bandFor(pathname);
  const isLanding = pathname === "/";

  return (
    <footer className="footer tone-dark">
      {band !== "none" && (
        <div className="footer__marquee" aria-hidden="true">
          {/* Two copies so the loop closes on itself. */}
          {[0, 1].map((copy) => (
            <div className="footer__marquee-track display" key={copy} data-band={band}>
              {band === "words"
                ? [0, 1, 2].map((rep) =>
                    LINE.map((word, i) => (
                      <span key={`${rep}-${i}`}>
                        {word}
                        {i === LINE.length - 1 && <span className="dot" />}
                      </span>
                    )),
                  )
                : [0, 1, 2].map((rep) =>
                    BRAND_MARKS.map((brand, i) => (
                      <span className="footer__brand" key={`${rep}-${i}`}>
                        {/* Masked, not <img>: the flat path takes currentColor
                            and comes out white on the dark footer. */}
                        <span
                          className="footer__brand-mark"
                          style={{ maskImage: `url(${brand.src})`, WebkitMaskImage: `url(${brand.src})` }}
                          role="img"
                          aria-label={brand.name}
                        />
                        {i === 0 && <span className="dot" />}
                      </span>
                    )),
                  )}
            </div>
          ))}
        </div>
      )}

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
            {isLanding ? "Projects" : "Home"}
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

        {isLanding ? (
          <div className="footer__col mono-s">
            <h4>Elsewhere</h4>
            <a className="u" href={SITE.studio.href} target="_blank" rel="noreferrer">
              {SITE.studio.label} — film studio ↗
            </a>
            <a className="u" href={SITE.vimeo} target="_blank" rel="noreferrer">
              Vimeo ↗
            </a>
          </div>
        ) : (
          <div className="footer__col mono-s">
            <h4>Follow</h4>
            <a
              className="footer__social"
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="WAY on Instagram"
            >
              <Instagram />
              <span>Instagram</span>
            </a>
            <a className="u" href={SITE.studio.href} target="_blank" rel="noreferrer">
              {SITE.studio.label} — film studio ↗
            </a>
          </div>
        )}

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
