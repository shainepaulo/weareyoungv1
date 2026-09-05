"use client";

import { motion } from "framer-motion";

type Token = { word: string } | { dot: true };

const LINES: Token[][] = [
  [{ dot: true }, { word: "Creative" }],
  [{ word: "Studio" }, { dot: true }, { word: "For" }],
  [{ dot: true }, { word: "Ambitious" }],
  [{ word: "Visual" }, { dot: true }, { word: "Projects" }],
];

const COLUMNS = ["01", "02", "03", "04"];

export function PulseGrid() {
  return (
    <section className="relative w-full overflow-hidden bg-ink py-[80rem] text-red">
      <div className="pointer-events-none absolute inset-0 grid grid-cols-4">
        {COLUMNS.map((n, i) => (
          <div key={n} className="relative border-r border-red/20 last:border-r-0">
            {i > 0 && (
              <span className="absolute -top-[2rem] left-[10rem]" style={{ fontSize: "11rem" }}>
                {n}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="relative">
        {LINES.map((line, i) => (
          <motion.div
            key={i}
            className="flex flex-wrap items-center justify-center gap-[14rem] border-b border-red/20 px-[16rem] py-[8rem] last:border-b-0 lg:flex-nowrap lg:gap-[20rem] lg:py-[6rem]"
            initial={{ opacity: 0, y: "0.14em" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {line.map((token, j) =>
              "dot" in token ? (
                <span
                  key={j}
                  className="inline-block shrink-0 rounded-full bg-red"
                  style={{ width: "var(--pulse-dot)", height: "var(--pulse-dot)" }}
                />
              ) : (
                <span key={j} className="type-pulse">
                  {token.word}
                </span>
              )
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
