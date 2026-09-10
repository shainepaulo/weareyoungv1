"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Projects", active: true },
  { href: "https://www.weareyoung-agency.com/agency/", label: "Agency", active: false },
  { href: "https://www.waytv.paris/", label: "Studio", active: false, external: true },
];

export function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div id="header" className={navOpen ? "navReponsiveOpen" : undefined}>
      <Link href="/">
        {/* eslint-disable-next-line @next/next/no-img-element -- flat SVG mark, sized by the theme */}
        <img src="/way/img/logoSvg.svg" alt="WAY" className="logo" />
      </Link>

      <nav>
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`txtHover ${link.active ? "active" : ""}`}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
          >
            {link.label}
            <span className="blink">_</span>
          </Link>
        ))}
      </nav>

      <div id="navResponsive" className={navOpen ? "open" : undefined}>
        <div className="table">
          <div className="cell">
            <Link href="/" className="txtHover homeLink" onClick={() => setNavOpen(false)}>
              Home<span className="blink">_</span>
            </Link>
            <Link href="/" className="txtHover projetLink active" onClick={() => setNavOpen(false)}>
              Projects<span className="blink">_</span>
            </Link>
            <a
              href="https://www.weareyoung-agency.com/agency/"
              className="txtHover agenceLink"
              onClick={() => setNavOpen(false)}
            >
              Agency<span className="blink">_</span>
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`burger ${navOpen ? "open" : ""}`}
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
        onClick={() => setNavOpen((open) => !open)}
      >
        <span className="n1" />
        <span className="n2" />
        <span className="n3" />
        <span className="n4" />
      </button>
    </div>
  );
}
