import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/useTheme";
import { useScrollFade } from "../hooks/useScrollFade";
import { duration, ease, offset } from "../constants";

interface Props {
  label: string;
  threshold?: number;
  children: ReactNode;
}

export default function SectionHeader({ label, threshold, children }: Props) {
  const { t } = useTheme();
  const [ref, visible] = useScrollFade<HTMLDivElement>({ threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset.y }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : offset.y }}
      transition={{ duration: duration.slow, ease }}
      className="section-header"
    >
      <span className="section-label" style={{ color: t.accentHover }}>
        {label}
      </span>
      <h2 className="section-title">{children}</h2>
    </motion.div>
  );
}
