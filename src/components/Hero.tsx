import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { duration, ease, offset } from "../constants";
import { scrollToId } from "../lib/scroll";
import { IS_SERVER } from "../lib/env";

const heroButtonBase =
  "flex cursor-pointer items-center gap-2 rounded-pill border border-accent px-8 py-4 font-sans text-sm font-semibold tracking-[0.05em] ns:px-6 ns:py-3";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-pad relative flex min-h-screen items-center overflow-hidden transition-colors duration-400"
    >
      <div className="absolute inset-0 z-0 bg-bg-alt opacity-80 transition-colors duration-400" />

      <motion.div
        className="relative z-2 w-full max-w-250"
        style={{ y }}
        initial={IS_SERVER ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow }}
      >
        <motion.h1
          initial={IS_SERVER ? false : { opacity: 0, y: offset.yLg }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slow, delay: 0.35, ease }}
          className="mb-4 overflow-hidden whitespace-nowrap font-serif text-5xl font-bold leading-[0.92] tracking-[-0.03em] text-text ns:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          Harikrishnan R
        </motion.h1>

        <motion.div
          initial={IS_SERVER ? false : { scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: duration.slow, delay: 0.5 }}
          className="mb-8 h-1 w-20 origin-left rounded-bar bg-accent"
        />

        <motion.p
          initial={IS_SERVER ? false : { opacity: 0, y: offset.y }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slow, delay: 0.6 }}
          className="mb-12 max-w-140 font-sans text-md-plus font-semibold leading-[1.55] text-text-sub ns:text-body sm:text-lg md:text-xl lg:text-2xl"
        >
          Full Stack Developer based in Kerala, India.
        </motion.p>

        <motion.div
          initial={IS_SERVER ? false : { opacity: 0, y: offset.y }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slow, delay: 0.75 }}
          className="flex flex-wrap gap-4"
        >
          <motion.a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#work");
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: duration.fast }}
            className={`${heroButtonBase} bg-accent text-bg no-underline transition-[background-color,box-shadow] duration-200`}
          >
            Projects
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: duration.loop,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </motion.a>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: duration.fast }}
            className={`${heroButtonBase} bg-transparent text-text no-underline transition-[background-color,border-color,color] duration-200`}
          >
            Resume ↗
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
