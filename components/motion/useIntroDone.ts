"use client";

import { useSyncExternalStore } from "react";

const EVENT = "way:intro-done";

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

const snapshot = () => document.documentElement.dataset.intro === "done";
const serverSnapshot = () => false;

/** True once the intro has lifted (or was skipped). Read from the document, so it survives remounts. */
export function useIntroDone() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
