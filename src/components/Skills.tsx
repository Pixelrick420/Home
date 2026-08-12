import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { skills } from "../data/skills";
import { useTheme } from "../context/useTheme";
import { fonts } from "../theme";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import {
  cardStyle,
  duration,
  ease,
  fontSize,
  offset,
  radius,
  sectionInner,
  sectionOverlay,
  sectionStyle,
  spacing,
  stagger,
} from "../constants";

export default function Skills() {
  const { t } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  const [gridRef, gridVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.04,
  });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-block"
      style={sectionStyle}
    >
      <div style={sectionOverlay(t.bgAlt)} />

      <div style={sectionInner}>
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
            gridTemplateColumns:
              "repeat(auto-fill, minmax(clamp(120px, 25vw, 360px), 1fr))",
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
                <div
                  style={{
                    width: "4px",
                    height: "20px",
                    backgroundColor: t.accent,
                    borderRadius: radius.bar,
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: fontSize.xs,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: t.textMuted,
                    margin: 0,
                  }}
                >
                  {group.category}
                </p>
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
                      fontSize: "16px",
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
      </div>
    </section>
  );
}
