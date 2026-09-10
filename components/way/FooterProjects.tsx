"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function FooterProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // The theme toggles `.showIt` both ways — the logo and nav slide back out
    // when the footer leaves the viewport.
    const observer = new IntersectionObserver(([entry]) => setShown(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="footerProjects" ref={ref} className={shown ? "showIt" : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element -- 1KB bitmap mark, sized by the theme */}
      <img src="/way/img/logo-59.png" alt="WAY" className="logo" />

      <div className="nav">
        <Link href="/" className="txtHover">
          Projects<span className="blink">_</span>
        </Link>
        <a href="https://www.weareyoung-agency.com/agency/" className="txtHover">
          Agency
        </a>
      </div>
    </div>
  );
}
