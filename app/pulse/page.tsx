import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECT_LIST } from "@/lib/projects";
import "../pages.css";

export const metadata: Metadata = {
  title: "Pulse",
  description:
    "The live cultural signal of We Are Young. A running feed of what moves brands, sport, and culture — read fast, read first, move your own way.",
};

/**
 * The beats Pulse covers, each one pointing at the case that proves we work
 * on it. Naming a beat and going nowhere is a claim; naming it and landing on
 * the work is evidence.
 */
const TAGS = [
  { name: "Fashion", slug: "premiere-vision" },
  { name: "Subculture", slug: "reebok-lahaine" },
  { name: "Basketball", slug: "quai-54" },
  { name: "Music", slug: "radar" },
  { name: "Sneakers", slug: "courir-40ans" },
  { name: "Football", slug: "adidas-tango-league" },
  { name: "Nightlife", slug: "radar-red-house" },
  { name: "Skate", slug: "vans-weatherized" },
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
  // The plate leads on the work, not on stock imagery. The overhead dunk shot
  // (the previous pick) put the court's own branding — painted to be read
  // from the opposite baseline — upside down and front and centre once it
  // filled the frame. This one is a contested jump shot: two players, a
  // scoreboard, no text fighting the crop at any angle.
  const quai = PROJECT_LIST.find((p) => p.slug === "quai-54");
  const issueImage =
    quai?.gallery.find((g) => g.includes("quai54-jordan-3")) ?? quai?.hero ?? PROJECT_LIST[0].hero;

  return (
    <>
      <section className="section tone-dark pulse-hero">
        <span className="mono-xs accent">Our way to read</span>
        <h1 className="display pulse-hero__title">
          Pulse
          <span className="blink" aria-hidden="true">
            _
          </span>
        </h1>
        <p className="mono-xl pulse-hero__lede">
          The live cultural signal of We Are Young. A running feed of what moves brands, sport, and culture — read
          fast, read first, move your own way.
        </p>
      </section>

      <Reveal kind="fade" className="pulse-issue">
        <Image
          src={issueImage}
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

      <nav className="pulse-tags" aria-label="Pulse beats">
        {/* Two copies so the loop closes on itself. The second is a duplicate
            of the first, so it is hidden from assistive tech and taken out of
            the tab order rather than announced and focused twice. */}
        {[0, 1].map((copy) => (
          <div
            className="pulse-tags__track"
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {TAGS.map((tag) => (
              <Link
                href={`/projects/${tag.slug}`}
                key={tag.name}
                className="pulse-tags__tag"
                tabIndex={copy === 1 ? -1 : undefined}
                data-cursor="See"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        ))}
      </nav>

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
    </>
  );
}
