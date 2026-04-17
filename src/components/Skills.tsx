import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { skills } from "../data/skills";
import { useTheme } from "../context/ThemeContext";
import { fonts } from "../theme";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Skills() {
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

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="skills"
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
          bottom: "10%",
          left: "5%",
          width: "500px",
          height: "500px",
          background: `radial-gradient(circle, ${t.accent}08 0%, transparent 60%)`,
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
          y,
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
          <span
            className="section-label"
            style={{
              color: t.accentHover,
            }}
          >
            03 — Skills
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
          transition={{ duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: gridVisible ? 1 : 0,
                y: gridVisible ? 0 : 40,
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="card-hover"
              style={{
                padding: "32px 28px",
                backgroundColor: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "20px",
                    backgroundColor: t.accent,
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: "11px",
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
                  gap: "12px",
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
            padding: 100px 48px !important;
          }
        }
        @media (max-width: 768px) {
          section#skills {
            padding: 80px 32px !important;
          }
        }
        @media (max-width: 480px) {
          section#skills {
            padding: 60px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
