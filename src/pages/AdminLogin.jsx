import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Pogrešni kredencijali");
    }
  };

  return (
    <main>
      <h1>Admin login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Uloguj se</button>
      </form>
    </main>
  );
}

export default AdminLogin;
