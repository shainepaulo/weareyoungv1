import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { Vimeo } from "@/components/project/Vimeo";
import { asidesFor } from "@/lib/block-asides";
import { BY_SLUG, PROJECT_LIST } from "@/lib/projects";
import { fitFontSize, longestTokenWidth } from "@/lib/type-metrics";
import "@/components/project/project.css";

export function generateStaticParams() {
  return PROJECT_LIST.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = BY_SLUG.get(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.client}`,
    description: p.intro.slice(0, 160),
    openGraph: { images: [{ url: p.hero }] },
  };
}

const pad = (n: number) => String(n).padStart(3, "0");

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = BY_SLUG.get(slug);
  if (!p) notFound();

  const prev = p.prev ? BY_SLUG.get(p.prev) : null;
  const next = p.next ? BY_SLUG.get(p.next) : null;

  // Nothing the project has should fall off the page: whatever is not shown
  // beside a word is collected underneath instead of being repeated there.
  const beside = new Set(p.blocks.flatMap((_, i) => asidesFor(p.slug, i)));
  const rest = p.gallery.filter((src) => !beside.has(src));

  return (
    <article className="case">
      <header className="case__hero tone-dark">
        <Image src={p.hero} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        <div className="case__shade" />
        <div className="gridlines" />

        <div className="case__hero-body">
          <Reveal as="span" kind="fade" className="eyebrow">
            Case {pad(p.index)} / {pad(PROJECT_LIST.length)}
          </Reveal>
          {/* Sized to its own longest word: Druk Wide is wide enough that
              TOUTÂNKHAMON or BEACHPARTY run off the page at the display size. */}
          <Reveal
            as="h1"
            kind="none"
            className="display case__title"
            style={{ "--fit": fitFontSize(p.name) } as CSSProperties}
          >
            <SplitWords text={p.name} />
            <span className="blink" aria-hidden="true">_</span>
          </Reveal>
          <Reveal as="dl" kind="up" delay={300} className="case__meta mono-s">
            <div>
              <dt>Client</dt>
              <dd>{p.client}</dd>
            </div>
            <div>
              <dt>Typology</dt>
              <dd>{p.typology || p.types.join(", ")}</dd>
            </div>
            {p.year && (
              <div>
                <dt>Year</dt>
                <dd>{p.year}</dd>
              </div>
            )}
          </Reveal>
        </div>
      </header>

      <section className="section tone-light case__intro">
        <div className="gridlines" />
        <Reveal as="p" kind="up" className="mono-xl measure">
          {p.intro}
        </Reveal>
        {p.types.length > 0 && (
          <Reveal as="ul" kind="up" delay={150} className="case__types mono-xs">
            {p.types.map((t) => (
              <li key={t}>
                <span className="dot" /> {t}
              </li>
            ))}
          </Reveal>
        )}
      </section>

      {p.videos.map((id, i) => (
        <section className="section section--flush tone-dark case__video" key={id}>
          <Reveal kind="clip">
            <Vimeo id={id} poster={i === 0 ? p.hero : (p.blocks[i]?.image ?? p.hero)} title={`${p.name} — film ${i + 1}`} />
          </Reveal>
        </section>
      ))}

      {p.blocks.length > 0 && (
        <section className="section tone-dark case__blocks">
          <div className="gridlines" />
          {p.blocks.map((b, i) => {
            // Frames showing what the word names — see lib/block-asides.ts.
            const asides = asidesFor(p.slug, i);

            return (
              <div className={`block block--${b.side}`} key={`${b.image}-${i}`}>
                <Reveal kind="wipe" className="block__media">
                  <Image src={b.image!} alt={b.caption} fill sizes="(min-width: 768px) 62vw, 100vw" style={{ objectFit: "cover" }} />
                </Reveal>

                {asides.length > 0 && (
                  <Reveal kind="fade" className="block__asides" data-count={asides.length}>
                    {asides.map((src) => (
                      <span className="block__aside" key={src}>
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 62vw, 100vw"
                          style={{ objectFit: "cover" }}
                        />
                      </span>
                    ))}
                  </Reveal>
                )}

                <div className="block__side">
                  <Reveal kind="up" delay={200} className="block__caption">
                    <span className="mono-xs accent">{String(i + 1).padStart(2, "0")}</span>
                    {/* Druk Wide is wide enough that SCENOGRAPHY overruns the
                        slot left beside the frames; the stylesheet divides the
                        slot by this to find a size that fits. */}
                    <h2
                      className="display d3 block__word"
                      style={{ "--word-em": longestTokenWidth(b.caption) } as CSSProperties}
                    >
                      {b.caption}
                    </h2>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Everything the project has that is not already standing beside a
          word. The old gallery printed the lot a second time, which meant
          scrolling past the same frames without their captions; this shows
          only what would otherwise be missing from the page. */}
      {rest.length > 0 && (
        <section className="section section--tight tone-dark case__gallery">
          <ul className="gallery">
            {rest.map((src, i) => (
              <Reveal as="li" kind="up" delay={(i % 2) * 120} key={src} className="gallery__item">
                <Image src={src} alt="" fill sizes="(min-width: 768px) 48vw, 100vw" style={{ objectFit: "cover" }} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <nav className="case__nav tone-light" aria-label="More projects">
        <div className="gridlines" />
        {prev && (
          <Link href={`/projects/${prev.slug}`} className="case__nav-link case__nav-link--prev" data-cursor="Prev">
            <span className="mono-xs muted">← Previous</span>
            <span className="display d3">{prev.name}</span>
          </Link>
        )}
        <Link href="/roster#work" className="case__nav-all mono-xs">
          All projects <span className="blink">_</span>
        </Link>
        {next && (
          <Link href={`/projects/${next.slug}`} className="case__nav-link case__nav-link--next" data-cursor="Next">
            <span className="mono-xs muted">Next →</span>
            <span className="display d3">{next.name}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
