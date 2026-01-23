import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/admin-login"
        element={<AdminLogin onSuccess={() => setIsAdmin(true)} />}
      />

      <Route
        path="/admin"
        element={isAdmin ? <Admin /> : <Navigate to="/admin-login" />}
      />
    </Routes>
  );
}

export default App;
