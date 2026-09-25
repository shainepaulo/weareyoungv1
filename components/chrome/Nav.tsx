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

/** The observatory. It travels as a mark on desktop and as a word in the menu. */
const PULSE = { href: "/pulse", label: "Pulse", hint: "Insights & Conseil" } as const;

/**
 * Pulse is switched off for now: the mark stays in the nav but leads nowhere,
 * on desktop and in the mobile menu. Flip back to true to reopen it.
 */
const PULSE_OPEN = false;

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

  // The heartbeat answers "am I in the section", not "am I on this exact page",
  // so it survives a move into a Pulse entry. aria-current stays exact.
  const inPulse = pathname === PULSE.href || pathname.startsWith(`${PULSE.href}/`);

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

          {PULSE_OPEN ? (
            <Link
              href={PULSE.href}
              className="nav__pulse"
              aria-current={isCurrent(PULSE.href)}
              data-live={inPulse ? "" : undefined}
            >
              <Pulse />
              {/* The name stays for screen readers; nothing appears on hover. */}
              <span className="sr-only">{PULSE.label}</span>
            </Link>
          ) : (
            <span className="nav__pulse nav__pulse--off" aria-hidden="true">
              <Pulse />
            </span>
          )}
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
          {[...LINKS, PULSE].map((link, i) => {
            const isPulse = link.href === PULSE.href;
            if (isPulse && !PULSE_OPEN) return null;
            return (
              <li className="menu__item" key={link.href}>
                <Link
                  href={link.href}
                  className={`menu__link display ${isPulse ? "menu__link--pulse" : ""}`}
                  style={{ "--i": i } as React.CSSProperties}
                  aria-current={isCurrent(link.href)}
                  data-live={isPulse && inPulse ? "" : undefined}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                >
                  {isPulse ? (
                    <span className="menu__label">
                      {link.label}
                      <Pulse className="menu__pulse-mark" />
                    </span>
                  ) : (
                    link.label
                  )}
                  <small>{link.hint}</small>
                </Link>
              </li>
            );
          })}
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
