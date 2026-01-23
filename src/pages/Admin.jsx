import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

function Admin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div style={{ padding: "80px" }}>
      <h1>📩 Upiti sa sajta</h1>

      {loading && <p>Učitavanje...</p>}

      {!loading && contacts.length === 0 && (
        <p>Nema upita još uvek.</p>
      )}

      {!loading &&
        contacts.map((c) => (
          <div
            key={c.id}
            style={{
              background: "#fff",
              padding: "20px",
              marginBottom: "16px",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            }}
          >
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Telefon:</strong> {c.phone}</p>
            <p>
              <strong>Zainteresovan/a za:</strong>{" "}
              {c.interest === "web" && "Web sajt"}
              {c.interest === "app" && "Web aplikaciju"}
              {c.interest === "oba" && "Web sajt + aplikaciju"}
            </p>

            {c.createdAt && (
              <p style={{ fontSize: "13px", opacity: 0.6 }}>
                {new Date(c.createdAt.seconds * 1000).toLocaleString()}
              </p>
            )}
          </div>
        ))}
    </div>
  );
}

export default Admin;
