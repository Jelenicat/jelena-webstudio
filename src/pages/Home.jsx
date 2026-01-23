import Header from "../components/Header";
import "../styles/home.css";

import { useEffect, useState } from "react";

/* HERO */
import heroDesktop from "../assets/hero-desktop.jpg";
import heroMobile from "../assets/hero-mobile.jpg";
import logo from "../assets/logo.png";

/* SERVICES */
import serviceWeb from "../assets/service-web.jpg";
import serviceApp from "../assets/service-app.jpg";
import logoUsluge from "../assets/logo-usluge.png";

/* PORTFOLIO */
import logoPortfolio from "../assets/logo-portfolio.png";
import portfolioWeb from "../assets/portfolio-web.jpg";
import portfolioApp from "../assets/portfolio-app.jpg";

/* GALLERIES */
import web1 from "../assets/portfolio/web/web1.jpg";
import web2 from "../assets/portfolio/web/web2.jpg";
import web3 from "../assets/portfolio/web/web3.jpg";

import app1 from "../assets/portfolio/app/app1.jpg";
import app2 from "../assets/portfolio/app/app2.jpg";
import app3 from "../assets/portfolio/app/app3.jpg";
import app4 from "../assets/portfolio/app/app4.jpg";
import app5 from "../assets/portfolio/app/app5.jpg";
import app6 from "../assets/portfolio/app/app6.jpg";
import ContactModal from "../components/ContactModal";
import FloatingContact from "../components/FloatingContact";

function Home() {
  /* ===== STATE ===== */
  const [activeGallery, setActiveGallery] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
const [contactOpen, setContactOpen] = useState(false);

  /* ===== GALLERIES ===== */
  const galleries = {
    web: [web1, web2, web3],
    app: [app1, app2, app3, app4, app5, app6],
  };

  /* ===== INTERSECTION OBSERVER ===== */
  useEffect(() => {
    const rows = document.querySelectorAll(".service-row");
    const portfolio = document.querySelector(".portfolio");
    const footer = document.querySelector(".footer");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    rows.forEach((row) => observer.observe(row));
    if (portfolio) observer.observe(portfolio);
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  /* ===== SWIPE ===== */
  let touchStartX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex(
          (prev) => (prev + 1) % galleries[activeGallery].length
        );
      } else {
        setActiveIndex(
          (prev) =>
            (prev - 1 + galleries[activeGallery].length) %
            galleries[activeGallery].length
        );
      }
      setIsZoomed(false);
    }
  };

  /* ===== ESC CLOSE ===== */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section className="hero">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroMobile} />
          <img src={heroDesktop} alt="Hero background" />
        </picture>
        <div className="hero-overlay">
          <img src={logo} alt="jelena webstudio logo" className="hero-logo" />
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services" id="usluge">
        <img src={logoUsluge} alt="Usluge" className="services-label-logo" />

        <h2 className="services-title">
          POUZDANE, ELEGANTNE <br /> DIGITALNE SOLUCIJE.
        </h2>

        <div className="services-grid">
          <div className="service-row">
            <div className="service-text">
              <span className="service-number">01</span>
              <span className="service-vertical">WEB</span>
              <h3>WEB SAJTOVI</h3>
              <p>
                Moderni i responzivni web sajtovi pažljivo dizajnirani prema vašem
                brendu – sa jasnom strukturom i fokusom na UX.
              </p>
            </div>
            <div className="service-image">
              <img src={serviceWeb} alt="Web sajtovi" />
            </div>
          </div>

          <div className="service-row reverse">
            <div className="service-text">
              <span className="service-number">02</span>
              <span className="service-vertical">APP</span>
              <h3>WEB APLIKACIJE</h3>
              <p>
                Prilagođene web aplikacije koje automatizuju procese i rast
                biznisa.
              </p>
            </div>
            <div className="service-image">
              <img src={serviceApp} alt="Web aplikacije" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section className="portfolio animate" id="portfolio">
        <img
          src={logoPortfolio}
          alt="Portfolio"
          className="portfolio-label-logo"
        />

        <div className="portfolio-grid">
          <div
            className="portfolio-card"
            onClick={() => setActiveGallery("web")}
          >
            <img src={portfolioWeb} alt="Web projekat" />
            <div className="portfolio-overlay">
              <p>Web sajt</p>
            </div>
          </div>

          <div
            className="portfolio-card"
            onClick={() => setActiveGallery("app")}
          >
            <img src={portfolioApp} alt="Web aplikacija" />
            <div className="portfolio-overlay">
              <p>Web aplikacija</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY MODAL ===== */}
      {activeGallery && (
        <div className="gallery-modal" onClick={() => setActiveGallery(null)}>
          <div
            className="gallery-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="gallery-close">✕</button>

            <div className="gallery-grid">
              {galleries[activeGallery].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => {
                    setActiveIndex(index);
                    setIsFullscreen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== FULLSCREEN ===== */}
      {isFullscreen && (
        <div
          className="fullscreen-modal"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button className="fullscreen-close">✕</button>

            <div className="slide-wrapper">
              <img
                src={galleries[activeGallery][activeIndex]}
                alt=""
                className={`fullscreen-image ${isZoomed ? "zoomed" : ""}`}
                onDoubleClick={() => setIsZoomed(!isZoomed)}
              />
            </div>

            <div className="thumbnail-strip">
              {galleries[activeGallery].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className={index === activeIndex ? "active" : ""}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsZoomed(false);
                  }}
                />
              ))}
            </div>

            <button
              className="nav prev"
              onClick={() =>
                setActiveIndex(
                  (activeIndex - 1 + galleries[activeGallery].length) %
                    galleries[activeGallery].length
                )
              }
            >
              ‹
            </button>

            <button
              className="nav next"
              onClick={() =>
                setActiveIndex(
                  (activeIndex + 1) % galleries[activeGallery].length
                )
              }
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-inner">
          <a
            href="https://www.instagram.com/jelena.webstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="Instagram"
          >
            <svg
              className="footer-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>

          <a
            href="mailto:jelenatanaskovicj@gmail.com"
            className="footer-link footer-email"
          >
            jelenatanaskovicj@gmail.com
          </a>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} jelena.webstudio
        </div>
      </footer>
      <FloatingContact onClick={() => setContactOpen(true)} />

<ContactModal
  isOpen={contactOpen}
  onClose={() => setContactOpen(false)}
/>

    </>
  );
}

export default Home;
