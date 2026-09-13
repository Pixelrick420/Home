import type { ReactNode, Ref } from "react";

interface SectionProps {
  children: ReactNode;
  id: string;
  innerRef?: Ref<HTMLDivElement>;
}

export default function Section({ id, innerRef, children }: SectionProps) {
  return (
    <section
      id={id}
      className="section-block section-pad relative transition-colors duration-400"
    >
      <div className="absolute inset-0 z-0 bg-bg-alt opacity-70 transition-colors duration-400" />
      <div
        ref={innerRef}
        className="relative z-[2] mx-auto w-full max-w-[1200px]"
      >
        {children}
      </div>
    </section>
  );
}
