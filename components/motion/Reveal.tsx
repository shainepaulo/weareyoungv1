"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Kind = "up" | "fade" | "clip" | "wipe" | "none";

/**
 * Adds `.is-in` once the element is on screen. The choreography itself lives
 * in CSS (`[data-reveal]`, `.words`), so this stays a 20-line observer rather
 * than an animation library.
 */
export function Reveal({
  as: Tag = "div",
  kind = "up",
  delay = 0,
  once = true,
  margin = "-10% 0px",
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  kind?: Kind;
  delay?: number;
  once?: boolean;
  margin?: string;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-in");
          if (once) observer.disconnect();
        } else if (!once) {
          node.classList.remove("is-in");
        }
      },
      { rootMargin: margin, threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, margin]);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={kind === "none" ? undefined : kind}
      style={delay ? ({ "--delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
