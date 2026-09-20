import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CollabStats } from "@/components/project/CollabStats";
import { PROJECT_LIST } from "@/lib/projects";
import "../pages.css";

export const metadata: Metadata = {
  title: "Pulse",
  description:
    "The live cultural signal of We Are Young. A running feed of what moves brands, sport, and culture — read fast, read first, move as one.",
};

/** The beats Pulse covers. Named, not explained. */
const TAGS = [
  "Fashion",
  "Subculture",
  "Basketball",
  "Music",
  "Sneakers",
  "Football",
  "Nightlife",
  "Skate",
] as const;

const ISSUE = { number: "001", title: "Generation Now" } as const;

const SIGNALS = [
  {
    tag: "Sport",
    title: "Grassroots football is the new luxury runway",
    city: "Paris",
    age: "02h ago",
  },
  {
    tag: "Music",
    title: "Afrobeats crosses over into stadium-scale brand films",
    city: "Lagos",
    age: "05h ago",
  },
  {
    tag: "Sneakers",
    title: "Resale culture rewires how Gen-Z reads authenticity",
    city: "Paris",
    age: "08h ago",
  },
  {
    tag: "Basketball",
    title: "Quai 54 turns a tournament into a global style index",
    city: "Paris",
    age: "14h ago",
  },
  {
    tag: "Subculture",
    title: "Skate crews are running better media than the agencies",
    city: "London",
    age: "22h ago",
  },
  {
    tag: "Fashion",
    title: "The archive is the entry ticket. Newness is not.",
    city: "Tokyo",
    age: "1d ago",
  },
] as const;

/** The offer, stated at the altitude of someone who already knows the codes. */
const ADVISORY = [
  { label: "Read", line: "We know which signals are noise and which ones are the next two years." },
  { label: "Decode", line: "We speak the language before it reaches the deck." },
  { label: "Move", line: "We build the thing that earns you the room." },
] as const;

export default function PulsePage() {
  // The plate leads on the work, not on stock imagery.
  const issueImage = PROJECT_LIST.find((p) => p.slug === "quai-54") ?? PROJECT_LIST[0];

  return (
    <>
      <section className="section tone-dark pulse-hero">
        <span className="mono-xs accent">Our way to read</span>
        <h1 className="display pulse-hero__title">Pulse</h1>
        <p className="mono-xl pulse-hero__lede">
          The live cultural signal of We Are Young. A running feed of what moves brands, sport, and culture — read
          fast, read first, move as one.
        </p>
      </section>

      <Reveal kind="fade" className="pulse-issue">
        <Image
          src={issueImage.hero}
          alt=""
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover" }}
        />
        <span className="mono-xs pulse-issue__caption">
          Issue {ISSUE.number} — {ISSUE.title}
        </span>
      </Reveal>

      <div className="pulse-tags">
        <p className="sr-only">Pulse covers {TAGS.join(", ")}.</p>
        {/* Two copies so the loop closes on itself. */}
        {[0, 1].map((copy) => (
          <div className="pulse-tags__track" key={copy} aria-hidden="true">
            {TAGS.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ))}
      </div>

      <section className="section tone-dark">
        <header className="row-between pulse-feed__head">
          <span className="eyebrow">Live signals</span>
          <span className="mono-xs muted">Updated hourly</span>
        </header>

        <ol className="pulse-feed">
          {SIGNALS.map((signal, i) => (
            <Reveal as="li" kind="up" delay={i * 60} key={signal.title} className="pulse-signal">
              <span className="pulse-signal__tag">
                <span className="mono-xs muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="mono-xs accent">{signal.tag}</span>
              </span>
              <h2 className="display pulse-signal__title">{signal.title}</h2>
              <span className="mono-xs muted pulse-signal__meta">
                {signal.city} — {signal.age}
              </span>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section tone-dark">
        <header className="row-between pulse-feed__head">
          <h2 className="display d3">What we do with it</h2>
          <span className="mono-xs muted">Advisory</span>
        </header>

        <div className="pulse-advisory">
          {ADVISORY.map((item, i) => (
            <Reveal kind="up" delay={i * 80} key={item.label} className="pulse-advisory__item">
              <span className="mono-xs accent">{item.label}</span>
              <p className="mono-l pulse-advisory__line">{item.line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/*
       * The "technical" data section from the brief on `presaddidas`, moved
       * here from the adidas-pulse case on request — bottom of the page,
       * right before the global footer. Adidas is the example; getBrandStats
       * in lib/projects.ts works for any client with enough of a history.
       */}
      <CollabStats client="adidas" />
    </>
  );
}
