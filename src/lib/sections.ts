import { lazy, type ComponentType } from "react";

export type SectionProps = {
  sectionNumber: number;
  title: string;
};

export type SectionItem = {
  id: string;
  title: string;
  Component: ComponentType<SectionProps>;
};

export const sections: SectionItem[] = [
  { id: "work", title: "Work", Component: lazy(() => import("../components/Projects")) },
  { id: "experience", title: "Experience", Component: lazy(() => import("../components/Experience")) },
  { id: "activity", title: "Activity", Component: lazy(() => import("../components/ActivityHeatmap")) },
  { id: "about", title: "About", Component: lazy(() => import("../components/About")) },
  { id: "skills", title: "Skills", Component: lazy(() => import("../components/Skills")) },
  { id: "contact", title: "Contact", Component: lazy(() => import("../components/Contact")) },
];
