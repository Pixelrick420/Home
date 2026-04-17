import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { useTheme } from "../context/ThemeContext";
import { fonts } from "../theme";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion, useScroll, useTransform } from "framer-motion";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Pixelrick420",
    icon: FaGithub,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Pixelrick420/",
    icon: SiLeetcode,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harikrishnan-r-41b1a3291/",
    icon: FaLinkedin,
  },
];

export default function Contact() {
  const { t } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [contentRef, visible] = useScrollFade<HTMLDivElement>({
    threshold: 0.08,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Contact.tsx - return part only
  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "120px 80px 100px",
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
          top: "20%",
          right: "15%",
          width: "500px",
          height: "500px",
          background: `radial-gradient(circle, ${t.accent}12 0%, transparent 60%)`,
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
          y,
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="section-label">04 — Contact</span>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title"
          >
            Let's build <span style={{ color: t.accent }}>something.</span>
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: fonts.sans,
            fontSize: "18px",
            color: t.textSub,
            margin: "0 0 56px 0",
            lineHeight: 1.6,
          }}
        >
          Open to collaborations, interesting problems, and good conversation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "18px 28px",
                backgroundColor: t.bg,
                border: `1px solid ${t.border}`,
                borderRadius: "16px",
                textDecoration: "none",
                color: t.text,
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                const a = e.currentTarget as HTMLAnchorElement;
                a.style.borderColor = t.accent;
                a.style.boxShadow = `0 8px 40px ${t.accent}20`;
              }}
              onMouseLeave={(e) => {
                const a = e.currentTarget as HTMLAnchorElement;
                a.style.borderColor = t.border;
                a.style.boxShadow = "none";
              }}
            >
              <s.icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.5 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: "100px",
            paddingTop: "32px",
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: "13px",
              color: t.textMuted,
            }}
          >
            Harikrishnan R · GEC Thrissur
          </span>
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: "13px",
              color: t.textMuted,
            }}
          >
            {new Date().getFullYear()} · Built with Vite + React
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section#contact {
            padding: 100px 48px 80px !important;
          }
        }
        @media (max-width: 768px) {
          section#contact {
            padding: 80px 32px 60px !important;
          }
        }
        @media (max-width: 480px) {
          section#contact {
            padding: 60px 20px 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
