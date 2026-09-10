"use client";

import { useState } from "react";
import type { FeaturedSlide } from "@/lib/way-data";
import { Arrow } from "./Arrow";
import { scrollToTarget } from "./scrollTo";

/**
 * Mobile counterpart of <FeaturedSlider />. The original drives this with
 * slick; we keep slick's DOM shape (`.slick-list` / `.slick-track` /
 * `.slick-slide`) so the vendored CSS still applies, and move the track
 * ourselves — one transform instead of a carousel library.
 */
export function ResponsiveSlider({ items }: { items: FeaturedSlide[] }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((current) => (current + 1) % items.length);

  return (
    <div id="sliderResponsive">
      {/* Stays a div: the theme hides every <button> inside this slider, because
          slick draws its own arrow buttons and the theme wants this one instead. */}
      <div
        className="next"
        role="button"
        tabIndex={0}
        aria-label="Next project"
        onClick={next}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          next();
        }}
      >
        <Arrow className="svg" />
      </div>

      <a
        className="arrow noAjax scrollTo"
        href="#filters"
        onClick={scrollToTarget}
      >
        All Projects <br />
        <Arrow className="svg" />
      </a>

      <div className="slide">
        <div className="slick-slider">
          <div className="slick-list">
            <div
              className="slick-track"
              style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
            >
              {items.map((item) => (
                <div className="slick-slide" key={item.id}>
                  <div
                    className="element"
                    data-id={item.id}
                    style={{
                      background: `url(${item.image}) no-repeat center`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="table">
                      <div className="cell">
                        <div className="title">
                          <span className="number">{item.number}</span> {item.title}
                        </div>
                        <br />
                        <a href={item.href} className="button">
                          View project
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
