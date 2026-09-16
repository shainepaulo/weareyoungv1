import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { BriefForm } from "@/components/contact/BriefForm";
import { SITE } from "@/lib/projects";
import "../pages.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `${SITE.name} — ${SITE.address.join(", ")}. ${SITE.phone}. ${SITE.mail}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="section tone-dark page-hero contact">
        <div className="gridlines" />
        <span className="eyebrow">Contact</span>
        <h1 className="display d1">
          <SplitWords text="Say hi" hero />
          <span className="blink" aria-hidden="true">_</span>
        </h1>

        <div className="contact__grid">
          <div className="contact__col">
            <Reveal kind="up" delay={200} className="address address--card">
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
            </Reveal>

            <Reveal kind="up" delay={350} className="contact__actions">
              <a className="btn" href={`mailto:${SITE.mail}?subject=${encodeURIComponent("Let's go our own way")}`} data-cursor="Write">
                Write to us <span className="dot" />
              </a>
              <a className="btn btn--ghost" href={SITE.maps} target="_blank" rel="noreferrer">
                Open in Maps ↗
              </a>
              <a className="btn btn--ghost" href={SITE.studio.href} target="_blank" rel="noreferrer">
                Studio — {SITE.studio.label} ↗
              </a>
            </Reveal>
          </div>

          <Reveal kind="up" delay={300} className="brief brief--card">
            <h2 className="display d3">
              <SplitWords text="Brief" hero />
            </h2>
            <BriefForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
