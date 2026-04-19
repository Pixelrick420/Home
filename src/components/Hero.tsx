import { useEffect, useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { fonts } from "../theme";
import { motion, useScroll, useTransform } from "framer-motion";

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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "0 80px",
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
          transition: "background-color 0.4s ease",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
          background: `radial-gradient(circle, ${t.accent}15 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1000px",
          y,
          opacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: "32px" }}
        >
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: "clamp(5px, 2.5vw, 12px)",
              padding: "clamp(6px, 2vw, 10px) clamp(12px, 4vw, 20px)",
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: t.accent,
              backgroundColor: mode === "light" ? "#FAFAFA" : "#1A1A1A",
              borderRadius: "50px",
              display: "inline-block",
            }}
          >
            CS Undergrad · Programmer · Pixelrick
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: fonts.serif,
            fontSize: "clamp(42px, 8vw, 140px)",
            fontWeight: 700,
            color: t.text,
            lineHeight: 0.92,
            margin: "0 0 16px 0",
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
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            width: "80px",
            height: "4px",
            backgroundColor: t.accent,
            borderRadius: "2px",
            marginBottom: "32px",
            transformOrigin: "left",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontFamily: fonts.sans,
            fontSize: "clamp(18px, 2.5vw, 26px)",
            fontWeight: 400,
            color: t.textSub,
            maxWidth: "560px",
            lineHeight: 1.55,
            margin: "0 0 48px 0",
          }}
        >
          Building things from the ground up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.75 }}
          style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
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
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: fonts.sans,
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: t.bg,
              backgroundColor: t.accent,
              border: `1px solid ${t.accent}`,
              padding: "16px 32px",
              cursor: "pointer",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background-color 0.2s, box-shadow 0.2s",
            }}
          >
            View Work
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: fonts.sans,
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: t.text,
              textDecoration: "none",
              backgroundColor: "transparent",
              border: `1px solid ${t.accent}`,
              padding: "16px 32px",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition:
                "background-color 0.2s, border-color 0.2s, color 0.2s",
            }}
          >
            Resume ↗
          </motion.a>
        </motion.div>
      </motion.div>
      <style>{`
        @media (max-width: 1024px) {
          section[style*="padding: 0 80px"] {
            padding: 0 48px !important;
          }
        }
        @media (max-width: 768px) {
          section[style*="padding: 0 80px"] {
            padding: 0 32px !important;
          }
        }
        @media (max-width: 480px) {
          section[style*="padding: 0 80px"] {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
