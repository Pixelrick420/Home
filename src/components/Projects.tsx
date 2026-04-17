import { useRef, useState, useEffect } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { useTheme } from "../context/ThemeContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { fonts } from "../theme";

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

export default function Projects() {
  const { t } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);
  const columns = useColumns();

  const [headerRef, headerVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.2,
  });
  const [gridRef, gridVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.04,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const displayLimit = columns * 3;
  const displayedProjects = showAll
    ? projects
    : projects.slice(0, displayLimit);
  const hasMoreProjects = projects.length > displayLimit;

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "120px 80px",
        transition: "background-color 0.4s ease",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: t.bgAlt,
          opacity: 0.5,
          zIndex: 0,
          transition: "background-color 0.4s ease",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${t.accent}08 0%, transparent 60%)`,
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
          y: bgY,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: headerVisible ? 1 : 0,
            y: headerVisible ? 0 : 40,
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="section-header"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: headerVisible ? 1 : 0,
              x: headerVisible ? 0 : -20,
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-label"
          >
            01 — Selected Work
          </motion.span>
          <h2 className="section-title">Things I've Built</h2>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: gridVisible ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "28px",
          }}
        >
          {displayedProjects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              visible={gridVisible}
            />
          ))}
        </motion.div>

        {/* Show All / Show Less Button */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: gridVisible ? 1 : 0, y: gridVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "48px",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              style={{
                fontFamily: fonts.sans,
                fontSize: "14px",
                fontWeight: 500,
                padding: "12px 28px",
                borderRadius: "40px",
                backgroundColor: "transparent",
                border: `1px solid ${t.accent}`,
                color: t.accent,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {showAll ? "Show Less" : "Show All Projects"}
            </motion.button>
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section#work {
            padding: 100px 48px !important;
          }
        }
        @media (max-width: 768px) {
          section#work {
            padding: 80px 32px !important;
          }
        }
        @media (max-width: 640px) {
          section#work {
            padding: 60px 20px !important;
          }

          /* Responsive card styling for mobile */
          .project-card > div:last-child {
            padding: 20px !important;
          }

          .project-title {
            font-size: 18px !important;
          }

          .project-description {
            font-size: 13px !important;
          }

          .project-tag {
            font-size: 10px !important;
            padding: 4px 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
