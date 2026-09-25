import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WayTo } from "@/components/about/WayTo";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND_MARKS } from "@/lib/brands";
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

      {/* The showreel, where the claim used to be spelled out. Muted, looping and
          inline so it can play on its own, on a phone too; no controls, it is
          a moving plate rather than a film to sit through. */}
      <section className="section section--flush tone-dark about__reel">
        <video
          className="about__reel-video"
          src="/way/showreel.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="WAY showreel"
        />
      </section>

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
                <Link href="/roster#work" className="service__row">
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
        {/* Two figures, each hiding what it counts. Hover (or focus, or a tap
            on a touch screen) opens it: the disciplines slide out beside 15+,
            the client marks rise from behind 32. */}
        <ul className="stats stats--pair">
          <Reveal as="li" kind="up" className="stat" tabIndex={0}>
            <span className="stat__figure">
              <span className="display d1 stat__n">{STATS.years}</span>
            </span>
            <span className="mono-xs muted stat__label">years</span>
            <ul className="stat__disciplines mono-s" aria-label="Disciplines">
              {TYPES.map((type, i) => (
                <li key={type} style={{ "--i": i } as CSSProperties}>
                  <span className="accent">{String(i + 1).padStart(2, "0")}</span> {type}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="li" kind="up" delay={90} className="stat stat--brands" tabIndex={0}>
            <span className="stat__figure">
              <span className="stat__marks" aria-label="Clients">
                {BRAND_MARKS.map((brand, i) => (
                  <span
                    key={brand.name}
                    className="stat__mark"
                    role="img"
                    aria-label={brand.name}
                    style={
                      {
                        "--i": i,
                        "--src": `url("${brand.src}")`,
                        "--ratio": brand.ratio ?? 1,
                      } as CSSProperties
                    }
                  />
                ))}
              </span>
              <span className="display d1 stat__n">{STATS.brands}</span>
            </span>
            <span className="mono-xs muted stat__label">brands</span>
          </Reveal>
        </ul>
      </section>

    </>
  );
}
