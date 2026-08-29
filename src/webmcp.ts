import { projects } from "./data/projects";
import { skills } from "./data/skills";

interface WebMCPTool {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>, options: unknown) => Promise<unknown> | unknown;
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
}

interface WebMCPModelContext {
  registerTool(tool: WebMCPTool, options?: { signal?: AbortSignal }): Promise<void>;
}

interface ModelContextHost {
  modelContext?: WebMCPModelContext;
}

const controller = new AbortController();

const readOnlyAnnotation = { readOnlyHint: true, untrustedContentHint: false };

const noArgsSchema = { type: "object", properties: {}, additionalProperties: false };

const tools: WebMCPTool[] = [
  {
    name: "get_projects",
    title: "List portfolio projects",
    description:
      "Returns the open-source projects in Hari Krishnan R's portfolio, including title, year, one-line summary, technologies, GitHub link, and live demo link where available. Use when asked about this developer's work or projects.",
    inputSchema: noArgsSchema,
    annotations: readOnlyAnnotation,
    execute: () =>
      projects.map((p) => ({
        title: p.title,
        year: p.year,
        description: p.description,
        tags: p.tags,
        github: p.github,
        demo: p.demo,
      })),
  },
  {
    name: "get_resume",
    title: "Get resume link",
    description:
      "Returns the URL to Hari Krishnan R's PDF resume. Use when asked for a CV or resume.",
    inputSchema: noArgsSchema,
    annotations: readOnlyAnnotation,
    execute: () => ({ url: "https://pixelrick.is-a.dev/resume.pdf" }),
  },
  {
    name: "get_about",
    title: "About the developer",
    description:
      "Returns biography, education, current interests, and the skills overview for Hari Krishnan R.",
    inputSchema: noArgsSchema,
    annotations: readOnlyAnnotation,
    execute: () => ({
      name: "Hari Krishnan R",
      location: "Kerala, India",
      studying: "B.Tech CSE @ GEC Thrissur",
      bio: "Computer Science undergraduate with experience in machine learning, web development, and systems programming.",
      skills: skills.map((group) => ({
        category: group.category,
        items: group.items,
      })),
    }),
  },
  {
    name: "get_contact_info",
    title: "Contact links",
    description:
      "Returns the website, GitHub, LeetCode, and LinkedIn links for Hari Krishnan R. Use when asked how to reach or follow this developer.",
    inputSchema: noArgsSchema,
    annotations: readOnlyAnnotation,
    execute: () => ({
      website: "https://pixelrick.is-a.dev",
      github: "https://github.com/Pixelrick420",
      leetcode: "https://leetcode.com/u/Pixelrick420/",
      linkedin: "https://www.linkedin.com/in/harikrishnan-r-41b1a3291/",
      location: "Kerala, India",
    }),
  },
];

function getModelContext(): WebMCPModelContext | undefined {
  const doc = document as Document & ModelContextHost;
  if (doc.modelContext) return doc.modelContext;

  const nav = navigator as Navigator & ModelContextHost;
  return nav.modelContext;
}

export function registerWebMCPTools(): void {
  const modelContext = getModelContext();
  if (!modelContext?.registerTool) return;

  for (const tool of tools) {
    modelContext.registerTool(tool, { signal: controller.signal }).catch(() => undefined);
  }

  window.addEventListener("pagehide", () => controller.abort(), { once: true });
}