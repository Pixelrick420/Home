import type { Experience } from "../types";

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "IntenxMinds",
    startDate: "Aug 2026",
    current: true,
    location: "Remote",
    description:
      "Contributed across multiple active projects at 10xMinds including NimbusMobile.",
    highlights: [],
    stack: ["TypeScript", "SvelteKit", "Node"],
  },
  {
    id: 2,
    role: "Project Intern",
    company: "Oracle India",
    startDate: "May 2026",
    endDate: "Jul 2026",
    location: "Bengaluru",
    description:
      "Engineered CSS Assist, a tool for Support Engineers. Collaborated with a team of four.",
    stack: ["Rust", "Tauri", "FastAPI", "OCI"],
  },
  {
    id: 3,
    role: "Mobile App Developer Intern",
    company: "Auvieo",
    startDate: "Aug 2025",
    endDate: "Oct 2025",
    location: "Remote",
    description:
      "Designed and implemented a payment tabulation service and its accompanying mobile application.",
    stack: ["React", "Flutter", "Firebase"],
  },
];
