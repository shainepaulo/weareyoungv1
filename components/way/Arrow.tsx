/**
 * img/flechebas.svg, inlined.
 *
 * The production theme ships this as `<img class="svg">` and main.js swaps in
 * the file's markup at runtime so the stylesheet can reach the shapes. We skip
 * the round trip and inline it directly; `.cls-1` lives in globals.css.
 */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 245 245"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M122.5,5a117.51,117.51,0,0,1,83.09,200.59A117.51,117.51,0,0,1,39.41,39.41,116.75,116.75,0,0,1,122.5,5m0-5A122.5,122.5,0,1,0,245,122.5,122.51,122.51,0,0,0,122.5,0Z" />
      <line className="cls-1" x1="122.5" y1="52" x2="122.5" y2="189" />
      <polyline className="cls-1" points="138.42 172.08 122.5 188 106.92 172.42" />
    </svg>
  );
}
