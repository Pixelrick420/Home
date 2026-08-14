import type { ReactNode, Ref } from "react";
import { useTheme } from "../context/useTheme";
import { sectionInner, sectionOverlay, sectionStyle } from "../constants";

interface SectionProps {
  id?: string;
  innerRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}

export default function Section({ id, innerRef, children }: SectionProps) {
  const { t } = useTheme();

  return (
    <section id={id} className="section-block" style={sectionStyle}>
      <div style={sectionOverlay(t.bgAlt)} />
      <div ref={innerRef} style={sectionInner}>
        {children}
      </div>
    </section>
  );
}
