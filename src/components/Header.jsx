import { useEffect, useState } from "react";
import "../styles/header.css";
import logoHeader from "../assets/logo-header.png";

function Header() {
  const [active, setActive] = useState("");

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

  /* ⬅️ ZATVARA MOBILE MENI */
  const closeMenu = () => {
    const checkbox = document.getElementById("menu-toggle");
    if (checkbox) checkbox.checked = false;
  };

  return (
    <header className="header">
      {/* LOGO */}
      <img
        src={logoHeader}
        alt="Jelena Web Studio"
        className="logo"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      />

      {/* MOBILE TOGGLE */}
      <input type="checkbox" id="menu-toggle" />
      <label
        htmlFor="menu-toggle"
        className="menu-icon"
        aria-label="Open menu"
      >
        ☰
      </label>

      {/* NAVIGATION */}
      <nav className="nav">
        <a
          href="#usluge"
          onClick={closeMenu}
          className={`nav-item ${active === "usluge" ? "active" : ""}`}
        >
          USLUGE
        </a>

        <a
          href="#portfolio"
          onClick={closeMenu}
          className={`nav-item ${active === "portfolio" ? "active" : ""}`}
        >
          PORTFOLIO
        </a>

       

        <a
          href="#kontakt"
          onClick={closeMenu}
          className="btn-outline nav-item"
        >
          KONTAKT
        </a>
      </nav>
    </header>
  );
}

export default Header;
