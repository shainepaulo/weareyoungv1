"use client";

import type { ReactNode } from "react";
import { scrollToTarget } from "./scrollTo";

/** The theme's `.scrollTo` anchor, for use from server components. */
export function ScrollLink({
  href,
  id,
  className,
  children,
}: {
  href: string;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} id={id} className={className} onClick={scrollToTarget}>
      {children}
    </a>
  );
}
