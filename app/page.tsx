"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/Loader";
import { Hero } from "@/components/Hero";
import { SlidwaayBlock, type CaseStudy } from "@/components/SlidwaayBlock";
import { PulseGrid } from "@/components/PulseGrid";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { ManifestoFooter } from "@/components/ManifestoFooter";

const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    brand: "Adidas",
    title: "Believe. It's time.",
    credits: [
      { label: "Format", value: "BTS — 16mm" },
      { label: "Cast", value: "Zidane, Pharrell, Dan Carter" },
      { label: "Client", value: "Adidas" },
    ],
    videoSrc: "/videos/adidas.mp4",
  },
  {
    index: "02",
    brand: "Oakley",
    title: "Vanguard",
    credits: [
      { label: "Director", value: "Maxime Elliès" },
      { label: "Cast", value: "Filippo Tenca" },
      { label: "Client", value: "Oakley × Oakley Meta" },
    ],
    videoSrc: "/videos/oakley.mp4",
  },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    document.body.style.overflow = "hidden";
  }, [loaded]);

  const onLoaderComplete = useCallback(() => {
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    // Scroll-linked ranges were measured while the body was locked; nudge Motion to re-read them.
    window.dispatchEvent(new Event("resize"));
    setLoaded(true);
  }, []);

  return (
    <main className="relative bg-ink">
      <Hero interactive={loaded} />
      {CASE_STUDIES.map((study) => (
        <SlidwaayBlock key={study.index} {...study} />
      ))}
      <PulseGrid />
      <InfiniteMarquee />
      <ManifestoFooter />

      <AnimatePresence>
        {!loaded && <Loader key="loader" onComplete={onLoaderComplete} />}
      </AnimatePresence>
    </main>
  );
}
