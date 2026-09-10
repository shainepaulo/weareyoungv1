"use client";

import { useState } from "react";
import type { FeaturedSlide } from "@/lib/way-data";
import { Arrow } from "./Arrow";
import { scrollToTarget } from "./scrollTo";

/**
 * Distance from the hovered entry decides the type size: the theme steps the
 * scale down through `.current` and `.inter1`…`.inter5` on either side.
 */
function stepClass(index: number, active: number) {
  const distance = Math.abs(index - active);
  if (distance === 0) return "current";
  if (distance <= 5) return `inter${distance}`;
  return "";
}

export function FeaturedSlider({ items }: { items: FeaturedSlide[] }) {
  const [active, setActive] = useState(0);

  return (
    <div id="slider">
      <div className="scrollTool">
        <div className="table">
          <div className="cell">
            <div className="in">
              {items.map((item, index) => (
                <a
                  key={item.id}
                  className={`element ${stepClass(index, active)}`}
                  href={item.href}
                  data-id={item.id}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <div className="number">{item.number}</div>
                  <div className="titre">{item.title}</div>
                </a>
              ))}

              <a
                className="arrow noAjax scrollTo"
                href="#filters"
                onClick={scrollToTarget}
                aria-label="Skip to all projects"
              >
                <Arrow className="svg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="slide">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`element ${index === active ? "active" : ""}`}
            data-id={item.id}
            style={{
              background: `url(${item.image}) no-repeat center`,
              backgroundSize: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
}
