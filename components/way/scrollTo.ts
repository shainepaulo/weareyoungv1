import type { MouseEvent } from "react";

/**
 * The theme's `.scrollTo` anchors: jump to the target without pushing a hash.
 */
export function scrollToTarget(event: MouseEvent<HTMLAnchorElement>) {
  const hash = event.currentTarget.getAttribute("href");
  if (!hash?.startsWith("#")) return;

  const target = document.querySelector(hash);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
