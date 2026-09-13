import { useScrollFade } from "../hooks/useScrollFade";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import { duration, offset, stagger } from "../constants";

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
  const [contentRef, visible] = useScrollFade<HTMLDivElement>({
    threshold: 0.08,
  });

  return (
    <Section id="contact" innerRef={contentRef}>
      <SectionHeader label="06 - Contact" threshold={0.08}>
        Let's build <span className="text-accent">stuff</span>
      </SectionHeader>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
        transition={{ duration: duration.slow, delay: 0.2 }}
        className="mb-14 font-sans text-lg font-extrabold leading-[1.6] text-text-sub"
      >
        Open to collaborations, interesting problems, and good conversation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
        transition={{ duration: duration.slow, delay: 0.35 }}
        className="flex flex-wrap gap-4"
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
            transition={{
              duration: duration.medium,
              delay: 0.4 + i * stagger,
            }}
            aria-label={s.label}
            title={s.label}
            className="flex items-center gap-3 rounded-card border border-border bg-bg px-7 py-4.5 text-text no-underline transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_8px_40px_color-mix(in_srgb,var(--accent)_12.5%,transparent)]"
          >
            <s.icon size={20} aria-hidden="true" />
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 0.5 : 0 }}
        transition={{ duration: duration.slow, delay: 0.6 }}
        className="mt-25 flex flex-wrap justify-end gap-4 pt-8"
      >
        <span className="text-left font-sans text-xxs font-bold text-text-muted md:text-meta">
          Harikrishnan R · Wayanad
        </span>
      </motion.div>
    </Section>
  );
}
