import { projects } from "../data/projects";
import { PROJECTS_PATH } from "./router";

const baseUrl = "https://pixelrick.is-a.dev/";

export const home = {
  title: "Harikrishnan R",
  description:
    "Creative developer portfolio showcasing projects in web, algorithms, and interactive art.",
  path: "/",
};

export const projectsPage = {
  title: "Projects",
  description: `All ${projects.length} projects by Harikrishnan R: compilers, systems programming, machine learning from scratch, and full-stack web and mobile apps.`,
  path: PROJECTS_PATH,
};

export function pageMeta(path: string) {
  const page = path === PROJECTS_PATH ? projectsPage : home;
  return {
    ...page,
    url: new URL(page.path, baseUrl).href,
    ogImage: new URL("og-image.png", baseUrl).href,
  };
}
