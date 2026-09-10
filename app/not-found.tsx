import Link from "next/link";
import "./pages.css";

export default function NotFound() {
  return (
    <section className="section tone-dark page-hero">
      <div className="gridlines" />
      <span className="eyebrow">404</span>
      <h1 className="display d1">
        Lost your
        <br />
        WAY<span className="blink" aria-hidden="true">_</span>
      </h1>
      <p className="mono-l measure muted">This page went its own way. The projects are still where you left them.</p>
      <Link href="/" className="btn">
        Back to projects <span className="dot" />
      </Link>
    </section>
  );
}
