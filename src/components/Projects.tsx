import { useState, useEffect } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import { useTheme } from "../context/useTheme";
import { motion } from "framer-motion";
import { fonts } from "../theme";
import {
  duration,
  fontSize,
  offset,
  radius,
  spacing,
  transitions,
} from "../constants";

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
      <SectionHeader label="01 - Selected Work">
        Things I've <span style={{ color: t.accent }}>Built</span>
      </SectionHeader>

      <motion.div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: gridVisible ? 1 : 0 }}
        transition={{ duration: duration.medium }}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: spacing.xlPlus,
        }}
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
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: spacing.huge,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAll(!showAll)}
            style={{
              fontFamily: fonts.sans,
              fontSize: fontSize.body,
              fontWeight: 500,
              padding: `${spacing.md} ${spacing.xlPlus}`,
              borderRadius: radius.pillSm,
              backgroundColor: "transparent",
              border: `1px solid ${t.accent}`,
              color: t.accent,
              cursor: "pointer",
              transition: transitions.all,
            }}
          >
            {showAll ? "Show Less" : "Show All Projects"}
          </motion.button>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .project-card > div:last-child {
            padding: 20px !important;
          }

          .project-title {
            font-size: 18px !important;
          }

          .project-description {
            font-size: 13px !important;
          }
        }
      `}</style>
    </Section>
  );
}
