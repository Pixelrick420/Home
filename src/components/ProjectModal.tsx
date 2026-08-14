import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "../types";
import { useTheme } from "../context/useTheme";
import { fonts } from "../theme";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  alpha,
  duration,
  ease,
  fontSize,
  iconButtonStyle,
  radius,
  spacing,
  width,
  zIndex,
} from "../constants";

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
    fontSize: fontSize.md,
    fontWeight: 500,
    color: t.textSub,
    lineHeight: 1.7,
    margin: 0,
  };

  const linkStyle = {
    fontFamily: fonts.sans,
    fontSize: "14px",
    fontWeight: 600,
    color: t.accent,
    textDecoration: "none",
    border: `1px solid ${t.accent}`,
    padding: "10px 20px",
    borderRadius: radius.pillSm,
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.sm,
  };

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
            style={{
              position: "fixed",
              inset: 0,
              zIndex: zIndex.modal,
              backgroundColor: `rgba(10, 10, 10, ${alpha.backdrop})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: spacing.xl,
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
              transition={{ duration: 0.25, ease }}
              className="modal-panel"
              style={{
                backgroundColor: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: radius.modal,
                width: "100%",
                maxWidth: width.modal,
                maxHeight: "75vh",
                overflow: "auto",
                boxShadow: `0 24px 64px rgba(0, 0, 0, ${alpha.shadow})`,
              }}
            >
              <div
                className="modal-content"
                style={{
                  padding: `${spacing.xlPlus} ${spacing.xxl} ${spacing.xxl}`,
                }}
              >
                <div
                  className="modal-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: spacing.lg,
                    marginBottom: "18px",
                  }}
                >
                  <div>
                    <h3
                      className="modal-title"
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
                      className="modal-year"
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
                      ...iconButtonStyle(t, 32),
                      borderRadius: "50%",
                      color: t.textFaint,
                      fontSize: "24px",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    ×
                  </button>
                </div>

                <div
                  className="modal-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: spacing.lg,
                  }}
                >
                  <p className="modal-para" style={paraStyle}>{project.what}</p>
                  <p className="modal-para" style={paraStyle}>{project.problem}</p>
                  <p className="modal-para" style={paraStyle}>{project.stack}</p>
                </div>

                <div
                  className="modal-links"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: spacing.md,
                    marginTop: spacing.xlPlus,
                    paddingTop: spacing.xl,
                    borderTop: `1px solid ${t.border}`,
                  }}
                >
                  <motion.a
                    className="modal-link"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={linkStyle}
                  >
                    <FaGithub size={16} />
                    <span className="modal-link-short">Github</span>
                    <span className="modal-link-long">View on GitHub</span>
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      className="modal-link"
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={linkStyle}
                    >
                      <FaExternalLinkAlt size={14} />
                      <span className="modal-link-short">Demo</span>
                      <span className="modal-link-long">Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .modal-link-short {
          display: none;
        }

        @media (max-width: 640px) {
          .modal-content {
            padding: 20px !important;
          }

          .modal-header {
            margin-bottom: 12px !important;
          }

          .modal-title {
            font-size: 20px !important;
          }

          .modal-year {
            margin-top: 4px !important;
          }

          .modal-body {
            gap: 10px !important;
          }

          .modal-para {
            font-size: 13px !important;
            line-height: 1.55 !important;
          }

          .modal-links {
            margin-top: 16px !important;
            padding-top: 16px !important;
            gap: 10px !important;
          }

          .modal-link {
            padding: 8px 16px !important;
            font-size: 13px !important;
          }

          .modal-link-short {
            display: inline;
          }

          .modal-link-long {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
