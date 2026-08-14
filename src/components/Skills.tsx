import { useScrollFade } from "../hooks/useScrollFade";
import { skills } from "../data/skills";
import { useTheme } from "../context/useTheme";
import { fonts } from "../theme";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import {
  barBlock,
  cardStyle,
  duration,
  ease,
  eyebrowStyle,
  fontSize,
  offset,
  spacing,
  stagger,
} from "../constants";

export default function Skills() {
  const { t } = useTheme();

  const [gridRef, gridVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.04,
  });

  return (
    <Section id="skills">
      <SectionHeader label="04 - Skills">
        My <span style={{ color: t.accent }}>Toolkit</span>
      </SectionHeader>

      <motion.div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: gridVisible ? 1 : 0 }}
        transition={{ duration: duration.medium }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(clamp(120px, 25vw, 360px), 1fr))",
          gap: spacing.lgPlus,
        }}
      >
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: offset.y }}
            animate={{
              opacity: gridVisible ? 1 : 0,
              y: gridVisible ? 0 : offset.y,
            }}
            transition={{
              duration: duration.medium,
              delay: i * stagger,
              ease,
            }}
            className="card-hover"
            style={{
              ...cardStyle(t),
              padding: `${spacing.lgPlus} ${spacing.md}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: spacing.md,
                marginBottom: spacing.lgPlus,
              }}
            >
              <div style={barBlock(t)} />
              <p style={eyebrowStyle(t, "0.18em")}>{group.category}</p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.md,
              }}
            >
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: fontSize.mdPlus,
                    fontWeight: 500,
                    color: t.text,
                    lineHeight: 1,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
