"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useTransform } from "framer-motion";
import { ArrowGlyph, WayLogo } from "./WayLogo";
import { MouseDiscovery } from "./MouseDiscovery";
import { useSectionProgress } from "@/hooks/useSectionProgress";

const SHORT_DESC =
  "WAY TV is born from the idea of blurring the line between creation and production, aiming to restore the value of content.";

interface Morph {
  x: number;
  y: number;
  scale: number;
}

export function Hero({ interactive }: { interactive: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [morph, setMorph] = useState<Morph>({ x: 0, y: 0, scale: 1 });
  const [modalOpen, setModalOpen] = useState(false);

  // Measured while the title is still untransformed, so the deltas stay exact.
  useLayoutEffect(() => {
    const measure = () => {
      const word = wordRef.current;
      const slot = slotRef.current;
      if (!word || !slot) return;
      const wr = word.getBoundingClientRect();
      const sr = slot.getBoundingClientRect();
      if (!wr.width || !sr.width) return;
      setMorph({
        x: sr.left + sr.width / 2 - (wr.left + wr.width / 2),
        y: sr.top + sr.height / 2 - (wr.top + wr.height / 2),
        scale: sr.width / wr.width,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scrollYProgress = useSectionProgress(heroRef);

  const x = useTransform(scrollYProgress, [0, 0.8], [0, morph.x]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, morph.y]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, morph.scale]);
  const wordOpacity = useTransform(scrollYProgress, [0.62, 0.78], [1, 0]);
  const logoOpacity = useTransform(scrollYProgress, [0.66, 0.82], [0, 1]);
  const uiOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  // Entry fades live on an inner wrapper: sharing `opacity` with a scroll-driven
  // MotionValue on the same element makes the two writers fight.
  const fadeIn = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: interactive ? 1 : 0 },
    transition: { duration: 0.9, delay, ease: "easeOut" as const },
  });

  return (
    <section ref={heroRef} className="relative h-[220svh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
        {interactive && <MouseDiscovery />}

        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col p-[20rem] text-red">
          <motion.div
            className="flex items-start justify-between gap-[16rem]"
            style={{ opacity: uiOpacity }}
          >
            <div className="flex-1">
              <motion.div {...fadeIn(0.15)}>
                <p>
                  Creative Studio for
                  <br />
                  ambitious visual projects
                </p>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="pointer-events-auto mt-[0.8em] underline lg:hidden"
                >
                  View More
                </button>
              </motion.div>
            </div>

            <div className="flex justify-end lg:flex-1 lg:justify-center">
              <motion.div
                ref={slotRef}
                className="w-[80rem] lg:w-[66rem]"
                style={{ opacity: logoOpacity }}
              >
                <WayLogo className="h-auto w-full" />
              </motion.div>
            </div>

            <div className="hidden flex-1 justify-end lg:flex">
              <motion.div className="flex flex-col items-end text-right" {...fadeIn(0.25)}>
                <p className="max-w-[254rem]">{SHORT_DESC}</p>
                <div className="mt-[0.8em]">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="pointer-events-auto underline"
                  >
                    View More
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="mt-auto flex flex-col gap-[14rem] lg:flex-row lg:items-end lg:justify-between lg:gap-[20rem]">
            <div className="flex w-full justify-center lg:order-2 lg:flex-1 lg:px-[16rem]">
              <motion.h1
                ref={wordRef}
                className="type-hero text-center"
                style={{ x, y, scale, opacity: wordOpacity }}
              >
                WAY.TV
              </motion.h1>
            </div>

            <div className="flex w-full flex-col gap-[8rem] lg:contents">
              <motion.ul
                className="flex items-center gap-[22rem] lg:order-1 lg:flex-1"
                style={{ opacity: uiOpacity }}
              >
                <li>
                  <a
                    className="pointer-events-auto hover:underline"
                    href="https://vimeo.com/waytv"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vimeo
                  </a>
                </li>
                <li>
                  <a
                    className="pointer-events-auto hover:underline"
                    href="https://www.instagram.com/waytv.paris/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </motion.ul>

              <motion.div
                className="flex lg:order-3 lg:flex-1 lg:justify-end lg:text-right"
                style={{ opacity: uiOpacity }}
              >
                <a
                  className="pointer-events-auto flex items-center gap-[10rem] hover:underline"
                  href="mailto:hello@waytv.paris"
                >
                  <ArrowGlyph className="h-auto w-[10rem]" />
                  <span>hello@waytv.paris</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {modalOpen && (
            <motion.div
              className="absolute inset-0 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                type="button"
                aria-label="Close"
                className="absolute inset-0 h-full w-full cursor-default bg-ink/90"
                onClick={closeModal}
              />
              <div className="relative flex h-full flex-col items-center justify-center gap-[28rem] p-[20rem] text-center text-red">
                <WayLogo className="h-auto w-[80rem] lg:w-[66rem]" />
                <div
                  className="w-full max-w-[1000rem]"
                  style={{ fontSize: "clamp(14px, 26rem, 30px)", letterSpacing: "-1rem" }}
                >
                  <p>
                    WAY TV is born from the idea of blurring the line between creation and
                    production, aiming to restore the value of content. It&rsquo;s all about quality
                    over quantity.
                    <br />
                    <br />
                    Driving our vision from the Paris-based office, WAY TV teams up with world-class
                    talent from around the globe. Our partners include filmmakers, photographers,
                    editors, motion designers, and others.
                  </p>
                  <div className="mt-[1em]">
                    <button type="button" onClick={closeModal} className="underline">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
