import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "../data/experience";
import type { Experience } from "../types";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import { duration, offset, stagger } from "../constants";

function ExperienceCard({ exp, i }: { exp: Experience; i: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset.ySmall }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: offset.ySmall }
      }
      transition={{
        duration: duration.medium,
        delay: i * stagger,
        ease: "easeOut",
      }}
      className="card-hover relative min-w-0 overflow-hidden rounded-card border border-border bg-bg-card"
    >
      <div className="absolute inset-y-0 left-0 w-2.5 bg-accent" />

      <div className="flex flex-col px-8 py-7">
        <div className="mb-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
            <h3 className="m-0 font-sans text-md font-semibold tracking-[-0.02em] text-text ns:text-body xl:text-body-lg">
              {exp.role}
            </h3>
            <span className="rounded-pill border border-accent/40 bg-accent/15 px-2.5 py-1 font-sans text-xxs font-semibold uppercase tracking-[0.1em] text-accent">
              {exp.type}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="my-5 font-sans text-body font-semibold text-accent">
              {exp.company}
            </span>
            <span className="text-meta text-text-muted">•</span>
            <span className="font-sans text-sm text-text-muted">
              {exp.location}
            </span>
            <span className="text-meta text-text-muted">•</span>
            <span className="font-sans text-sm text-text-muted">
              {exp.duration}
            </span>
          </div>
        </div>

        <p className="mb-5 font-sans text-body font-medium leading-[1.7] text-text-sub">
          {exp.description}
        </p>

        <div className="flex flex-wrap items-end justify-end gap-2">
          {exp.stack.map((tech: string) => (
            <span key={tech} className="tag-pill">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeader label="02 - Experience">
        Where I've <span className="text-accent">Worked</span>
      </SectionHeader>

      <div className="two-col-grid">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} i={i} />
        ))}
      </div>
    </Section>
  );
}
