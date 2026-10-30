import { projects } from "../data/projects";
import { PROJECTS_PATH } from "./router";

/**
 * Per-route page metadata. Kept out of the component file so the build-time
 * prerender can read the same values the app renders, without importing JSX.
 */
const baseUrl = "https://pixelrick.is-a.dev/";

export const home = {
  title: "Hari Krishnan R | Portfolio",
  description:
    "Creative developer portfolio showcasing projects in web, algorithms, and interactive art.",
  path: "/",
};

export const projectsPage = {
  title: "Projects | Hari Krishnan R",
  description: `All ${projects.length} projects by Hari Krishnan R: compilers, systems programming, machine learning from scratch, and full-stack web and mobile apps.`,
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
