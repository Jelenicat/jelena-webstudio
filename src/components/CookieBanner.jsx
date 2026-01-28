import { useEffect, useState } from "react";
import "./cookieBanner.css";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import "./privacyModal.css";

export default function CookieBanner({ onAccept, onReject }) {
  const [visible, setVisible] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

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
    <>
      <div className="cookie-banner">
        <p>
          Koristimo kolačiće za analitiku kako bismo unapredili sajt.{" "}
          <button
            type="button"
            onClick={() => setShowPrivacy(true)}
            className="privacy-link"
          >
            Privacy Policy
          </button>
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

      <PrivacyPolicyModal
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />
    </>
  );
}
