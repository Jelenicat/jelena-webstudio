import { useEffect } from "react";

export default function PrivacyPolicyModal({ open, onClose }) {
  // 🔒 Disable background scroll (bitno za iOS)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ⌨️ Close on ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="privacy-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
    >
      <div
        className="privacy-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="privacy-close"
          onClick={onClose}
          aria-label="Close privacy policy"
        >
          ✕
        </button>

        <h2 id="privacy-title">Privacy Policy</h2>

        <p>
          Ovaj sajt poštuje vašu privatnost i obrađuje podatke u skladu sa važećim
          propisima o zaštiti podataka.
        </p>

        <p>
          Lični podaci se prikupljaju isključivo kada ih korisnik dobrovoljno
          unese, na primer putem kontakt forme ili prilikom prijave na
          administrativni deo sajta.
        </p>

        <p>
          Sajt koristi Google Analytics u svrhu analize posećenosti i
          unapređenja sadržaja. Analitika se učitava isključivo uz saglasnost
          korisnika, a IP adrese se anonimizuju.
        </p>

        <p>
          Prikupljeni podaci se ne prodaju i ne koriste u marketinške svrhe.
        </p>

        <p>
          Korisnik u svakom trenutku može povući saglasnost za korišćenje
          kolačića brisanjem kolačića u svom internet pregledaču.
        </p>
      </div>
    </div>
  );
}
