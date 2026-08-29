import { projects } from "./src/data/projects.js";
import { skills } from "./src/data/skills.js";
import { experiences } from "./src/data/experience.js";

export const site = {
  domain: "pixelrick.is-a.dev",
  baseUrl: "https://pixelrick.is-a.dev",
  resumeUrl: "https://pixelrick.is-a.dev/resume.pdf",
};

export const socials = [
  { label: "GitHub", url: "https://github.com/Pixelrick420" },
  { label: "LeetCode", url: "https://leetcode.com/u/Pixelrick420/" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/harikrishnan-r-41b1a3291/",
  },
];

export const linkHeader = [
  '</.well-known/ai-catalog.json>; rel="api-catalog"',
  '</.well-known/ai-catalog.json>; rel="describedby"',
  '</.well-known/agent-skills/index.json>; rel="describedby"',
].join(", ");

const PORTFOLIO_SKILL_DIGEST =
  "sha256:e203645b57f6652e3db78351f91aecde891d66edf6f0de0f7fc8c24b6bcf5d55";

export const aiCatalog = {
  specVersion: "1.0",
  host: {
    displayName: "Hari Krishnan R",
    identifier: "did:web:pixelrick.is-a.dev",
  },
  entries: [
    {
      identifier: "urn:air:pixelrick.is-a.dev:page:homepage",
      displayName: "Hari Krishnan R - Portfolio Homepage",
      type: "text/html",
      url: "https://pixelrick.is-a.dev/",
      representativeQueries: [
        "what has this developer built",
        "show me the latest projects on this portfolio",
        "summarize this developer portfolio",
      ],
    },
    {
      identifier: "urn:air:pixelrick.is-a.dev:resume:pdf",
      displayName: "Hari Krishnan R - Resume (PDF)",
      type: "application/pdf",
      url: "https://pixelrick.is-a.dev/resume.pdf",
      representativeQueries: [
        "get the resume of this developer",
        "download this portfolio owner's CV",
        "what is this person's education and experience",
      ],
    },
    {
      identifier: "urn:air:pixelrick.is-a.dev:skill:portfolio-overview",
      displayName: "Portfolio Overview Agent Skill",
      type: "text/markdown",
      url: "https://pixelrick.is-a.dev/.well-known/agent-skills/portfolio-overview/SKILL.md",
      representativeQueries: [
        "how should an agent navigate this portfolio",
        "which agent skill is published for this site",
        "summarize this site for an AI assistant",
      ],
    },
    {
      identifier: "urn:air:pixelrick.is-a.dev:mcp:portfolio",
      displayName: "Portfolio MCP Server Card",
      type: "application/mcp-server-card+json",
      url: "https://pixelrick.is-a.dev/.well-known/mcp/server-card.json",
      representativeQueries: [
        "does this site expose an MCP server",
        "what MCP capabilities does this portfolio advertise",
        "discover MCP tooling for this domain",
      ],
    },
    {
      identifier: "urn:air:pixelrick.is-a.dev:index:agent-skills",
      displayName: "Agent Skills Discovery Index",
      type: "application/json",
      url: "https://pixelrick.is-a.dev/.well-known/agent-skills/index.json",
      representativeQueries: [
        "list the agent skills published on this domain",
        "discover skills for this website",
        "which skills can agents load from pixelrick.is-a.dev",
      ],
    },
  ],
};

export const agentSkillsIndex = {
  $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  skills: [
    {
      name: "portfolio-overview",
      type: "skill-md",
      description:
        "Guide for AI agents to navigate, summarize, and extract information from Hari Krishnan R's developer portfolio at pixelrick.is-a.dev - projects, experience, skills, and contact details.",
      url: "https://pixelrick.is-a.dev/.well-known/agent-skills/portfolio-overview/SKILL.md",
      digest: PORTFOLIO_SKILL_DIGEST,
    },
  ],
};

export const mcpServerCard = {
  serverInfo: {
    name: "pixelrick-portfolio",
    version: "1.0.0",
  },
  endpoint: "https://pixelrick.is-a.dev/mcp",
  capabilities: {
    tools: { listChanged: false },
    resources: {},
    prompts: {},
  },
};

const aboutLines = [
  "I'm a Computer Science undergraduate at Government Engineering College, Thrissur.",
  "Having completed multiple internships and projects, I'm looking to apply what I have learned so far, explore new technologies, and connect with others in the field.",
  "My work spans machine learning, web development, systems programming, and the occasional satirical VS Code extension.",
  "I like experimenting and breaking things.",
];

function socialMarkdown(): string {
  const lines = socials.map((s) => `- ${s.label}: ${s.url}`);
  return ["## Contact", "", ...lines, ""].join("\n");
}

function resumeMarkdown(): string {
  return [
    "## Resume",
    "",
    `Download the resume (PDF): ${site.resumeUrl}`,
    "",
  ].join("\n");
}

function skillsMarkdown(): string {
  const groups = skills
    .map(
      (group) =>
        `### ${group.category}\n` + group.items.map((i) => `- ${i}`).join("\n"),
    )
    .join("\n");
  return ["## Skills", "", groups, ""].join("\n");
}

function experienceMarkdown(): string {
  const items = experiences
    .map(
      (e) =>
        `### ${e.role} - ${e.company} (${e.type}, ${e.duration}, ${e.location})\n` +
        `${e.description}\n` +
        `Stack: ${e.stack.join(", ")}`,
    )
    .join("\n");
  return ["## Experience", "", items, ""].join("\n");
}

function projectsMarkdown(): string {
  const items = projects
    .map((p) => {
      const lines = [`### ${p.title} (${p.year})`, "", p.description, ""];
      lines.push(`Tags: ${p.tags.join(", ")}`);
      lines.push(`GitHub: ${p.github}`);
      if (p.demo) lines.push(`Demo: ${p.demo}`);
      return lines.join("\n");
    })
    .join("\n\n");
  return ["## Projects", "", items, ""].join("\n");
}

export function renderMarkdownHome(): string {
  return [
    "# Hari Krishnan R | Portfolio",
    "",
    "Creative developer portfolio showcasing projects in web, algorithms, and interactive art.",
    "",
    "## About",
    "",
    ...aboutLines.map((line) => `> ${line}`),
    "",
    experienceMarkdown(),
    skillsMarkdown(),
    projectsMarkdown(),
    socialMarkdown(),
    resumeMarkdown(),
    "",
  ].join("\n");
}
