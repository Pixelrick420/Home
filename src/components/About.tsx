import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
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

const currently = [
  { label: "Studying", value: "B.Tech CSE @ GEC Thrissur" },
  { label: "Exploring", value: "Compilers, Web Design, Systems" },
  { label: "Building", value: "Whatever seems interesting" },
  { label: "Located", value: "Kerala, India" },
];

const languages = ["Hindi", "English", "Malayalam"];

const cardBase = {
  borderRadius: radius.card,
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
      style={{
        ...sectionStyle,
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div style={sectionOverlay(t.bgAlt)} />

      <div
        ref={contentRef}
        style={{
          ...sectionInner,
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: offset.y }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : offset.y,
          }}
          transition={{
            duration: duration.slow,
            ease,
          }}
          className="section-header"
          style={{
            minWidth: 0,
          }}
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
              ...cardBase,
              backgroundColor: t.bgCard,
              border: `1px solid ${t.border}`,
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
                  marginTop: "20px",
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
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: fontSize.xs,
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      color: t.textMuted,
                      backgroundColor: t.bgAlt,
                      border: `1px solid ${t.border}`,
                      padding: spacing.xs,
                      borderRadius: radius.tag,
                      maxWidth: "100%",
                      boxSizing: "border-box",
                      overflowWrap: "anywhere",
                    }}
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
              ...cardBase,
              backgroundColor: t.bgCard,
              border: `1px solid ${t.border}`,
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

      <style>{`
        /*
         * Desktop / large tablet
         */
        @media (max-width: 1024px) {
          section#about {
            padding: ${section.laptop} !important;
          }
        }

        /*
         * Tablet
         */
        @media (max-width: 768px) {
          section#about {
            padding: ${section.tablet} !important;
          }
        }

        /*
         * Mobile
         */
        @media (max-width: 640px) {
          section#about {
            padding: ${section.mobile} !important;
          }

          .about-card {
            padding: 28px 20px !important;
          }

          .about-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }

        /*
         * Small phones
         *
         * Important:
         * The layout changes from:
         *
         *   label | value
         *
         * to:
         *
         *   label
         *   value
         *
         * This prevents the fixed 100px label column from consuming
         * too much of a 300px-wide viewport.
         */
        @media (max-width: 320px) {
          section#about {
            padding: 48px 12px !important;
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
            box-sizing: border-box;
          }

          section#about .section-header {
            width: 100%;
            min-width: 0;
          }

          section#about .section-title {
            font-size: clamp(28px, 10vw, 36px);
            line-height: 1.1;
            overflow-wrap: anywhere;
          }

          section#about .section-label {
            font-size: 10px;
            letter-spacing: 0.08em;
            overflow-wrap: anywhere;
          }

          .about-grid {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 16px !important;
          }

          .about-card {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            padding: 24px 16px 24px 20px !important;
            border-radius: 12px !important;
            box-sizing: border-box !important;
          }

          .about-card > div:first-child {
            width: 6px !important;
          }

          .about-description-card p {
            font-size: 14px !important;
            line-height: 1.65 !important;
            margin: 0 0 16px 0 !important;
            max-width: 100% !important;
          }

          .language-tags {
            gap: 6px !important;
            margin-top: 14px !important;
          }

          .language-tags span {
            font-size: 10px !important;
            padding: 5px 7px !important;
          }

          .about-currently-card {
            padding-left: 20px !important;
          }

          .about-currently-card h3 {
            font-size: 10px !important;
            letter-spacing: 0.14em !important;
          }

          .currently-list {
            width: 100% !important;
            min-width: 0 !important;
          }

          .currently-row span:first-child {
            font-size: 10px !important;
            line-height: 1.3 !important;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .currently-row span:last-child {
            width: 100% !important;
            min-width: 0 !important;
            font-size: 13px !important;
            line-height: 1.45 !important;
            overflow-wrap: anywhere !important;
            word-break: break-word !important;
          }
        }

        /*
         * Very small screens: 300px and below
         */
        @media (max-width: 300px) {
          section#about {
            padding: 40px 8px !important;
          }

          .about-card {
            padding: 20px 12px 20px 16px !important;
            border-radius: 10px !important;
          }

          .about-card > div:first-child {
            width: 5px !important;
          }

          .about-description-card p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }

          .language-tags {
            gap: 5px !important;
          }

          .language-tags span {
            font-size: 9px !important;
            padding: 4px 6px !important;
          }

          .about-currently-card h3 {
            font-size: 9px !important;
          }

          .currently-row {
            padding: 10px 0 !important;
          }

          .currently-row span:first-child {
            font-size: 9px !important;
          }

          .currently-row span:last-child {
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
