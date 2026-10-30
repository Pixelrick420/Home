import { useState } from "react";
import type { Project } from "../types";
import { motion, useReducedMotion } from "framer-motion";
import { duration, ease, offset, stagger } from "../constants";
import { CoverArt } from "../projects";
import { IS_SERVER } from "../lib/env";

interface ProjectCardProps {
  project: Project;
  index: number;
  visible: boolean;
  onSelect: () => void;
}

export default function ProjectCard({
  project,
  index,
  visible,
  onSelect,
}: ProjectCardProps) {
  const [hov, setHov] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={reduceMotion || IS_SERVER ? false : { opacity: 0, y: offset.y }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : offset.y,
      }}
      transition={{
        duration: reduceMotion ? 0 : duration.medium,
        delay: reduceMotion ? 0 : index * stagger,
        ease,
      }}
      className="card-hover relative flex h-full cursor-pointer flex-col overflow-hidden rounded-card border bg-bg-card"
      style={{ borderColor: hov ? "var(--accent)" : "var(--border)" }}
    >
      <button
        type="button"
        aria-label={`View details for ${project.title}`}
        onClick={onSelect}
        className="js-only absolute inset-0 z-1 cursor-pointer border-none bg-transparent p-0 focus-visible:[outline-offset:-3px]"
      />
      <div className="relative project-cover w-full shrink-0 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: hov ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
            className="h-full w-full"
          >
            <CoverArt id={project.id} />
          </motion.div>

          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{
              clipPath: hov ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
            }}
            transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
            className="absolute inset-0 flex items-center justify-center bg-black/92"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-pill bg-[#aaaaaa] px-6 py-3.5 font-sans text-sm font-semibold tracking-wider text-[#1A1A1A]"
            >
              Learn More
            </motion.span>
          </motion.div>
        </div>
      </div>

      <div className="flex grow flex-col p-5 md:px-7 md:pb-7 md:pt-6">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="m-0 font-serif text-lg font-bold leading-[1.2] text-text md:text-xl">
            {project.title}
          </h3>
          <span className="mt-0.5 ml-3 shrink-0 font-mono text-xs text-text-faint">
            {project.year}
          </span>
        </div>

        <p className="m-0 mb-4.5 font-sans text-meta leading-[1.6] text-text-sub md:text-md">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
