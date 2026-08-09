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
      "Express.js",
      "Tailwind",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Firestore"],
  },
  {
    category: "Deployment",
    items: ["Firebase", "Supabase", "Render", "Vercel"],
  },
  {
    category: "Apps",
    items: ["Flutter", "Tauri"],
  },
  {
    category: "Tools",
    items: ["Git", "Postman", "Kali Linux", "Figma"],
  },
];
