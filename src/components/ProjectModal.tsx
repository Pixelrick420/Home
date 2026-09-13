import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "../types";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { duration, ease } from "../constants";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const paraClass =
  "m-0 font-sans text-md font-medium leading-[1.7] text-text-sub max-sm:text-meta max-sm:leading-[1.55]";

const linkClass =
  "inline-flex items-center gap-2 rounded-pill-sm border border-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent no-underline max-sm:px-4 max-sm:py-2 max-sm:text-meta";

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [project]);

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            key={`${project.id}-backdrop`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast }}
            onClick={onClose}
            className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/60 p-6"
          >
            <motion.div
              key={`${project.id}-panel`}
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease }}
              className="w-full max-w-[640px] overflow-auto rounded-modal border border-border bg-bg-card shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
              style={{ maxHeight: "75vh" }}
            >
              <div className="max-sm:p-5 px-8 pt-7 pb-8">
                <div className="mb-4.5 flex items-start justify-between gap-4 max-sm:mb-3">
                  <div>
                    <h3 className="m-0 font-serif text-2xl font-bold leading-[1.2] text-text max-sm:text-lg">
                      {project.title}
                    </h3>
                    <span className="mt-1.5 inline-block font-mono text-xs text-text-faint max-sm:mt-1">
                      {project.year}
                    </span>
                  </div>
                  <motion.button
                    onClick={onClose}
                    aria-label="Close"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-2xl leading-none text-text-faint"
                  >
                    ×
                  </motion.button>
                </div>

                <div className="flex flex-col gap-4 max-sm:gap-2.5">
                  <p className={`${paraClass}`}>{project.what}</p>
                  <p className={`${paraClass}`}>
                    {project.problem}
                  </p>
                  <p className={`${paraClass}`}>{project.stack}</p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-6 max-sm:mt-4 max-sm:gap-2.5 max-sm:pt-4">
                  <motion.a
                    className={linkClass}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub size={16} />
                    <span className="hidden max-sm:inline">Github</span>
                    <span className="max-sm:hidden">View on GitHub</span>
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      className={linkClass}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt size={14} />
                      <span className="hidden max-sm:inline">Demo</span>
                      <span className="max-sm:hidden">Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
