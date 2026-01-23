import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
