import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "../data/experience";
import type { Experience } from "../types";
import SectionHeader from "./SectionHeader";
import Section from "./Section";
import { duration, offset, stagger } from "../constants";
import type { SectionProps } from "../lib/sections";
import { IS_SERVER } from "../lib/env";

function CurrentRoleTag() {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-accent/40 bg-accent/15 px-3 font-sans text-xxs font-semibold uppercase tracking-widest text-accent">
      Current Role
    </span>
  );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="font-sans text-xxs font-semibold uppercase tracking-[0.15em] text-text-faint">
        {label}
      </dt>
      <dd className="m-0 mt-1 font-sans text-sm font-medium text-text-sub">
        {children}
      </dd>
    </div>
  );
}

function ExperienceCard({ exp, i }: { exp: Experience; i: number }) {
  const ref = useRef(null);
  const isInView =
    useInView(ref, {
      once: true,
      margin: "-80px",
    }) || IS_SERVER;

  const end = exp.endDate ?? (exp.current ? "Present" : undefined);
  const period = end ? `${exp.startDate} - ${end}` : exp.startDate;

  return (
    <motion.article
      ref={ref}
      initial={IS_SERVER ? false : { opacity: 0, y: offset.ySmall }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: offset.ySmall }
      }
      transition={{
        duration: duration.medium,
        delay: i * stagger,
        ease: "easeOut",
      }}
      className="card-hover relative flex h-full min-w-0 flex-col overflow-hidden rounded-card border border-border bg-bg-card"
    >
      <div className="absolute inset-y-0 left-0 w-2.5 bg-accent" />

      <div className="flex grow flex-col gap-5 px-8 py-7">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="m-0 font-serif text-xl font-bold leading-[1.15] tracking-[-0.02em] text-text sm:text-heading">
              {exp.company}
            </h3>
          </div>
          {exp.current && <CurrentRoleTag />}
        </header>
        <p className="m-0 mt-2 font-bold font-sans text-md text-accent">
          {exp.role}
        </p>
        <dl className="m-0 flex flex-wrap gap-x-10 gap-y-4 border-y border-border/30 py-4">
          <Detail label="Period">{period}</Detail>
          <Detail label="Location">{exp.location}</Detail>
        </dl>

        <div className="flex flex-col gap-4">
          <p className="m-0 font-sans text-body font-medium leading-[1.7] text-text-sub">
            {exp.description}
          </p>

          {exp.highlights && exp.highlights.length > 0 && (
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {exp.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 font-sans text-body leading-[1.6] text-text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.25 size-1.5 shrink-0 rounded-bar bg-accent"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0 pt-1">
          {exp.stack.map((tech: string) => (
            <li key={tech} className="tag-pill">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Experience({ sectionNumber, title }: SectionProps) {
  return (
    <Section id="experience">
      <SectionHeader sectionNumber={sectionNumber} title={title}>
        Work <span className="text-accent">Experience</span>
      </SectionHeader>

      <div className="two-col-grid">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} i={i} />
        ))}
      </div>
    </Section>
  );
}
