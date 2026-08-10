import { useEffect, useState, useRef } from "react";
import { useTheme } from "../context/useTheme";
import { fonts } from "../theme";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  alpha,
  duration,
  ease,
  fontSize,
  layout,
  offset,
  pagePadding,
  radius,
  spacing,
  transitions,
  width,
  zIndex,
} from "../constants";

export default function Hero() {
  const { t, mode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: layout.minHeight,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: `0 ${pagePadding.desktop}`,
        transition: transitions.bg,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: t.bgAlt,
          opacity: alpha.sectionOverlay,
          zIndex: zIndex.sectionBg,
          transition: transitions.bg,
        }}
      />
      <motion.div
        style={{
          position: "relative",
          zIndex: zIndex.content,
          maxWidth: width.hero,
          y,
          opacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow }}
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: duration.slow, delay: 0.2 }}
          style={{ marginBottom: spacing.xxl }}
        >
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: fontSize.heroBadge,
              padding: "clamp(6px, 2vw, 10px) clamp(12px, 4vw, 20px)",
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: t.accent,
              backgroundColor: mode === "light" ? t.bgAlt : t.bgCard,
              borderRadius: radius.pill,
              display: "inline-block",
            }}
          >
            CS Undergrad · Programmer · Pixelrick
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: offset.yLg }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slow, delay: 0.35, ease }}
          style={{
            fontFamily: fonts.serif,
            fontSize: fontSize.heroTitle,
            fontWeight: 700,
            color: t.text,
            lineHeight: 0.92,
            margin: `0 0 ${spacing.lg} 0`,
            letterSpacing: "-0.03em",

            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "clip",
          }}
        >
          Harikrishnan R
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: duration.slow, delay: 0.5 }}
          style={{
            width: "80px",
            height: "4px",
            backgroundColor: t.accent,
            borderRadius: radius.bar,
            marginBottom: spacing.xxl,
            transformOrigin: "left",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: offset.y }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slow, delay: 0.6 }}
          style={{
            fontFamily: fonts.sans,
            fontSize: fontSize.heroLead,
            fontWeight: 400,
            color: t.textSub,
            maxWidth: width.heroText,
            lineHeight: 1.55,
            margin: `0 0 ${spacing.huge} 0`,
          }}
        >
          Building things from the ground up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: offset.y }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slow, delay: 0.75 }}
          style={{ display: "flex", gap: spacing.lg, flexWrap: "wrap" }}
        >
          <motion.button
            onClick={() =>
              document
                .querySelector("#work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: duration.fast }}
            style={{
              fontFamily: fonts.sans,
              fontSize: fontSize.sm,
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: t.bg,
              backgroundColor: t.accent,
              border: `1px solid ${t.accent}`,
              padding: `${spacing.lg} ${spacing.xxl}`,
              cursor: "pointer",
              borderRadius: radius.pill,
              display: "flex",
              alignItems: "center",
              gap: spacing.sm,
              transition: transitions.primary,
            }}
          >
            View Work
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: duration.loop,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </motion.button>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: duration.fast }}
            style={{
              fontFamily: fonts.sans,
              fontSize: fontSize.sm,
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: t.text,
              textDecoration: "none",
              backgroundColor: "transparent",
              border: `1px solid ${t.accent}`,
              padding: `${spacing.lg} ${spacing.xxl}`,
              borderRadius: radius.pill,
              display: "flex",
              alignItems: "center",
              gap: spacing.sm,
              transition: transitions.button,
            }}
          >
            Resume ↗
          </motion.a>
        </motion.div>
      </motion.div>
      <style>{`
        @media (max-width: 1024px) {
          section[style*="padding: 0 80px"] {
            padding: 0 ${pagePadding.laptop} !important;
          }
        }
        @media (max-width: 768px) {
          section[style*="padding: 0 80px"] {
            padding: 0 ${pagePadding.tablet} !important;
          }
        }
        @media (max-width: 480px) {
          section[style*="padding: 0 80px"] {
            padding: 0 ${pagePadding.mobile} !important;
          }
        }
      `}</style>
    </section>
  );
}
