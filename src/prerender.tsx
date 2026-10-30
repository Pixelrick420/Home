import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import {
  StaticDetailsHome,
  StaticDetailsAll,
} from "./components/StaticDetails";
import { eagerAllProjects, eagerSections } from "./lib/eagerSections";
import { PROJECTS_PATH, setServerPath } from "./lib/router";
import { home, projectsPage } from "./lib/seoMeta";

export const routeMeta = {
  "/": home,
  [PROJECTS_PATH]: projectsPage,
} as const;

export type PrerenderPath = keyof typeof routeMeta;

function render(element: Parameters<typeof renderToStaticMarkup>[0]): string {
  return renderToStaticMarkup(<HelmetProvider>{element}</HelmetProvider>);
}

export function renderRoute(path: PrerenderPath): string {
  setServerPath(path);
  try {
    return render(
      <App sections={eagerSections} AllProjects={eagerAllProjects} />,
    );
  } finally {
    setServerPath(null);
  }
}

export function renderStaticDetails(path: PrerenderPath): string {
  return path === "/"
    ? renderToStaticMarkup(<StaticDetailsHome />)
    : renderToStaticMarkup(<StaticDetailsAll />);
}

export function assertRoutes(): void {
  const missing = ["/", PROJECTS_PATH].filter((path) => !(path in routeMeta));
  if (missing.length > 0) {
    throw new Error(`Missing SEO metadata for route(s): ${missing.join(", ")}`);
  }
}
