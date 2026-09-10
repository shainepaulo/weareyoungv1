"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Videos from the studio folder, played inside the letterforms. */
const CLIP_A = "/videos/adidas.mp4";
const CLIP_B = "/videos/oakley.mp4";

/** Timeline, in ms. Everything is anchored to these four numbers. */
const SWAP_AT = 1350; // hand off from the first clip to the second
const FADE_AT = 2400; // start fading to the site
const FADE_MS = 380; // must match the transition in globals.css
const TOTAL = FADE_AT + FADE_MS;

type State = "playing" | "leaving" | "gone";

/**
 * Full-screen intro: the two studio clips play inside the WAY logo, which is
 * used as a mask so only the letters are ever painted. Hard glitch on entry,
 * slow zoom throughout, quick fade to the site.
 *
 * The timeline runs on its own clock and never waits on the videos. If a clip
 * has not buffered we simply keep showing the other one — a preloader that
 * stalls waiting for a preloader would be a poor trade.
 */
export function Preloader() {
  const [state, setState] = useState<State>("playing");
  const [clip, setClip] = useState<"a" | "b">("a");
  const clipB = useRef<HTMLVideoElement>(null);

  const dismiss = useCallback(() => {
    setState((current) => (current === "playing" ? "leaving" : current));
  }, []);

  // Hold the page still while the intro plays, and hand scrolling back at a
  // known-good position once it is gone.
  useEffect(() => {
    if (state === "gone") return;

    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previous;
    };
  }, [state]);

  useEffect(() => {
    if (state !== "playing") return;

    const timers = [
      // Only swap if the second clip actually has frames to show.
      window.setTimeout(() => {
        const video = clipB.current;
        if (video && video.readyState >= 2) setClip("b");
      }, SWAP_AT),
      window.setTimeout(dismiss, FADE_AT),
    ];

    return () => timers.forEach(clearTimeout);
  }, [state, dismiss]);

  useEffect(() => {
    if (state !== "leaving") return;

    const timer = window.setTimeout(() => {
      window.scrollTo(0, 0);
      setState("gone");
    }, FADE_MS);

    return () => clearTimeout(timer);
  }, [state]);

  // Let people out early — clicking or hitting a key skips straight to the site.
  useEffect(() => {
    if (state === "gone") return;

    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [state, dismiss]);

  // Removed from the tree entirely, so nothing is left to intercept a click.
  if (state === "gone") return null;

  return (
    <div
      className="preloader"
      data-state={state}
      role="presentation"
      aria-hidden="true"
      onClick={dismiss}
      style={{ ["--preloader-total" as string]: `${TOTAL}ms` }}
    >
      <div className="preloader__glitch">
        <div className="preloader__mask">
          <video
            className="preloader__video"
            data-visible={clip === "a"}
            src={CLIP_A}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <video
            ref={clipB}
            className="preloader__video"
            data-visible={clip === "b"}
            src={CLIP_B}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="preloader__ghost preloader__ghost--cyan" />
          <div className="preloader__ghost preloader__ghost--red" />
        </div>
      </div>

      <div className="preloader__scan" />
      <div className="preloader__bar" />
    </div>
  );
}
