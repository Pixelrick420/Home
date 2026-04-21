import type { SkillGroup } from "../types";

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "C", "C++", "Java", "Rust", "Dart", "TypeScript"],
  },
  {
    category: "Web",
    items: [
      "React",
      "Sveltekit",
      "Node.js",
      "Next.js",
      "Express.js",
      "Vite",
      "Tailwind",
    ],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "Firestore", "SQLite"],
  },
  {
    category: "Deployment",
    items: ["Firebase", "Supabase", "Render", "Vercel"],
  },
  {
    category: "Mobile",
    items: ["Flutter", "Android SDK"],
  },
  {
    category: "Tools",
    items: ["Git", "Postman", "Kali Linux", "Figma"],
  },
];
