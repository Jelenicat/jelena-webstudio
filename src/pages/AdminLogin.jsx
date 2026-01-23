import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!username || !password) {
    alert("Unesi username i password");
    return;
  }

  if (username === "jw-admin" && password === "studio2026!") {
    localStorage.setItem("isAdmin", "true");
    navigate("/admin", { replace: true });
  } else {
    alert("Pogrešni kredencijali");
  }
};


return (
  <main className="admin-login">
    <h1>Admin login</h1>

    <form onSubmit={handleSubmit} className="admin-login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Uloguj se</button>
    </form>
  </main>
);

}

export default AdminLogin;
