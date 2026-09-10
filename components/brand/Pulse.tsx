/**
 * The pulse mark — a cardio trace, drawn in currentColor so it inherits the
 * nav's difference blend like the wordmark does.
 */
export function Pulse({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 40"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 24 H25 L32 13 L40 31 L50 5 L58 35 L66 17 L72 24 H97" />
    </svg>
  );
}
