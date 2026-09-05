"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TITLE_MASK } from "@/lib/media";

const HOLD_MS = 3400;
const ZOOM_MS = 2000;
const MAX_SCALE = 58;

function dotOrigin() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const size = w >= 1024 ? TITLE_MASK.sizeDesktop : TITLE_MASK.sizeMobile;
  const maskW = w * size;
  const maskH = maskW / TITLE_MASK.aspect;
  const x = (w - maskW) / 2 + TITLE_MASK.dotX * maskW;
  const y = (h - maskH) / 2 + TITLE_MASK.dotY * maskH;
  return `${(x / w) * 100}% ${(y / h) * 100}%`;
}

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [origin, setOrigin] = useState("57.8% 55%");
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    const measure = () => setOrigin(dotOrigin());
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const zoomAt = window.setTimeout(() => setZooming(true), HOLD_MS);
    const doneAt = window.setTimeout(onComplete, HOLD_MS + ZOOM_MS);
    return () => {
      window.clearTimeout(zoomAt);
      window.clearTimeout(doneAt);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-ink"
      animate={{ opacity: zooming ? [1, 1, 0] : 1 }}
      transition={{ duration: ZOOM_MS / 1000, times: [0, 0.75, 1], ease: "linear" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: origin, willChange: "transform, filter" }}
        animate={
          zooming
            ? { scale: MAX_SCALE, filter: ["blur(0px)", "blur(1.5px)", "blur(10px)"] }
            : { scale: 1, filter: "blur(0px)" }
        }
        transition={{
          duration: ZOOM_MS / 1000,
          ease: [0.5, 0, 0.3, 1],
          filter: { duration: ZOOM_MS / 1000, times: [0, 0.55, 1], ease: "easeIn" },
        }}
      >
        <motion.div
          className="title-mask absolute inset-0 flex items-center justify-center"
          style={{
            maskImage: "url(/title-mask.svg)",
            WebkitMaskImage: "url(/title-mask.svg)",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "var(--mask-size)",
            WebkitMaskSize: "var(--mask-size)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <video
            className="relative aspect-video w-[81%] object-cover lg:w-[61%]"
            src="/videos/loader.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[120rem] text-center text-bone lg:gap-[250rem]"
        style={{ fontSize: "12rem" }}
        animate={{ opacity: zooming ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.p
          initial={{ opacity: 0, y: "0.6em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Creative Studio
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: "0.6em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          For ambitious visual projects
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
