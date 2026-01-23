import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/admin"
          element={
            isAdmin ? (
              <Admin />
            ) : (
              <AdminLogin onSuccess={() => setIsAdmin(true)} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
