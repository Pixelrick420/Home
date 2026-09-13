import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WaveBackground from "./components/Waves";
import SEO from "./components/SEO";

const Projects = lazy(() => import("./components/Projects"));
const Activity = lazy(() => import("./components/ActivityHeatmap"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const Experience = lazy(() => import("./components/Experience"));

function Layout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden [scrollbar-width:none] [ms-overflow-style:none]">
      <Analytics />
      <SEO />
      <WaveBackground />
      <div className="relative z-[1]">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Projects />
            <Experience />
            <Activity />
            <About />
            <Skills />
            <Contact />
          </Suspense>
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
