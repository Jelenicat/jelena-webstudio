export default function PrivacyPolicyModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="privacy-overlay" onClick={onClose}>
      <div
        className="privacy-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="privacy-close" onClick={onClose}>
          ✕
        </button>

        <h2>Privacy Policy</h2>

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
