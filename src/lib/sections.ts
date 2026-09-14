import { lazy } from "react";

export type SectionProps = {
  sectionNumber: number;
  title: string;
};

export const sections = [
  { id: "work", title: "Work", Component: lazy(() => import("../components/Projects")) },
  { id: "experience", title: "Experience", Component: lazy(() => import("../components/Experience")) },
  { id: "activity", title: "Activity", Component: lazy(() => import("../components/ActivityHeatmap")) },
  { id: "about", title: "About", Component: lazy(() => import("../components/About")) },
  { id: "skills", title: "Skills", Component: lazy(() => import("../components/Skills")) },
  { id: "contact", title: "Contact", Component: lazy(() => import("../components/Contact")) },
];