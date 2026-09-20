import { Reveal } from "@/components/motion/Reveal";
import { getBrandStats } from "@/lib/projects";
import "./collab-stats.css";

/**
 * The technical, data-first section requested for adidas-pulse: real counts
 * pulled from the project data, not narrative copy. Renders nothing if the
 * client has too thin a history to make a chart — one project isn't a trend.
 */
export function CollabStats({ client }: { client: string }) {
  const stats = getBrandStats(client);
  if (!stats || stats.projects < 2) return null;

  const top = stats.disciplines[0]?.count ?? 1;

  return (
    <section className="section tone-dark collab" aria-labelledby="collab-title">
      <div className="gridlines" />

      <header className="collab__head">
        <Reveal as="span" kind="fade" className="eyebrow">
          The relationship, in numbers
        </Reveal>
        <Reveal as="h2" kind="up" delay={80} id="collab-title" className="display d3">
          {stats.client} × We Are Young
        </Reveal>
      </header>

      <Reveal as="dl" kind="up" delay={140} className="collab__figures">
        <div>
          <dt className="display collab__number">{stats.projects}</dt>
          <dd className="mono-xs muted">Projects</dd>
        </div>
        <div>
          <dt className="display collab__number">
            {stats.yearTo - stats.yearFrom + 1}
          </dt>
          <dd className="mono-xs muted">
            Years — {stats.yearFrom}–{stats.yearTo}
          </dd>
        </div>
        <div>
          <dt className="display collab__number">{stats.videos}</dt>
          <dd className="mono-xs muted">Films</dd>
        </div>
        <div>
          <dt className="display collab__number">{stats.photos}</dt>
          <dd className="mono-xs muted">Photos</dd>
        </div>
      </Reveal>

      <Reveal as="ul" kind="up" delay={200} className="collab__bars mono-xs" aria-label="Projects by discipline">
        {stats.disciplines.map((d) => (
          <li key={d.label} className="collab__bar">
            <span className="collab__bar-label">{d.label}</span>
            <span className="collab__bar-track">
              <span className="collab__bar-fill" style={{ width: `${(d.count / top) * 100}%` }} />
            </span>
            <span className="collab__bar-count muted">{d.count}</span>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
