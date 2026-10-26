import { Helmet } from "react-helmet-async";
import { projects } from "../data/projects";
import { PROJECTS_PATH } from "../lib/router";

const baseUrl = "https://pixelrick.is-a.dev/";

const home = {
  title: "Hari Krishnan R | Portfolio",
  description:
    "Creative developer portfolio showcasing projects in web, algorithms, and interactive art.",
  path: "/",
};

const projectsPage = {
  title: "Projects | Hari Krishnan R",
  description: `All ${projects.length} projects by Hari Krishnan R: compilers, systems programming, machine learning from scratch, and full-stack web and mobile apps.`,
  path: PROJECTS_PATH,
};

export default function SEO({ path }: { path: string }) {
  const page = path === PROJECTS_PATH ? projectsPage : home;
  const { title, description } = page;
  const url = new URL(page.path, baseUrl).href;
  const ogImage = new URL("og-image.png", baseUrl).href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
}
