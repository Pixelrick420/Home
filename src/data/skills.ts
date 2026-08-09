import type { SkillGroup } from "../types";

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "C", "Rust", "Dart", "TypeScript"],
  },
  {
    category: "Web",
    items: [
      "React",
      "Sveltekit",
      "Node.js",
      "Tailwind",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Firestore"],
  },
  {
    category: "DevOps",
    items: ["Docker", "Podman"],
  },
  {
    category: "Apps",
    items: ["Flutter", "Tauri"],
  },
  {
    category: "Tools",
    items: ["Git", "Postman", "Figma"],
  },
];
