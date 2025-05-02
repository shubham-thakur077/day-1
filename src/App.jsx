import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (err) {
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>📚 Book Finder</h2>
      <input
        type="text"
        placeholder="Search books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button
        onClick={fetchBooks}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {books.map((book) => {
          const info = book.volumeInfo;
          return (
            <div
              key={book.id}
              style={{
                width: "200px",
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <img
                src={info.imageLinks?.thumbnail}
                alt={info.title}
                style={{ width: "100%", height: "auto" }}
              />
              <h4>{info.title}</h4>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                {info.authors ? info.authors.join(", ") : "Unknown Author"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
