import { Suspense, lazy } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WaveBackground from "./components/Waves";
import SEO from "./components/SEO";
import { sections } from "./lib/sections";
import { PROJECTS_PATH, usePath, useRouterScroll } from "./lib/router";

const AllProjects = lazy(() => import("./pages/AllProjects"));

function Layout() {
  const path = usePath();
  useRouterScroll();

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

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
