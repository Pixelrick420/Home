import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { useTheme } from "../context/ThemeContext";
import { fonts } from "../theme";
import { motion } from "framer-motion";

const currently = [
  { label: "Studying", value: "B.Tech CSE @ GEC Thrissur" },
  { label: "Exploring", value: "Compilers, Web Design, Systems" },
  { label: "Building", value: "Whatever seems interesting" },
  { label: "Located", value: "Kerala, India" },
];

const languages = ["English", "Malayalam", "Hindi"];

export default function About() {
  const { t } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [contentRef, visible] = useScrollFade<HTMLDivElement>({
    threshold: 0.08,
  });

  return (
    <section
      id="about"
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
          opacity: 0.75,
          zIndex: 0,
          transition: "background-color 0.4s ease",
        }}
      />

      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="section-header"
        >
          <span
            className="section-label"
            style={{
              color: t.accentHover,
            }}
          >
            03 - About
          </span>
          <h2 className="section-title">
            Hello{" "}
            <span
              style={{
                color: t.accent,
              }}
            >
              :D
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
          }}
        >
          <div
            className="about-card card-hover"
            style={{
              backgroundColor: t.bgCard,
              border: `1px solid ${t.border}`,
              borderRadius: "12px",
              padding: "48px",
              position: "relative",
              overflow: "hidden",
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: "17px",
                fontWeight: 800,
                color: t.textSub,
                lineHeight: 1.8,
                margin: "0 0 20px 0",
              }}
            >
              I'm a Computer Science undergraduate at Government Engineering
              College, Thrissur. Having completed multiple internships and projects,
              I'm looking to apply what i have learnt so far, explore new technologies,
              and connect with others in the field.
            </p>
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: "17px",
                fontWeight: 800,
                color: t.textSub,
                lineHeight: 1.8,
                margin: "0 0 32px 0",
              }}
            >
              My work spans machine learning, web development, systems
              programming, and the occasional satirical VS Code extension.{" "}
              <br />I like experimenting and breaking things.
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {languages.map((lang, i) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: visible ? 1 : 0,
                    scale: visible ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: t.textMuted,
                    backgroundColor: t.bgAlt,
                    border: `1px solid ${t.border}`,
                    padding: "5px",
                    borderRadius: "6px",
                  }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>
          </div>

          <div
            className="about-card card-hover"
            style={{
              backgroundColor: t.bgCard,
              border: `1px solid ${t.border}`,
              borderRadius: "12px",
              padding: "48px",
              position: "relative",
              overflow: "hidden",
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "28px",
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
              <h3
                style={{
                  fontFamily: fonts.sans,
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: t.textMuted,
                  margin: 0,
                }}
              >
                Currently
              </h3>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {currently.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -30 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr",
                    gap: "20px",
                    padding: "20px 0",
                    borderBottom: `1px solid ${t.border}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: "12px",
                      fontWeight: 500,
                      color: t.textMuted,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: "16px",
                      fontWeight: 500,
                      color: t.text,
                      lineHeight: 1.4,
                    }}
                  >
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section#about {
            padding: 100px 48px !important;
          }
        }
        @media (max-width: 768px) {
          section#about {
            padding: 80px 32px !important;
          }
        }
        @media (max-width: 480px) {
          section#about {
            padding: 60px 20px !important;
          }
        }
        @media (max-width: 640px) {
          .about-card {
            padding: 28px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
