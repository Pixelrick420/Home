import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WaveBackground from "./components/Waves";
const Projects = lazy(() => import("./components/Projects"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
import SEO from "./components/SEO";

function Layout() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Analytics />
      <SEO />
      <WaveBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div style={{ height: "100vh" }} />}>
            <Projects />
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
