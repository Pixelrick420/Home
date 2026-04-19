import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { useTheme } from "../context/ThemeContext";
import { fonts, type ThemeTokens } from "../theme";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { experiences } from "../data/experience";
import type { Experience } from "../types";

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
      layout={false}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      }}
      style={{
        backgroundColor: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: "20px",
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
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "12px",
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
                border: `1px solid ${t.accent}40`,
                backgroundColor: `${t.accent}15`,
                padding: "4px 10px",
                borderRadius: "50px",
              }}
            >
              {exp.type}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: "14px",
                fontWeight: 600,
                marginTop: "20px",
                marginBottom: "20px",
                color: t.accent,
              }}
            >
              {exp.company}
            </span>
            <span style={{ color: t.textMuted, fontSize: "12px" }}>•</span>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: "13px",
                color: t.textMuted,
              }}
            >
              {exp.location}
            </span>
            <span style={{ color: t.textMuted, fontSize: "12px" }}>•</span>
            <span
              style={{
                fontFamily: fonts.sans,
                fontSize: "13px",
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
            margin: "0 0 20px 0",
          }}
        >
          {exp.description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {exp.stack.map((tech: string) => (
            <span
              key={tech}
              style={{
                fontFamily: fonts.sans,
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: t.textMuted,
                backgroundColor: `${t.bgAlt}`,
                border: `1px solid ${t.border}`,
                padding: "5px 12px",
                borderRadius: "6px",
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "120px 80px",
        transition: "background-color 0.4s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: t.bgAlt,
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${t.accent}10 0%, transparent 50%)`,
          borderRadius: "50%",
          filter: "blur(120px)",
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
          transition={{ duration: 0.8 }}
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
            display: flex;
            gap: 32px;
          }

          .experience-card {
            flex: 1;
            min-width: 300px;
          }

          @media (max-width: 768px) {
            .experience-grid {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
