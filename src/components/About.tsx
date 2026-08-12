import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { useTheme } from "../context/useTheme";
import { fonts } from "../theme";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import {
  accentBar,
  cardStyle,
  duration,
  ease,
  radius,
  sectionInner,
  sectionOverlay,
  sectionStyle,
  spacing,
  stagger,
  tagStyle,
} from "../constants";

const currently = [
  { label: "Studying", value: "B.Tech CSE @ GEC Thrissur" },
  { label: "Exploring", value: "Compilers, Web Design, Systems" },
  { label: "Building", value: "Whatever seems interesting" },
  { label: "Located", value: "Kerala, India" },
];

const languages = ["Hindi", "English", "Malayalam"];

const cardBase = {
  padding: spacing.huge,
  position: "relative" as const,
  overflow: "hidden",
  minWidth: 0,
  boxSizing: "border-box" as const,
};

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
      className="section-block"
      style={sectionStyle}
    >
      <div style={sectionOverlay(t.bgAlt)} />

      <div ref={contentRef} style={sectionInner}>
        <SectionHeader label="03 - About" threshold={0.08}>
          Hello <span style={{ color: t.accent }}>:D</span>
        </SectionHeader>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: spacing.xxl,
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            boxSizing: "border-box",
          }}
        >
          {/* LEFT CARD */}
          <div
            className="about-card card-hover about-description-card"
            style={{
              ...cardStyle(t),
              ...cardBase,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={accentBar(t)} />

            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: visible ? 1 : 0,
                y: visible ? 0 : 50,
              }}
              transition={{
                duration: duration.slow,
                delay: 0.15,
                ease,
              }}
              style={{
                minWidth: 0,
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: "17px",
                  fontWeight: 800,
                  color: t.textSub,
                  lineHeight: 1.8,
                  margin: `${spacing.md} 2%`,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                I'm a Computer Science undergraduate at Government Engineering
                College, Thrissur. Having completed multiple internships and
                projects, I'm looking to apply what i have learnt so far,
                explore new technologies, and connect with others in the field.
              </p>

              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: "17px",
                  fontWeight: 800,
                  color: t.textSub,
                  lineHeight: 1.8,
                  margin: `${spacing.md} 2%`,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                My work spans machine learning, web development, systems
                programming, and the occasional satirical VS Code extension.
                <br />I like experimenting and breaking things.
              </p>

              <div
                className="language-tags"
                style={{
                  display: "flex",
                  marginTop: "auto",
                  flexDirection: "row-reverse",
                  gap: "10px",
                  flexWrap: "wrap",
                  minWidth: 0,
                }}
              >
                {languages.map((lang, i) => (
                  <motion.span
                    key={lang}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: visible ? 1 : 0,
                      scale: visible ? 1 : 0.8,
                    }}
                    transition={{
                      duration: duration.medium,
                      delay: 0.4 + i * stagger,
                    }}
                    style={tagStyle(t)}
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT CARD */}
          <div
            className="about-card card-hover about-currently-card"
            style={{
              ...cardStyle(t),
              ...cardBase,
            }}
          >
            <div style={accentBar(t)} />

            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: visible ? 1 : 0,
                y: visible ? 0 : 50,
              }}
              transition={{
                duration: duration.slow,
                delay: 0.25,
                ease,
              }}
              style={{
                minWidth: 0,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                  marginBottom: spacing.xlPlus,
                  minWidth: 0,
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

                <h3
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: t.textMuted,
                    margin: 0,
                    minWidth: 0,
                    overflowWrap: "anywhere",
                  }}
                >
                  Currently
                </h3>
              </div>

              <div
                className="currently-list"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacing.xs,
                  width: "100%",
                  minWidth: 0,
                }}
              >
                {currently.map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    className="currently-row"
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    animate={{
                      opacity: visible ? 1 : 0,
                      x: visible ? 0 : -30,
                    }}
                    transition={{
                      duration: duration.medium,
                      delay: 0.4 + i * stagger,
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: spacing.xs,
                      padding: `${spacing.lgPlus} 0`,
                      borderBottom: `1px solid ${t.border}`,
                      width: "100%",
                      minWidth: 0,
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: fonts.sans,
                        fontSize: "12px",
                        fontWeight: 500,
                        color: t.textMuted,
                        minWidth: 0,
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
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
                        minWidth: 0,
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
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
    </section>
  );
}
