"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTENT } from "@/lib/media";

interface Thumb {
  id: number;
  x: number;
  y: number;
  index: number;
  tilt: number;
}

const SPAWN_DISTANCE = 180;
const LIFETIME_MS = 1400;
const MAX_LIVE = 6;

export function MouseDiscovery() {
  const [thumbs, setThumbs] = useState<Thumb[]>([]);
  const idRef = useRef(0);
  const cursorRef = useRef<{ x: number; y: number } | null>(null);

  const spawn = useCallback((x: number, y: number) => {
    const last = cursorRef.current;
    if (last && Math.hypot(x - last.x, y - last.y) < SPAWN_DISTANCE) return;
    cursorRef.current = { x, y };

    const id = idRef.current++;
    setThumbs((prev) => [
      ...prev.slice(-(MAX_LIVE - 1)),
      { id, x, y, index: id % CONTENT.length, tilt: (id % 5) - 2 },
    ]);
    window.setTimeout(() => {
      setThumbs((prev) => prev.filter((t) => t.id !== id));
    }, LIFETIME_MS);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => spawn(e.clientX, e.clientY),
    [spawn]
  );

  return (
    <div className="absolute inset-0 z-0" onPointerMove={onPointerMove}>
      <AnimatePresence>
        {thumbs.map((t) => {
          const media = CONTENT[t.index];
          return (
            <motion.div
              key={t.id}
              className="absolute w-[220rem] overflow-hidden lg:w-[300rem]"
              style={{ left: t.x, top: t.y, x: "-50%", y: "-50%" }}
              initial={{ opacity: 0, scale: 0.82, rotate: t.tilt }}
              animate={{ opacity: 1, scale: 1, rotate: t.tilt }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.6 }}
            >
              {media.type === "video" ? (
                <video
                  className="aspect-video w-full object-cover"
                  src={media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="aspect-video w-full object-cover" src={media.src} alt="" />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
