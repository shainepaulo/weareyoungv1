export interface MediaItem {
  src: string;
  type: "image" | "video";
}

const VIDEO_IDS = new Set([2, 5, 8, 11, 13, 14, 18, 26, 27, 29, 35]);

export const CONTENT: MediaItem[] = Array.from({ length: 35 }, (_, i) => {
  const id = i + 1;
  const isVideo = VIDEO_IDS.has(id);
  return {
    src: `/content/${id}.${isVideo ? "mp4" : "webp"}`,
    type: isVideo ? "video" : "image",
  };
});

export const STILLS = CONTENT.filter((m) => m.type === "image");
export const CLIPS = CONTENT.filter((m) => m.type === "video");

/**
 * Geometry of /title-mask.svg (viewBox 0 0 772.3 161.5). The "." is the square
 * path from (469.1,127.2) to (503.4,161.5) — its centre is the exact point the
 * loader zoom flies through.
 */
export const TITLE_MASK = {
  aspect: 772.3 / 161.5,
  dotX: 486.25 / 772.3,
  dotY: 144.35 / 161.5,
  /** mask-size from the studio's own CSS: 80% mobile, 60% from 1024px up. */
  sizeMobile: 0.8,
  sizeDesktop: 0.6,
};
