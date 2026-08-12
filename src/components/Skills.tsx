import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { skills } from "../data/skills";
import { useTheme } from "../context/useTheme";
import { fonts } from "../theme";
import { motion } from "framer-motion";
import {
  duration,
  ease,
  fontSize,
  offset,
  radius,
  section,
  sectionInner,
  sectionOverlay,
  sectionStyle,
  spacing,
  stagger,
} from "../constants";

export default function Skills() {
  const { t } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  const [headerRef, headerVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.2,
  });
  const [gridRef, gridVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.04,
  });

  return (
    <section id="skills" ref={sectionRef} style={sectionStyle}>
      <div style={sectionOverlay(t.bgAlt)} />

      <div style={sectionInner}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: offset.y }}
          animate={{
            opacity: headerVisible ? 1 : 0,
            y: headerVisible ? 0 : offset.y,
          }}
          transition={{ duration: duration.slow, ease }}
          className="section-header"
        >
          <span
            className="section-label"
            style={{
              color: t.accentHover,
            }}
          >
            04 - Skills
          </span>
          <h2 className="section-title">
            My{" "}
            <span
              style={{
                color: t.accent,
              }}
            >
              Toolkit
            </span>
          </h2>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: gridVisible ? 1 : 0 }}
          transition={{ duration: duration.medium }}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(clamp(160px, 25vw, 360px), 1fr))",
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
                padding: `${spacing.xxl} ${spacing.xlPlus}`,
                backgroundColor: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: radius.card,
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

      <style>{`
        @media (max-width: 1024px) {
          section#skills {
            padding: ${section.laptop} !important;
          }
        }
        @media (max-width: 768px) {
          section#skills {
            padding: ${section.tablet} !important;
          }
        }
        @media (max-width: 480px) {
          section#skills {
            padding: ${section.mobile} !important;
          }
        }
      `}</style>
    </section>
  );
}
