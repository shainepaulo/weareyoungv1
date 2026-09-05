"use client";

import { motion } from "framer-motion";
import { WayLogo } from "./WayLogo";
import { LazyVideo } from "./LazyVideo";

export interface CaseStudy {
  index: string;
  brand: string;
  title: string;
  credits: { label: string; value: string }[];
  videoSrc: string;
}

export function SlidwaayBlock({ index, brand, title, credits, videoSrc }: CaseStudy) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <LazyVideo className="absolute inset-0 h-full w-full object-cover" src={videoSrc} />
      <div className="absolute inset-0 bg-ink/45" />

      <div className="pointer-events-none absolute inset-0 grid grid-cols-4">
        <div className="border-r border-bone/15" />
        <div className="border-r border-bone/15" />
        <div className="border-r border-bone/15" />
      </div>

      <div className="absolute inset-0 flex flex-col p-[20rem] text-bone">
        <div className="flex items-start justify-between">
          <span className="flex items-center gap-[10rem]">
            <span className="inline-block rounded-full bg-red" style={{ width: "8rem", height: "8rem" }} />
            {index}
          </span>
          <span>{title}</span>
        </div>

        <div className="relative mt-auto mb-auto flex flex-col gap-[24rem] lg:block">
          <motion.h2
            className="type-case w-full text-center mix-blend-difference"
            initial={{ opacity: 0, y: "0.1em" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {brand}
          </motion.h2>

          <motion.dl
            className="flex w-full flex-col gap-[10rem] lg:absolute lg:right-0 lg:bottom-0 lg:w-[240rem]"
            initial={{ opacity: 0, x: "0.6em" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {credits.map((c) => (
              <div key={c.label} className="border-t border-bone/25 pt-[8rem]">
                <dt className="text-bone/60">{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="flex items-end justify-end">
          <WayLogo className="h-auto w-[66rem] text-bone mix-blend-difference" />
        </div>
      </div>
    </section>
  );
}
