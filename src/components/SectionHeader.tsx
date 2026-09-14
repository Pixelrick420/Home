import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useScrollFade } from "../hooks/useScrollFade";
import { duration, ease, offset } from "../constants";

interface Props {
  sectionNumber: number;
  title: string;
  threshold?: number;
  children: ReactNode;
}

export default function SectionHeader({ sectionNumber, title, threshold, children }: Props) {
  const [ref, visible] = useScrollFade<HTMLDivElement>({ threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset.y }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : offset.y }}
      transition={{ duration: duration.slow, ease }}
      className="mb-16"
    >
      <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-accent-hover">
        {`${String(sectionNumber).padStart(2, "0")} - ${title}`}
      </span>
      <h2 className="font-serif text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl lg:text-7xl">
        {children}
      </h2>
    </motion.div>
  );
}
