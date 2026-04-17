import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { useTheme } from "../context/ThemeContext";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Projects() {
  const { t } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: t.bg,
        padding: "120px 80px",
        transition: "background-color 0.4s ease",
        overflow: "hidden",
      }}
    >
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

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="section-header"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: headerVisible ? 1 : 0, x: headerVisible ? 0 : -20 }}
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
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "28px",
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} visible={gridVisible} />
          ))}
        </motion.div>
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
        @media (max-width: 480px) {
          section#work {
            padding: 60px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
