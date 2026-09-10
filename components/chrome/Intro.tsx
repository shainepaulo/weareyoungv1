"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/projects";

const CLIP_A = "/videos/adidas.mp4";
const CLIP_B = "/videos/oakley.mp4";

const SWAP_AT = 1400;
const LEAVE_AT = 2600;
const LEAVE_MS = 800; // matches .intro clip-path transition
const COUNT_MS = 2200;
const SESSION_KEY = "way:intro";

type State = "playing" | "leaving" | "gone";

/**
 * The intro, second generation. Same heart — the studio's clips inside the
 * mark — with the grid drawing in behind it, the claim typing itself out, a
 * counter, and an exit that lifts like a curtain instead of dissolving.
 *
 * Plays once per session: coming back to the home page from a case should
 * not cost three seconds. Click or key to skip.
 */
export function Intro() {
  // Rendered from the server as playing, so a first visit never sees the page
  // before the curtain. A repeat visit in the same session lifts it on the
  // first frame instead.
  const [state, setState] = useState<State>("playing");
  const [clip, setClip] = useState<"a" | "b">("a");
  const [count, setCount] = useState(0);
  const [typed, setTyped] = useState(0);
  const clipB = useRef<HTMLVideoElement>(null);

  const finish = useCallback(() => {
    document.documentElement.dataset.intro = "done";
    document.documentElement.dataset.lock = "";
    window.dispatchEvent(new Event("way:intro-done"));
    // Only a finished (or skipped) intro counts as seen — written here rather
    // than on mount, so a re-run of this effect cannot mistake itself for a
    // second visit.
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}

    if (!seen) {
      document.documentElement.dataset.lock = "1";
      return () => {
        document.documentElement.dataset.lock = "";
      };
    }

    // A timeout rather than a frame: a background tab gets no frames, and the
    // page behind must never stay locked because of that.
    const timer = window.setTimeout(() => {
      finish();
      setState("gone");
    }, 0);
    return () => clearTimeout(timer);
  }, [finish]);

  const leave = useCallback(() => {
    setState((s) => (s === "playing" ? "leaving" : s));
  }, []);

  useEffect(() => {
    if (state !== "playing") return;

    const start = performance.now();
    let frame = 0;
    const claim = SITE.claim;

    const tick = (now: number) => {
      const t = now - start;
      setCount(Math.min(100, Math.round((t / COUNT_MS) * 100)));
      setTyped(Math.min(claim.length, Math.floor(Math.max(0, t - 500) / 22)));
      if (t < LEAVE_AT) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const timers = [
      window.setTimeout(() => {
        const v = clipB.current;
        if (v && v.readyState >= 2) setClip("b");
      }, SWAP_AT),
      window.setTimeout(leave, LEAVE_AT),
    ];

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [state, leave]);

  useEffect(() => {
    if (state !== "leaving") return;
    finish();
    const t = window.setTimeout(() => setState("gone"), LEAVE_MS);
    return () => clearTimeout(t);
  }, [state, finish]);

  useEffect(() => {
    if (state !== "playing") return;
    window.addEventListener("keydown", leave);
    return () => window.removeEventListener("keydown", leave);
  }, [state, leave]);

  if (state === "gone") return null;

  return (
    <div className="intro" data-state={state} role="presentation" aria-hidden="true" onClick={leave}>
      <div className="intro__lines" />

      <div className="intro__glitch">
        <div className="intro__mask">
          <video className="intro__video" data-visible={clip === "a"} src={CLIP_A} autoPlay muted loop playsInline preload="auto" />
          <video ref={clipB} className="intro__video" data-visible={clip === "b"} src={CLIP_B} autoPlay muted loop playsInline preload="auto" />
          <div className="intro__ghost intro__ghost--a" />
          <div className="intro__ghost intro__ghost--b" />
        </div>
      </div>

      <div className="intro__corner mono">
        <span>{SITE.name}</span>
        <span>Paris — est. 15+ yrs</span>
      </div>

      <p className="intro__claim mono">
        {SITE.claim.slice(0, typed)}
        <span className="blink">_</span>
      </p>

      <div className="intro__counter">{String(count).padStart(3, "0")}</div>

      <div className="intro__scan" />
      <div className="intro__bar" />
    </div>
  );
}
