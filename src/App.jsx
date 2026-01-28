import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

import CookieBanner from "./components/CookieBanner";
import { loadAnalytics } from "./utils/analytics";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // ✅ Ako je korisnik ranije prihvatio cookies → odmah učitaj GA
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      loadAnalytics();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/admin-login" />}
        />
      </Routes>

      {/* ✅ Cookie banner je globalan */}
      <CookieBanner onAccept={loadAnalytics} />
    
    </>
  );
}

export default App;
