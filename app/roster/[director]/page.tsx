import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { DIRECTORS, DIRECTOR_BY_SLUG, disciplinesOf, projectsOf } from "@/lib/directors";
import "../../pages.css";
import "@/components/roster/roster.css";

export function generateStaticParams() {
  return DIRECTORS.map((d) => ({ director: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ director: string }>;
}): Promise<Metadata> {
  const { director } = await params;
  const d = DIRECTOR_BY_SLUG.get(director);
  if (!d) return {};
  return { title: d.name, description: d.bio.slice(0, 160) };
}

export default async function DirectorPage({
  params,
}: {
  params: Promise<{ director: string }>;
}) {
  const { director } = await params;
  const d = DIRECTOR_BY_SLUG.get(director);
  if (!d) notFound();

  const works = projectsOf(d);
  const disciplines = disciplinesOf(d);

  return (
    <div className="tone-dark dir">
      <div className="gridlines" />

      {/* Left rail holds still while the work scrolls past it. */}
      <aside className="dir__side">
        <Link href="/roster" className="mono-xs muted dir__back">
          ← Roster
        </Link>

        <h1 className="mono dir__name">{d.name}</h1>
        <p className="mono-xs muted dir__role">{d.role}</p>

        <p className="mono dir__bio">{d.bio}</p>

        {disciplines.length > 0 && (
          <div className="dir__block">
            <h2 className="mono-xs muted">Disciplines</h2>
            <ul className="mono">
              {disciplines.map((t) => (
                <li key={t}>— {t}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="dir__block">
          <h2 className="mono-xs muted">Selected work</h2>
          <p className="mono">
            {String(works.length).padStart(2, "0")} projects
            {works.length > 0 && ` · ${works[works.length - 1].year}–${works[0].year}`}
          </p>
        </div>

      </aside>

      <div className="dir__work">
        {works.map((p, i) => (
          <Reveal as="article" kind="up" delay={(i % 2) * 120} key={p.slug} className="work">
            <Link href={`/projects/${p.slug}`} className="work__link" data-cursor="View">
              <figure className="work__media">
                <Image
                  src={p.cover}
                  alt={p.name}
                  fill
                  sizes="(min-width: 900px) 32vw, 92vw"
                  loading={i < 2 ? "eager" : "lazy"}
                  style={{ objectFit: "cover" }}
                />
              </figure>
              <div className="work__caption mono">
                <span className="work__client">{p.client.toUpperCase()}</span>
                <span className="muted">{p.name}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
