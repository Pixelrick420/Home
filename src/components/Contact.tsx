import { useRef } from "react";
import { useScrollFade } from "../hooks/useScrollFade";
import { useTheme } from "../context/useTheme";
import { fonts } from "../theme";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { SiLeetcode } from "@react-icons/all-files/si/SiLeetcode";
import { motion } from "framer-motion";
import {
  alpha,
  contactSection,
  duration,
  fontSize,
  hexAlpha,
  offset,
  radius,
  sectionInner,
  sectionOverlay,
  sectionStyle,
  spacing,
  stagger,
  transitions,
} from "../constants";

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ ...sectionStyle, padding: contactSection.base }}
    >
      <div style={sectionOverlay(t.bgAlt)} />

      <div ref={contentRef} style={sectionInner}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: duration.slow }}
          className="section-header"
        >
          <span
            className="section-label"
            style={{
              color: t.accentHover,
            }}
          >
            05 - Contact
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
            transition={{ duration: duration.slow, delay: 0.1 }}
            className="section-title"
          >
            Let's build <span style={{ color: t.accent }}>something</span>
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: duration.slow, delay: 0.2 }}
          style={{
            fontFamily: fonts.sans,
            fontSize: fontSize.lg,
            color: t.textSub,
            margin: `0 0 56px 0`,
            lineHeight: 1.6,
            fontWeight: 800,
          }}
        >
          Open to collaborations, interesting problems, and good conversation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: duration.slow, delay: 0.35 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: spacing.lg,
          }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: offset.ySmall }}
              animate={{
                opacity: visible ? 1 : 0,
                y: visible ? 0 : offset.ySmall,
              }}
              transition={{ duration: duration.medium, delay: 0.4 + i * stagger }}
              aria-label={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: spacing.md,
                padding: "18px 28px",
                backgroundColor: t.bg,
                border: `1px solid ${t.border}`,
                borderRadius: radius.card,
                textDecoration: "none",
                color: t.text,
                transition: transitions.card,
              }}
              onMouseEnter={(e) => {
                const a = e.currentTarget as HTMLAnchorElement;
                a.style.borderColor = t.accent;
                a.style.boxShadow = `0 8px 40px ${t.accent}${hexAlpha.shadow}`;
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
          animate={{ opacity: visible ? alpha.footer : 0 }}
          transition={{ duration: duration.slow, delay: 0.6 }}
          style={{
            marginTop: "100px",
            paddingTop: spacing.xxl,
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: spacing.lg,
          }}
        >
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: "clamp(8px, 2vh, 13px)",
              fontWeight: 700,
              color: t.textMuted,
              textAlign: "left",
            }}
          >
            Harikrishnan R · Wayanad
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section#contact {
            padding: ${contactSection.laptop} !important;
          }
        }
        @media (max-width: 768px) {
          section#contact {
            padding: ${contactSection.tablet} !important;
          }
        }
        @media (max-width: 480px) {
          section#contact {
            padding: ${contactSection.mobile} !important;
          }
        }
      `}</style>
    </section>
  );
}
