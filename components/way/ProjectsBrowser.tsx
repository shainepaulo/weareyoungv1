"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  FILTER_GROUPS,
  FILTER_LISTS,
  PROJECTS,
  type Project,
} from "@/lib/way-data";

/** mixitup's catch-all selector: every tile carries this class. */
const ALL = ".containerelement";

/**
 * One grid tile.
 *
 * Production writes all 61 covers into the initial markup. We hold each one
 * back until its tile is near the viewport, which is invisible on screen but
 * turns a 61-image burst into a trickle. The theme's own scroll reveal gives us
 * a second, tighter threshold to hang the fade on, so the two stay independent:
 * the image gets a head start, the reveal fires exactly where the original's
 * does.
 */
function ProjectTile({
  project,
  nvisible,
  delay,
}: {
  project: Project;
  nvisible: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  /** Close enough to be worth fetching the cover for. */
  const [loaded, setLoaded] = useState(false);
  /** Actually on screen — this is what drives the theme's fade-in. */
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const once = (rootMargin: string, done: () => void) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        done();
        observer.disconnect();
      }, { rootMargin });
      observer.observe(node);
      return observer;
    };

    const observers = [
      once("600px 0px", () => setLoaded(true)),
      once("0px", () => setRevealed(true)),
    ];

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "containerelement",
        "col-sm-4",
        `nvisible${nvisible}`,
        ...project.tags,
        "mix",
        "hiddenTransition",
        revealed ? "visible animated fadeIn" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ zIndex: project.zIndex, animationDelay: `${delay}s` }}
    >
      <a href={project.href} className="element">
        <div className="content">
          <div
            className="in"
            style={
              loaded
                ? {
                    background: `url(${project.image}) no-repeat center`,
                    backgroundSize: "cover",
                  }
                : undefined
            }
          >
            {/* display:none in the theme, so this second cover is never fetched.
                Kept because it is in the source markup. */}
            <div
              className="hover"
              style={
                loaded
                  ? {
                      background: `url(${project.hover}) no-repeat center #000`,
                      backgroundSize: "cover",
                    }
                  : undefined
              }
            />
          </div>
          <div className="title">
            {project.title} <span className="client">{project.client}</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export function ProjectsBrowser() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(ALL);
  /** Which sub-list the right-hand column shows; "All" opens none. */
  const [openList, setOpenList] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filter === ALL) return PROJECTS;
    const tag = filter.slice(1);
    return PROJECTS.filter((project) => project.tags.includes(tag));
  }, [filter]);

  return (
    <>
      <div id="filters" className={open ? "openIt" : undefined}>
        <div
          className="titre"
          role="button"
          tabIndex={0}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            setOpen((value) => !value);
          }}
        >
          <div className="txtHover">
            <span className="circle_pointer">
              <div className="more" /> Filters
            </span>
          </div>
        </div>

        <div className="content">
          <div className="left">
            <ul>
              {FILTER_GROUPS.map((group) => (
                <li
                  key={group.label}
                  data-filter={group.filter}
                  className={filter === group.filter ? "mixitup-control-active" : undefined}
                  onClick={() => {
                    setFilter(group.filter);
                    setOpenList(group.liste);
                  }}
                >
                  <span className="txtHover circle_pointer">{group.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="right">
            {Object.entries(FILTER_LISTS).map(([id, options]) => (
              <ul
                key={id}
                className={`liste liste${id}`}
                style={{ display: openList === id ? "block" : "none" }}
              >
                {options.map((option) => (
                  <li
                    key={option.filter}
                    data-filter={option.filter}
                    className={filter === option.filter ? "mixitup-control-active" : undefined}
                    onClick={() => setFilter(option.filter)}
                  >
                    <span className="txtHover circle_pointer">{option.label}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div id="listeProjects">
        <div className="liste">
          <div className="row">
            {visible.map((project, index) => (
              <ProjectTile
                key={project.href}
                project={project}
                /* The theme staggers every third tile vertically. */
                nvisible={(index % 3) + 1}
                delay={(index % 3) * 0.3}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
