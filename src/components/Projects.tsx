import { useState, useEffect } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import { motion } from "framer-motion";
import { duration, offset } from "../constants";
import type { SectionProps } from "../lib/sections";

function useColumns(): number {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
}

export default function Projects({ sectionNumber, title }: SectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(
    null,
  );
  const columns = useColumns();

  const [gridRef, gridVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.04,
  });

  const displayLimit = columns * 3;
  const displayedProjects = showAll
    ? projects
    : projects.slice(0, displayLimit);
  const hasMoreProjects = projects.length > displayLimit;

  return (
    <Section id="work">
      <SectionHeader sectionNumber={sectionNumber} title={title}>
        Things I've <span className="text-accent">Built</span>
      </SectionHeader>

      <motion.div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: gridVisible ? 1 : 0 }}
        transition={{ duration: duration.medium }}
        className="grid w-full min-w-0 gap-7"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {displayedProjects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            visible={gridVisible}
            onSelect={() => setSelected(p)}
          />
        ))}
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      {hasMoreProjects && (
        <motion.div
          initial={{ opacity: 0, y: offset.ySmall }}
          animate={{
            opacity: gridVisible ? 1 : 0,
            y: gridVisible ? 0 : offset.ySmall,
          }}
          transition={{ duration: duration.medium, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAll(!showAll)}
            className="cursor-pointer rounded-pill-sm border border-accent bg-transparent px-7 py-3 font-sans text-body font-medium text-accent transition-all"
          >
            {showAll ? "Show Less" : "Show All Projects"}
          </motion.button>
        </motion.div>
      )}
    </Section>
  );
}
