import type { Experience } from "../types";
export const experiences: Experience[] = [
  {
    id: 1,
    role: "Mobile App Developer",
    company: "Auvieo",
    type: "Internship",
    duration: "3 months",
    location: "Remote",
    description:
      "Designed and implemented a payment tabulation service and its accompanying mobile application.",
    stack: ["React", "Flutter", "Firebase"],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Intenxminds Private Limmited",
    type: "Internship",
    duration: "3 months",
    location: "Remote",
    description:
      "Contributed across multiple active projects at 10xMinds including NimbusMobile.",
    stack: ["TypeScript", "SvelteKit", "Node"],
  },
  {
    id: 3,
    role: "Project Intern",
    company: "Oracle India Private Limited",
    type: "Internship",
    duration: "2 months",
    location: "Bengaluru",
    description:
      "Engineered CSS Assist, a support assistant collaborating with a team of four.",
    stack: ["Rust", "Tauri", "FastAPI", "OCI"],
  },
];
