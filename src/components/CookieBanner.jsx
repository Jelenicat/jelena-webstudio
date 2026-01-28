import { useEffect, useState } from "react";
import "./cookieBanner.css";

export default function CookieBanner({ onAccept, onReject }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    onAccept?.();
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
    onReject?.();
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Koristimo kolačiće za analitiku kako bismo unapredili sajt.
        Više u <a href="/privacy">Privacy Policy</a>.
      </p>

      <div className="cookie-actions">
        <button className="btn-outline" onClick={reject}>
          Odbij
        </button>
        <button className="btn-primary" onClick={accept}>
          Prihvatam
        </button>
      </div>
    </div>
  );
}
