import { useEffect, useState } from "react";
import "../styles/header.css";
import logoHeader from "../assets/logo-header.png";

function Header({ onContactClick }) {
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

  const handleContactClick = () => {
    closeMenu();
    onContactClick(); // 👈 otvara modal
  };

  return (
    <header className={`header ${menuOpen ? "menu-open" : ""}`}>
      {/* LOGO */}
      <img
        src={logoHeader}
        alt="Jelena Web Studio"
        className="logo"
        onClick={() => {
          closeMenu();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* MOBILE TOGGLE */}
      <input
        type="checkbox"
        id="menu-toggle"
        checked={menuOpen}
        onChange={(e) => setMenuOpen(e.target.checked)}
      />

      <label
  htmlFor="menu-toggle"
  className="menu-icon"
  aria-label={menuOpen ? "Close menu" : "Open menu"}
>
  {menuOpen ? "✕" : "☰"}
</label>


      {/* NAV */}
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

        {/* KONTAKT → MODAL */}
        <button
          type="button"
          className="btn-outline nav-item"
          onClick={handleContactClick}
        >
          KONTAKT
        </button>
      </nav>
    </header>
  );
}

export default Header;
