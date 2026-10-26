import { useState } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { useColumns } from "../hooks/useColumns";
import { featuredProjects } from "../data/projects";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { duration, offset } from "../constants";
import { PROJECTS_PATH, handleLinkClick } from "../lib/router";
import type { SectionProps } from "../lib/sections";

export default function Projects({ sectionNumber, title }: SectionProps) {
  const [selected, setSelected] = useState<Project | null>(null);
  const columns = useColumns();

  const [gridRef, gridVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.04,
  });

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
        {featuredProjects.map((p, i) => (
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

      <motion.div
        initial={{ opacity: 0, y: offset.ySmall }}
        animate={{
          opacity: gridVisible ? 1 : 0,
          y: gridVisible ? 0 : offset.ySmall,
        }}
        transition={{ duration: duration.medium, delay: 0.3 }}
        className="mt-12 flex justify-center"
      >
        <motion.a
          href={PROJECTS_PATH}
          onClick={(e) => handleLinkClick(e, PROJECTS_PATH)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-pill-sm border border-accent bg-transparent px-7 py-3 font-sans text-body font-medium text-accent no-underline transition-all"
        >
          View All Projects
          <FaArrowRight size={13} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </Section>
  );
}
