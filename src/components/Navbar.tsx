import { useState, useEffect } from "react";
import { useTheme } from "../context/useTheme";
import { fonts } from "../theme";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import {
  alpha,
  duration,
  ease,
  fontSize,
  iconButtonStyle,
  offset,
  pagePadding,
  spacing,
  stagger,
  transitions,
  zIndex,
} from "../constants";

const navLinks = [
  { label: "work", href: "#work" },
  { label: "experience", href: "#experience" },
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const { t, mode, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSolidBg = scrolled || menuOpen;

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: duration.medium, ease }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: zIndex.nav,
          padding: `0 ${pagePadding.desktop}`,
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: showSolidBg ? t.bgAlt : "transparent",
          borderBottom: `1px solid ${showSolidBg ? t.border : "transparent"}`,
        }}
        className={showSolidBg ? "nav-blur" : undefined}
      >
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          whileHover={{ scale: 1.02 }}
          style={{
            fontFamily: fonts.serif,
            fontSize: fontSize.lg,
            fontWeight: 700,
            color: t.text,
            textDecoration: "none",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          Pixelrick
        </motion.a>

        <div
          className="desk-nav"
          aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          style={{ display: "flex", alignItems: "center", gap: spacing.xxl }}
        >
          {navLinks.map((link) => (
            <motion.button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                fontFamily: fonts.sans,
                fontSize: fontSize.sm,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: t.text,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: `${spacing.xs} 0`,
                position: "relative",
              }}
              whileHover="hover"
            >
              {link.label}
              <motion.span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: t.accent,
                }}
                initial={{ scaleX: 0 }}
                variants={{
                  hover: { scaleX: 1 },
                }}
                transition={{ duration: duration.fast, ease }}
              />
            </motion.button>
          ))}
          <motion.button
            onClick={toggle}
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...iconButtonStyle(t),
              transition: transitions.color,
            }}
          >
            {mode === "light" ? (
              <FaMoon
                size={20}
                viewBox="-32 -32 576 576"
                style={{ display: "block", overflow: "visible" }}
              />
            ) : (
              <FaSun
                size={20}
                viewBox="-32 -32 576 576"
                style={{ display: "block", overflow: "visible" }}
              />
            )}
          </motion.button>
        </div>

        <div
          className="mob-controls"
          aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          style={{ display: "none", alignItems: "center", gap: spacing.lg }}
        >
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            style={iconButtonStyle(t)}
          >
            {mode === "light" ? (
              <FaMoon
                size={20}
                viewBox="-32 -32 576 576"
                style={{ display: "block", overflow: "visible" }}
                aria-hidden="true"
              />
            ) : (
              <FaSun
                size={20}
                viewBox="-32 -32 576 576"
                style={{ display: "block", overflow: "visible" }}
                aria-hidden="true"
              />
            )}
          </motion.button>
          <motion.button
            onClick={() => setMenuOpen((o: boolean) => !o)}
            whileTap={{ scale: 0.9 }}
            style={iconButtonStyle(t)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FaTimes
                size={20}
                viewBox="-22 -32 396 576"
                style={{ display: "block", overflow: "visible" }}
              />
            ) : (
              <FaBars
                size={20}
                viewBox="-28 -32 504 576"
                style={{ display: "block", overflow: "visible" }}
              />
            )}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mob-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast }}
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: zIndex.navMenu,
              backgroundColor: t.bg,
              padding: `0 ${pagePadding.desktop}`,
              overflow: "auto",
            }}
          >
            <div style={{ padding: `${spacing.huge} 0 ${spacing.xl}` }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  initial={{ opacity: 0, x: -offset.x }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * stagger,
                    duration: duration.fast,
                    ease,
                  }}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    width: "100%",
                    textAlign: "left",
                    fontFamily: fonts.sans,
                    fontSize: fontSize.heading,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: t.text,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: `${spacing.lg} 0`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: fontSize.xs,
                      color: t.accent,
                      marginRight: spacing.lg,
                      opacity: alpha.navNumber,
                    }}
                  >
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          nav { padding-left: ${pagePadding.laptop} !important; padding-right: ${pagePadding.laptop} !important; }
          .mob-menu { padding: 0 ${pagePadding.laptop} !important; }
        }
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .mob-controls { display: flex !important; }
          nav { padding-left: ${pagePadding.tablet} !important; padding-right: ${pagePadding.tablet} !important; }
          .mob-menu { padding: 0 ${pagePadding.tablet} !important; }
        }
        @media (max-width: 480px) {
          nav { padding-left: ${pagePadding.mobile} !important; padding-right: ${pagePadding.mobile} !important; }
          .mob-menu { padding: 0 ${pagePadding.mobile} !important; }
        }
      `}</style>
    </>
  );
}
