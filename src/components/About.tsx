import { useScrollFade } from "../hooks/useScrollFade";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import { duration, ease, stagger } from "../constants";

const currently = [
  { label: "Studying", value: "B.Tech CSE @ GEC Thrissur" },
  { label: "Exploring", value: "Compilers, Web Design, Systems" },
  { label: "Building", value: "Whatever seems interesting" },
  { label: "Located", value: "Kerala, India" },
];

const languages = ["Hindi", "English", "Malayalam"];

export default function About() {
  const [contentRef, visible] = useScrollFade<HTMLDivElement>({
    threshold: 0.08,
  });

  return (
    <Section id="about" innerRef={contentRef}>
      <SectionHeader label="04 - About" threshold={0.08}>
        Hello <span className="text-accent">:D</span>
      </SectionHeader>

      <div
        className="grid w-full min-w-0 max-w-full gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
        }}
      >
        {/* LEFT CARD */}
        <div className="card-hover relative flex min-w-0 flex-col overflow-hidden rounded-card border border-border bg-bg-card px-8 py-12">
          <div className="absolute inset-y-0 left-0 w-2.5 bg-accent" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
            transition={{ duration: duration.slow, delay: 0.15, ease }}
            className="flex w-full min-w-0 flex-grow flex-col gap-3"
          >
            <p className="mx-[2%] font-sans text-body font-semibold leading-[1.7] text-text [overflow-wrap:anywhere] sm:text-md lg:text-xl">
              I'm a Computer Science undergraduate at Government Engineering
              College, Thrissur. Having completed multiple internships and
              projects, I'm looking to apply what I have learnt so far, explore
              new technologies, and connect with others in the field.
            </p>

            <p className="mx-[2%] font-sans text-body font-semibold leading-[1.7] text-text [overflow-wrap:anywhere] sm:text-md lg:text-xl">
              My work spans machine learning, web development, systems
              programming, and the occasional satirical VS Code extension.
              <br />I like experimenting and breaking things.
            </p>

            <div className="mt-5 flex min-w-0 flex-row-reverse flex-wrap gap-2">
              {languages.map((lang, i) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: visible ? 1 : 0,
                    scale: visible ? 1 : 0.8,
                  }}
                  transition={{
                    duration: duration.medium,
                    delay: 0.4 + i * stagger,
                  }}
                  className="tag-pill"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="card-hover relative min-w-0 overflow-hidden rounded-card border border-border bg-bg-card px-8 py-12">
          <div className="absolute inset-y-0 left-0 w-2.5 bg-accent" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
            transition={{ duration: duration.slow, delay: 0.25, ease }}
            className="w-full min-w-0"
          >
            <div className="mb-7 flex min-w-0 items-center gap-3">
              <div className="h-5 w-1 shrink-0 rounded-bar bg-accent" />

              <h3 className="m-0 min-w-0 font-sans text-meta font-semibold uppercase tracking-[0.2em] text-text-muted [overflow-wrap:anywhere]">
                Currently
              </h3>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-1">
              {currently.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  className="flex w-full min-w-0 flex-col items-start gap-1 border-b border-border py-5"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -30 }}
                  transition={{
                    duration: duration.medium,
                    delay: 0.4 + i * stagger,
                  }}
                >
                  <span className="font-sans text-body font-semibold text-text sm:text-md lg:text-xl">
                    {label}
                  </span>

                  <span className="min-w-0 font-sans text-md-plus font-medium leading-[1.7] text-text-sub [overflow-wrap:anywhere] [word-break:break-word]">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
