import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/contact.css";

function ContactModal({ isOpen, onClose }) {
  const [interest, setInterest] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [closing, setClosing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!interest) {
      alert("Izaberite uslugu 😊");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), {
        interest,
        email,
        phone,
        createdAt: new Date(),
      });

      setSuccess(true);
      setInterest("");
      setEmail("");
      setPhone("");

      // ✨ blagi fade-out posle slanja
      setTimeout(() => {
        setClosing(true);
      }, 1200);

      setTimeout(() => {
        setClosing(false);
        setSuccess(false);
        onClose();
      }, 1800);
    } catch (err) {
      console.error("Contact submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`contact-overlay ${closing ? "fade-out" : ""}`}
      onClick={onClose}
    >
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="contact-close" onClick={onClose}>
          ✕
        </button>

        {!success ? (
          <>
            <h2>Zainteresovan/a sam za</h2>

            <form onSubmit={handleSubmit}>
              {/* interest options */}
              <div className="interest-options">
                {[
                  { value: "web", label: "Web sajt" },
                  { value: "app", label: "Web aplikacija" },
                  { value: "oba", label: "Oba" },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    className={`interest-option ${
                      interest === item.value ? "active" : ""
                    }`}
                    onClick={() => setInterest(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* inputs */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="tel"
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              {/* submit */}
              <button type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : "Pošalji"}
              </button>
            </form>
          </>
        ) : (
          <div className="contact-success">
            <h3>Hvala ✨</h3>
            <p>Javiću vam se uskoro.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactModal;
