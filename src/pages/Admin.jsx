import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function Admin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {
  const isAdmin = localStorage.getItem("isAdmin");

  if (isAdmin !== "true") {
    navigate("/admin-login");
  }
}, [navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const q = query(
          collection(db, "contacts"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setContacts(data);
      } catch (err) {
        console.error("Greška pri čitanju kontakata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

 return (
  <div className="admin-page">
    <h1>📩 Upiti sa sajta</h1>

    {loading && <p className="admin-loading">Učitavanje...</p>}

    {!loading && contacts.length === 0 && (
      <p className="admin-empty">Nema upita još uvek.</p>
    )}

    {!loading &&
      contacts.map((c) => (
        <div key={c.id} className="admin-card">
          <p><strong>Email:</strong> {c.email}</p>
          <p><strong>Telefon:</strong> {c.phone}</p>
          <p>
            <strong>Zainteresovan/a za:</strong>{" "}
            {c.interest === "web" && "Web sajt"}
            {c.interest === "app" && "Web aplikaciju"}
            {c.interest === "oba" && "Web sajt + aplikaciju"}
          </p>

          {c.createdAt && (
            <p className="admin-date">
              {new Date(c.createdAt.seconds * 1000).toLocaleString()}
            </p>
          )}
        </div>
      ))}
  </div>
);

}

export default Admin;
