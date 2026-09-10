"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A Vimeo player that costs nothing until someone asks for it: the poster
 * and a play mark are all that render, the iframe arrives on click. Seventy
 * embeds across the cases would otherwise each pull the player on load.
 */
export function Vimeo({ id, poster, title }: { id: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="vimeo">
      {playing ? (
        <iframe
          className="vimeo__frame"
          src={`https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className="vimeo__poster" onClick={() => setPlaying(true)} data-cursor="Play" aria-label={`Play ${title}`}>
          <Image src={poster} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          <span className="vimeo__play display">
            Play<span className="blink">_</span>
          </span>
        </button>
      )}
    </div>
  );
}
