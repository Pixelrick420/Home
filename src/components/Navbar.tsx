import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { fonts } from "../theme";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon } from "@react-icons/all-files/fa/FaMoon";
import { FaSun } from "@react-icons/all-files/fa/FaSun";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";

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
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 80px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: showSolidBg ? t.bgAlt : "transparent",
          backdropFilter: showSolidBg ? "blur(12px)" : "none",
          WebkitBackdropFilter: showSolidBg ? "blur(12px)" : "none",
          borderBottom: `1px solid ${showSolidBg ? t.border : "transparent"}`,
          transition:
            "background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        }}
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
            fontSize: "18px",
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
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
        >
          {navLinks.map((link) => (
            <motion.button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                fontFamily: fonts.sans,
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: t.text,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
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
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </motion.button>
          ))}
          <motion.button
            onClick={toggle}
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              backgroundColor: "transparent",
              color: t.text,
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
          >
            {mode === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
          </motion.button>
        </div>

        <div
          className="mob-controls"
          aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          style={{ display: "none", alignItems: "center", gap: "16px" }}
        >
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              backgroundColor: "transparent",
              color: t.text,
              border: "none",
              cursor: "pointer",
            }}
          >
            {mode === "light" ? (
              <FaMoon size={18} aria-hidden="true" />
            ) : (
              <FaSun size={18} aria-hidden="true" />
            )}
          </motion.button>
          <motion.button
            onClick={() => setMenuOpen((o: boolean) => !o)}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: t.text,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              backgroundColor: t.bg,
              padding: "0 80px",
              overflow: "auto",
            }}
          >
            <div style={{ padding: "48px 0 24px" }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    width: "100%",
                    textAlign: "left",
                    fontFamily: fonts.sans,
                    fontSize: "28px",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: t.text,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px 0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: "12px",
                      color: t.accent,
                      marginRight: "16px",
                      opacity: 0.8,
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
          nav { padding-left: 48px !important; padding-right: 48px !important; }
          [style*="padding: 0 80px"] { padding: 0 48px !important; }
        }
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .mob-controls { display: flex !important; }
          nav { padding-left: 32px !important; padding-right: 32px !important; }
          [style*="padding: 0 80px"] { padding: 0 32px !important; }
        }
        @media (max-width: 480px) {
          nav { padding-left: 20px !important; padding-right: 20px !important; }
          [style*="padding: 0 80px"] { padding: 0 20px !important; }
        }
      `}</style>
    </>
  );
}
