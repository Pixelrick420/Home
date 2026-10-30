import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import { duration, offset } from "../constants";
import { projects } from "../data/projects";
import { useColumns } from "../hooks/useColumns";
import { useScrollFade } from "../hooks/useScrollFade";
import { handleLinkClick } from "../lib/router";
import type { Project } from "../types";
import { IS_SERVER } from "../lib/env";

const HOME_WORK = "/#work";

function RevealCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const [ref, visible] = useScrollFade<HTMLDivElement>({ threshold: 0.05 });
  return (
    <div ref={ref} className="h-full">
      <ProjectCard
        project={project}
        index={index}
        visible={visible}
        onSelect={onSelect}
      />
    </div>
  );
}

export default function AllProjects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const columns = useColumns();

  const [footerRef, footerVisible] = useScrollFade<HTMLDivElement>();

  return (
    <Section id="all-projects">
      <a
        href={HOME_WORK}
        onClick={(e) => handleLinkClick(e, HOME_WORK)}
        className="mb-10 inline-flex items-center gap-2.5 font-sans text-sm font-medium uppercase tracking-[0.08em] text-text no-underline"
      >
        <FaArrowLeft size={12} aria-hidden="true" />
        Back to home
      </a>

      <SectionHeader title={`All Work`}>
        Everything I've <span className="text-accent">Built</span>
      </SectionHeader>

      <div className="grid w-full min-w-0 grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <RevealCard
            key={p.id}
            project={p}
            index={i % columns}
            onSelect={() => setSelected(p)}
          />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      <motion.div
        ref={footerRef}
        initial={IS_SERVER ? false : { opacity: 0, y: offset.ySmall }}
        animate={{
          opacity: footerVisible ? 1 : 0,
          y: footerVisible ? 0 : offset.ySmall,
        }}
        transition={{ duration: duration.medium }}
        className="mt-12 flex justify-center"
      >
        <motion.a
          href={HOME_WORK}
          onClick={(e) => handleLinkClick(e, HOME_WORK)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-pill-sm border border-accent bg-transparent px-7 py-3 font-sans text-body font-medium text-accent no-underline transition-all"
        >
          <FaArrowLeft size={13} aria-hidden="true" />
          Back to Home
        </motion.a>
      </motion.div>
    </Section>
  );
}
