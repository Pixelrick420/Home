import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "../types";
import { useTheme } from "../context/ThemeContext";
import { fonts } from "../theme";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useTheme();

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

  const paraStyle = {
    fontFamily: fonts.sans,
    fontSize: "15px",
    fontWeight: 500,
    color: t.textSub,
    lineHeight: 1.7,
    margin: 0,
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={`${project.id}-backdrop`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(10, 10, 10, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            overflowY: "auto",
          }}
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
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              backgroundColor: t.bgCard,
              border: `1px solid ${t.border}`,
              borderRadius: "16px",
              width: "100%",
              maxWidth: "640px",
              maxHeight: "85vh",
              overflow: "auto",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.35)",
            }}
          >
            <div style={{ padding: "28px 32px 32px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: fonts.serif,
                      fontSize: "26px",
                      fontWeight: 700,
                      color: t.text,
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: "12px",
                      color: t.textFaint,
                      display: "inline-block",
                      marginTop: "6px",
                    }}
                  >
                    {project.year}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "transparent",
                    color: t.textFaint,
                    fontSize: "24px",
                    lineHeight: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <p style={paraStyle}>{project.what}</p>
                <p style={paraStyle}>{project.problem}</p>
                <p style={paraStyle}>{project.stack}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "28px",
                  paddingTop: "24px",
                  borderTop: `1px solid ${t.border}`,
                }}
              >
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: t.accent,
                    textDecoration: "none",
                    border: `1px solid ${t.accent}`,
                    padding: "10px 20px",
                    borderRadius: "40px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FaGithub size={16} />
                  View on GitHub
                </motion.a>
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: "14px",
                      fontWeight: 600,
                      color: t.accent,
                      textDecoration: "none",
                      border: `1px solid ${t.accent}`,
                      padding: "10px 20px",
                      borderRadius: "40px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaExternalLinkAlt size={14} />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
