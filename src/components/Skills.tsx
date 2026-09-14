import { useScrollFade } from "../hooks/useScrollFade";
import { skills } from "../data/skills";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import { duration, ease, offset, stagger } from "../constants";
import type { SectionProps } from "../lib/sections";

export default function Skills({ sectionNumber, title }: SectionProps) {
  const [gridRef, gridVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.04,
  });

  return (
    <Section id="skills">
      <SectionHeader sectionNumber={sectionNumber} title={title}>
        My <span className="text-accent">Toolkit</span>
      </SectionHeader>

      <motion.div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: gridVisible ? 1 : 0 }}
        transition={{ duration: duration.medium }}
        className="grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: offset.y }}
            animate={{
              opacity: gridVisible ? 1 : 0,
              y: gridVisible ? 0 : offset.y,
            }}
            transition={{
              duration: duration.medium,
              delay: i * stagger,
              ease,
            }}
            className="card-hover flex flex-col rounded-card border border-border bg-bg-card px-3 py-5"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-5 w-1 shrink-0 rounded-bar bg-accent" />
              <p className="m-0 font-sans text-meta font-semibold uppercase tracking-[0.18em] text-text-muted">
                {group.category}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-sans text-md-plus font-medium leading-none text-text"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
