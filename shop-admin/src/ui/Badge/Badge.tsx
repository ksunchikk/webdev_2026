import type { ReactNode } from "react";
import { genStyle } from "../genStyle";

import styles from "./Badge.module.css";

export type BadgeTone = "default" | "success" | "warning" | "error";

type BadgeProps = {
  tone?: BadgeTone;
  children?: ReactNode;
};

export function Badge({ tone = "default", children }: BadgeProps) {
  return (
    <span className={genStyle(styles.badge, styles[tone])}>{children}</span>
  );
}
