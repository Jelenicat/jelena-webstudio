import { useEffect, useState } from "react";
import "../styles/header.css";
import logoHeader from "../assets/logo-header.png";

function Header() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${menuOpen ? "menu-open" : ""}`}>
      <img
        src={logoHeader}
        alt="Jelena Web Studio"
        className="logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      <input
        type="checkbox"
        id="menu-toggle"
        checked={menuOpen}
        onChange={(e) => setMenuOpen(e.target.checked)}
      />

      <label
        htmlFor="menu-toggle"
        className="menu-icon"
        aria-label="Open menu"
      >
        ☰
      </label>

      <nav className="nav">
        <a
          href="#usluge"
          onClick={closeMenu}
          className={active === "usluge" ? "active" : ""}
        >
          USLUGE
        </a>

        <a
          href="#portfolio"
          onClick={closeMenu}
          className={active === "portfolio" ? "active" : ""}
        >
          PORTFOLIO
        </a>

        <a
          href="#kontakt"
          onClick={closeMenu}
          className="btn-outline"
        >
          KONTAKT
        </a>
      </nav>
    </header>
  );
}

export default Header;
