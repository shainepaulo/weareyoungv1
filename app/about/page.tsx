import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WayTo } from "@/components/about/WayTo";
import { PulseBand } from "@/components/motion/PulseBand";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECT_LIST, SITE, STATS, TYPES } from "@/lib/projects";
import "../pages.css";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.claim}. Paris, ${STATS.years} years, ${STATS.brands} brands.`,
};

/**
 * The manifesto, verbatim from the current /agency/ page. This is the agency's
 * own voice — nothing here is written for the reboot.
 */
const MANIFESTO = [
  "A creative agency for brands who dare to go their own WAY.",
  "We’ve been called an event agency, an experiential agency, a content agency and a bunch of other names.",
  "Truth is, we’re a collective of rebellious humans, all working as one to push boundaries and make provocative ideas happen.",
];

export default function AboutPage() {
  const countOf = (type: string) => PROJECT_LIST.filter((p) => p.types.includes(type)).length;
  const sampleOf = (type: string) => PROJECT_LIST.find((p) => p.types.includes(type));

  return (
    <>
      <section className="section tone-dark page-hero about__hero">
        <div className="gridlines" />
        <span className="eyebrow">About</span>
        <WayTo />
      </section>

      <PulseBand tone="light" perRow={2} words={["Dare", "to go", "your", "own", "WAY", "since", "day", "one"]} />

      <section className="section tone-dark about__story">
        <div className="gridlines" />
        <Reveal as="h2" kind="up" className="display d3 about__story-title">
          {STATS.years} years of going our own way
        </Reveal>
        <div className="about__story-body">
          {MANIFESTO.map((line, i) => (
            <Reveal as="p" kind="up" delay={i * 120} key={i} className="mono-xl">
              {line}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section tone-light about__services">
        <div className="gridlines" />
        <header className="row-between">
          <h2 className="display d3">What we do</h2>
          <span className="mono-xs muted">{STATS.services} disciplines</span>
        </header>
        <ol className="services">
          {TYPES.map((type, i) => {
            const sample = sampleOf(type);
            return (
              <Reveal as="li" kind="up" delay={i * 60} key={type} className="service">
                <Link href="/#work" className="service__row">
                  <span className="mono-xs accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display d2 service__name">{type}</span>
                  <span className="mono-xs muted service__count">{String(countOf(type)).padStart(2, "0")} projects</span>
                  {sample && (
                    <span className="service__thumb" aria-hidden="true">
                      <Image src={sample.cover} alt="" fill sizes="240px" style={{ objectFit: "cover" }} />
                    </span>
                  )}
                </Link>
              </Reveal>
            );
          })}
        </ol>
      </section>

      <section className="section tone-dark">
        <div className="gridlines" />
        <ul className="stats">
          {[
            [STATS.years, "years"],
            [String(STATS.brands), "brands"],
            [String(STATS.projects).padStart(3, "0"), "projects"],
            [String(STATS.services), "disciplines"],
          ].map(([n, label], i) => (
            <Reveal as="li" kind="up" delay={i * 90} key={label}>
              <span className="display d1">{n}</span>
              <span className="mono-xs muted">{label}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section tone-light about__where">
        <div className="gridlines" />
        <Reveal kind="up" className="address">
          <h2 className="display d3">{SITE.name}</h2>
          <p className="mono-l">
            {SITE.address[0]}
            <br />
            {SITE.address[1]}
          </p>
          <p className="mono-l">
            <span className="mono-xs muted">Phone / </span>
            <a className="u" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <br />
            <span className="mono-xs muted">Mail / </span>
            <a className="u" href={`mailto:${SITE.mail}`}>
              {SITE.mail}
            </a>
          </p>
          <div className="address__links mono-xs">
            <a className="u" href={SITE.maps} target="_blank" rel="noreferrer">
              Open in Maps ↗
            </a>
            <a className="u" href={SITE.studio.href} target="_blank" rel="noreferrer">
              Studio — {SITE.studio.label} ↗
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
