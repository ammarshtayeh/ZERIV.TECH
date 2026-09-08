"use client";

import { useEffect, useState } from "react";

/** True below the desktop breakpoint (matches the CSS 900px switch). */
export function useNarrow(query = "(max-width: 900px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return narrow;
}
