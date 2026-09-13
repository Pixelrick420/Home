import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { duration, ease, offset, stagger } from "../constants";
import { useTheme } from "../context/useTheme";
import { cn } from "../lib/cn";
import { scrollToId } from "../lib/scroll";

const navLinks = [
  { label: "work", href: "#work" },
  { label: "experience", href: "#experience" },
  { label: "activity", href: "#activity" },
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

const iconClass = "block overflow-visible";

function ThemeIcon() {
  const { mode } = useTheme();
  const Icon = mode === "light" ? FaMoon : FaSun;
  return (
    <Icon size={20} viewBox="-32 -32 576 576" className={iconClass} aria-hidden="true" />
  );
}

function ThemeToggle() {
  const { mode, toggle } = useTheme();
  const label = `Switch to ${mode === "light" ? "dark" : "light"} mode`;
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={label}
      aria-label={label}
      className="flex size-9 cursor-pointer items-center justify-center border-none bg-transparent text-text transition-colors duration-200"
    >
      <ThemeIcon />
    </motion.button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  const showSolidBg = scrolled || menuOpen;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: duration.medium, ease }}
        className={cn(
          "section-pad fixed inset-x-0 top-0 z-[100] flex h-18 items-center justify-between",
          showSolidBg && "border-b border-border bg-bg-alt nav-blur",
        )}
      >
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          whileHover={{ scale: 1.02 }}
          className="font-serif text-lg font-bold uppercase tracking-[0.02em] text-text no-underline"
        >
          Pixelrick
        </motion.a>

        <div className="max-lg:hidden flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.href}
              onClick={() => go(link.href)}
              whileHover="hover"
              className="relative cursor-pointer border-none bg-transparent p-0 py-1 font-sans text-sm font-medium uppercase tracking-[0.08em] text-text"
            >
              {link.label}
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                initial={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1 } }}
                transition={{ duration: duration.fast, ease }}
              />
            </motion.button>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex max-lg:flex hidden items-center gap-4">
          <ThemeToggle />
          <motion.button
            onClick={() => setMenuOpen((o) => !o)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
            className="flex size-9 cursor-pointer items-center justify-center border-none bg-transparent text-text transition-colors duration-200"
          >
            {menuOpen ? (
              <FaTimes size={20} viewBox="-22 -32 396 576" className={iconClass} />
            ) : (
              <FaBars size={20} viewBox="-28 -32 504 576" className={iconClass} />
            )}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="section-pad fixed inset-x-0 bottom-0 top-18 z-[99] overflow-auto bg-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast }}
          >
            <div className="flex flex-col pt-12 pb-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => go(link.href)}
                  initial={{ opacity: 0, x: -offset.x }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ delay: i * stagger, duration: duration.fast, ease }}
                  className="flex w-full cursor-pointer items-baseline border-none bg-transparent p-0 py-4 text-left font-sans text-heading font-medium uppercase tracking-[0.04em] text-text"
                >
                  <span className="mr-4 font-mono text-xs text-accent opacity-80">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
