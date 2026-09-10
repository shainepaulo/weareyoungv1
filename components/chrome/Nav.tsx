"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Pulse } from "@/components/brand/Pulse";
import { Wordmark } from "@/components/brand/Wordmark";
import { SITE, STATS } from "@/lib/projects";

const LINKS = [
  { href: "/roster", label: "Roster", hint: `${STATS.brands} brands` },
  { href: "/about", label: "About", hint: `${STATS.years} years` },
  { href: "/contact", label: "Contact", hint: "Paris" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Lock the page behind the menu. Only touches the flag while open, so it
  // never clears a lock the intro is holding.
  useEffect(() => {
    if (!open) return;
    document.documentElement.dataset.lock = "1";
    return () => {
      document.documentElement.dataset.lock = "";
    };
  }, [open]);

  // Slide away on scroll down, come back on scroll up — a nav that gets out of the way.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const goingDown = y > last && y > 120;
        setHidden(goingDown);
        last = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const isCurrent = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <>
      <header className={`nav ${hidden && !open ? "nav--hidden" : ""} ${open ? "nav--menu" : ""}`}>
        <Link href="/" className="nav__brand" aria-label="WAY — home">
          <Wordmark />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav__link" aria-current={isCurrent(link.href)}>
              {link.label}
              <span className="blink" aria-hidden="true">_</span>
            </Link>
          ))}

          {/* Parked: the mark is in place, the destination is not decided yet. */}
          <button type="button" className="nav__pulse" aria-label="Pulse — coming soon" disabled>
            <Pulse />
          </button>
        </nav>

        <button
          type="button"
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="menu" className={`menu ${open ? "menu--open" : ""}`} aria-hidden={!open}>
        <ul className="menu__list">
          {LINKS.map((link, i) => (
            <li className="menu__item" key={link.href}>
              <Link
                href={link.href}
                className="menu__link display"
                style={{ "--i": i } as React.CSSProperties}
                aria-current={isCurrent(link.href)}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <small>{link.hint}</small>
              </Link>
            </li>
          ))}
        </ul>

        <div className="menu__foot mono-s">
          <span className="muted">{SITE.address.join(", ")}</span>
          <a href={`mailto:${SITE.mail}`} className="u" tabIndex={open ? 0 : -1}>
            {SITE.mail}
          </a>
          <a href={SITE.studio.href} target="_blank" rel="noreferrer" className="u" tabIndex={open ? 0 : -1}>
            Studio — {SITE.studio.label} ↗
          </a>
        </div>
      </div>
    </>
  );
}
