import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { useTheme } from "../context/useTheme";
import { fonts, type ThemeTokens } from "../theme";
import { motion, useInView } from "framer-motion";
import { experiences } from "../data/experience";
import type { Experience } from "../types";
import {
  duration,
  fontSize,
  hexAlpha,
  offset,
  radius,
  section,
  sectionInner,
  sectionOverlay,
  spacing,
  stagger,
  transitions,
} from "../constants";

function ExperienceCard({
  exp,
  i,
  t,
}: {
  exp: Experience;
  i: number;
  t: ThemeTokens;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      className="experience-card card-hover"
      initial={{ opacity: 0, y: offset.ySmall }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: offset.ySmall }}
      transition={{
        duration: duration.medium,
        delay: i * stagger,
        ease: "easeOut",
      }}
      style={{
        backgroundColor: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: radius.card,
        overflow: "hidden",
        position: "relative",
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "10px",
          backgroundColor: t.accent,
        }}
      />

      <div
        style={{
          padding: `${spacing.xlPlus} ${spacing.xxl}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: spacing.md }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: spacing.lg,
              flexWrap: "wrap",
              marginBottom: spacing.md,
            }}
          >
            <h3
              style={{
                fontFamily: fonts.sans,
                fontSize: "clamp(16px, 1.5vw, 18px)",
                fontWeight: 600,
                color: t.text,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {exp.role}
            </h3>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: t.accent,
                border: `1px solid ${t.accent}${hexAlpha.border}`,
                backgroundColor: `${t.accent}${hexAlpha.bg}`,
                padding: `${spacing.xs} 10px`,
                borderRadius: radius.pill,
              }}
            >
              {exp.type}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.md,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: "14px",
                fontWeight: 600,
                marginTop: spacing.lgPlus,
                marginBottom: spacing.lgPlus,
                color: t.accent,
              }}
            >
              {exp.company}
            </span>
            <span style={{ color: t.textMuted, fontSize: "12px" }}>•</span>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: fontSize.sm,
                color: t.textMuted,
              }}
            >
              {exp.location}
            </span>
            <span style={{ color: t.textMuted, fontSize: "12px" }}>•</span>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: fontSize.sm,
                color: t.textMuted,
              }}
            >
              {exp.duration}
            </span>
          </div>
        </div>

        <p
          style={{
            fontFamily: fonts.sans,
            fontSize: "14px",
            fontWeight: 500,
            color: t.textSub,
            lineHeight: 1.7,
            margin: `0 0 ${spacing.lgPlus} 0`,
          }}
        >
          {exp.description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            alignItems: "end",
            gap: spacing.sm,
          }}
        >
          {exp.stack.map((tech: string) => (
            <span
              key={tech}
              style={{
                fontFamily: fonts.sans,
                fontSize: fontSize.xs,
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: t.textMuted,
                backgroundColor: `${t.bgAlt}`,
                border: `1px solid ${t.border}`,
                padding: spacing.xs,
                borderRadius: radius.tag,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { t } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  const [headerRef, headerVisible] = useScrollFade<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: section.base,
        transition: transitions.bg,
      }}
    >
      <div style={sectionOverlay(t.bgAlt)} />

      <div style={sectionInner}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: offset.y }}
          animate={{
            opacity: headerVisible ? 1 : 0,
            y: headerVisible ? 0 : offset.y,
          }}
          transition={{ duration: duration.slow }}
          className="section-header"
        >
          <span className="section-label" style={{ color: t.accentHover }}>
            02 - Experience
          </span>
          <h2 className="section-title">
            Where I've <span style={{ color: t.accent }}>Worked</span>
          </h2>
        </motion.div>

        <div className="experience-grid">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} i={i} t={t} />
          ))}
        </div>
        <style>{`
          .experience-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: ${spacing.xxl};
          }

          .experience-card {
            min-width: 0;
          }

          @media (max-width: 900px) {
            .experience-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
