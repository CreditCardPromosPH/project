"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function PromoImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className={styles.imageFallback} aria-hidden="true">BDO</div>;
  return (
    // Preserve the bank's original creative, including text near its edges.
    // eslint-disable-next-line @next/next/no-img-element
    <img className={styles.promoImage} src={src} alt="" width={684} height={278}
      loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} />
  );
}
