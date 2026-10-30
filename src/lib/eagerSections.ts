import type { ComponentType } from "react";
import About from "../components/About";
import ActivityHeatmap from "../components/ActivityHeatmap";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import AllProjects from "../pages/AllProjects";
import type { SectionItem } from "./sections";

export const eagerSections: SectionItem[] = [
  { id: "work", title: "Work", Component: Projects },
  { id: "experience", title: "Experience", Component: Experience },
  { id: "activity", title: "Activity", Component: ActivityHeatmap },
  { id: "about", title: "About", Component: About },
  { id: "skills", title: "Skills", Component: Skills },
  { id: "contact", title: "Contact", Component: Contact },
];

export const eagerAllProjects: ComponentType = AllProjects;
