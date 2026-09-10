import type { CSSProperties } from "react";

/**
 * The stacked mark (W over ∀Y). We only have it as a bitmap, so instead of an
 * <img> locked to one colour it is painted through its own alpha mask in
 * currentColor — recolourable, crisp at any size, and the same asset the
 * intro cuts its video through.
 */
export function Mark({
  className,
  style,
  label = "WAY",
}: {
  className?: string;
  style?: CSSProperties;
  label?: string;
}) {
  return (
    <span
      className={`mark ${className ?? ""}`}
      style={style}
      role="img"
      aria-label={label}
    />
  );
}
