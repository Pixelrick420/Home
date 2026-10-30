/*
 * Injects a prerendered copy of each route into the built HTML, so the site
 * shows its full content when JavaScript is unavailable.
 *
 * Runs after `vite build` (see the `postbuild` script) and can also be pointed
 * at another build directory: `node scripts/prerender.mjs /tmp/some-dist`.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(PROJECT_ROOT, process.argv[2] ?? "dist");
const shellPath = join(distDir, "index.html");
const ROOT_MARKER = '<div id="root"></div>';

function fail(message) {
  throw new Error(message);
}

/** Pulls the head tags React rendered inline, leaving the page markup behind. */
function splitHeadTags(html) {
  const match = html.match(
    /^(?:\s*(?:<meta\b[^>]*>|<link\b[^>]*>|<title\b[^>]*>[\s\S]*?<\/title>))+/,
  );
  if (!match) return { headTags: "", body: html };
  return { headTags: match[0].trim(), body: html.slice(match[0].length) };
}

/**
 * Marks the injected tags so the app can drop them at its first commit.
 * React 19 hoists the `<meta>`/`<link>` elements rendered by `<Helmet>` into
 * `<head>` itself, so leaving this copy in place would publish two canonicals.
 * With JavaScript off the app never mounts, so these stay.
 */
function markPrerendered(tags) {
  return tags.replace(
    /<(meta|link)\b(?![^>]*\bdata-prerender=)/g,
    '<$1 data-prerender="true"',
  );
}

function insertBeforeHeadEnd(shell, markup) {
  if (!markup) return shell;
  return shell.replace(/(\n[ \t]*)<\/head>/, `$1${markup}$1</head>`);
}

function buildPage({ shell, appHtml, detailsHtml, meta }) {
  const { headTags, body } = splitHeadTags(appHtml);

  let page = shell;
  page = page.replace(
    ROOT_MARKER,
    `<div id="root" data-prerendered>${body}${detailsHtml}</div>`,
  );
  page = page.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${meta.title}</title>`,
  );
  page = page.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${meta.description}" />`,
  );
  return insertBeforeHeadEnd(page, markPrerendered(headTags));
}

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function assertPage(page, { path, appHtml, meta, projectCount, sectionIds }) {
  const problems = [];

  if (count(page, "<title>") !== 1)
    problems.push("expected exactly one <title>");
  if (!page.includes(`<title>${meta.title}</title>`))
    problems.push(`title is not ${JSON.stringify(meta.title)}`);
  if (!page.includes(`content="${meta.description}"`))
    problems.push("description meta was not updated");
  if (!page.includes('rel="canonical"')) problems.push("no canonical link");
  if (!page.includes('data-prerender="true"'))
    problems.push("no prerendered head tags were injected");
  if (!page.includes("data-prerendered"))
    problems.push("#root is not marked data-prerendered");

  // The static render must not leave React's streaming reveal scripts behind:
  // they are what made streamed Suspense output invisible without JavaScript.
  for (const leftover of ['id="S:0"', "$RC(", "<div hidden"]) {
    if (page.includes(leftover)) {
      problems.push(`leftover render marker ${leftover}`);
    }
  }

  if (appHtml.trim().length < 5000) problems.push("rendered app looks empty");

  if (count(page, 'class="static-details-item"') !== projectCount)
    problems.push(
      `details section has ${count(page, 'class="static-details-item"')} of ${projectCount} projects`,
    );

  // One hidden element is intentional: the heatmap tooltip, which has no
  // trigger without JavaScript. Anything more means an entrance animation is
  // still hiding content from no-JS visitors.
  const hidden = (page.match(/opacity:0(?![\d.])/g) ?? []).length;
  if (hidden > 1) problems.push(`${hidden} elements rendered with opacity:0`);

  if (path === "/") {
    if (!page.includes("<h1")) problems.push("no <h1>");
    for (const id of sectionIds) {
      if (!page.includes(`id="${id}"`)) problems.push(`missing section #${id}`);
    }
  }

  if (problems.length > 0) {
    fail(`${path} failed its checks:\n  - ${problems.join("\n  - ")}`);
  }
  return hidden;
}

async function main() {
  if (!existsSync(shellPath)) {
    fail(`no ${shellPath} — run the build first`);
  }

  const shell = readFileSync(shellPath, "utf8");
  if (!shell.includes(ROOT_MARKER)) {
    fail(
      `${shellPath} has no exact ${ROOT_MARKER} marker — was it already prerendered, or did index.html change?`,
    );
  }

  const server = await createServer({
    root: PROJECT_ROOT,
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });

  try {
    const mod = await server.ssrLoadModule("/src/prerender.tsx");
    const { sections } = await server.ssrLoadModule("/src/lib/sections.ts");
    const { eagerSections } = await server.ssrLoadModule(
      "/src/lib/eagerSections.ts",
    );
    const { projects, featuredProjects } = await server.ssrLoadModule("/src/data/projects.ts");

    const key = (section) => `${section.id}:${section.title}`;
    const lazyIds = sections.map(key).join(",");
    const eagerIds = eagerSections.map(key).join(",");
    if (lazyIds !== eagerIds) {
      fail(
        `src/lib/eagerSections.ts has drifted from src/lib/sections.ts:\n  lazy:  ${lazyIds}\n  eager: ${eagerIds}`,
      );
    }

    mod.assertRoutes();

    for (const [path, meta] of Object.entries(mod.routeMeta)) {
      const appHtml = mod.renderRoute(path);
      const detailsHtml = mod.renderStaticDetails(path);
      const projectCount = path === "/" ? featuredProjects.length : projects.length;
      const page = buildPage({ shell, appHtml, detailsHtml, meta });
      const hidden = assertPage(page, {
        path,
        appHtml,
        meta,
        projectCount,
        sectionIds: eagerSections.map((section) => section.id),
      });

      const outPath =
        path === "/"
          ? join(distDir, "index.html")
          : join(distDir, path, "index.html");
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, page);

      const size = `${(page.length / 1024).toFixed(1)} kB`;
      const hiddenNote =
        hidden === 0
          ? "no hidden content"
          : `${hidden} intentionally hidden element`;
      console.log(`prerender: ${path} -> ${outPath} (${size}, ${hiddenNote})`);
    }
  } finally {
    await server.close();
  }
}

main().catch((error) => {
  console.error(`\nprerender failed: ${error.message}\n`);
  process.exit(1);
});
