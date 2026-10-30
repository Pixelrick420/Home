import { Suspense, lazy, useEffect, useLayoutEffect } from "react";
import type { ComponentType } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WaveBackground from "./components/Waves";
import SEO from "./components/SEO";
import { sections as defaultSections, type SectionItem } from "./lib/sections";
import { PROJECTS_PATH, usePath, useRouterScroll } from "./lib/router";

const LazyAllProjects = lazy(() => import("./pages/AllProjects"));

export interface AppProps {
  sections?: SectionItem[];
  AllProjects?: ComponentType;
}

const useRevealAfterMount =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function Layout({
  sections,
  AllProjects,
}: {
  sections: SectionItem[];
  AllProjects: ComponentType;
}) {
  const path = usePath();
  useRouterScroll();

  useRevealAfterMount(() => {
    document.getElementById("root")?.removeAttribute("data-prerendered");

    for (const tag of document.querySelectorAll("head [data-prerender]")) {
      tag.remove();
    }
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden scrollbar-none [ms-overflow-style:none]">
      <Analytics />
      <SEO path={path} />
      <WaveBackground />
      <div className="relative z-1">
        <Navbar />
        <main>
          {path === PROJECTS_PATH ? (
            <Suspense fallback={<div className="min-h-screen" />}>
              <AllProjects />
            </Suspense>
          ) : (
            <>
              <Hero />
              <Suspense fallback={<div className="min-h-screen" />}>
                {sections.map(({ Component, id, title }, index) => (
                  <Component key={id} sectionNumber={index + 1} title={title} />
                ))}
              </Suspense>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App({
  sections = defaultSections,
  AllProjects = LazyAllProjects,
}: AppProps = {}) {
  return (
    <ThemeProvider>
      <Layout sections={sections} AllProjects={AllProjects} />
    </ThemeProvider>
  );
}
