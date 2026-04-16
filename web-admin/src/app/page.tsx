"use client";

import { useState, FormEvent } from "react";

export default function Page() {
  const [email, setEmail] = useState("test@ledelice.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        localStorage.setItem("token", data.token);
        console.log("Utilisateur connecté:", data.user);
      } else {
        setError(data.message || "Erreur de connexion");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }

    setLoading(false);
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "100px auto", fontFamily: "Arial" }}
    >
      <h1>🍕 Le Délice - Connexion</h1>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>

      {error && (
        <div
          style={{
            color: "red",
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#ffe6e6",
          }}
        >
          ❌ {error}
        </div>
      )}

      {success && (
        <div
          style={{
            color: "green",
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#e6ffe6",
          }}
        >
          ✅ Connexion réussie ! Token sauvegardé.
        </div>
      )}

      <p style={{ marginTop: "20px", color: "#666", fontSize: "12px" }}>
        Email par défaut : test@ledelice.com
        <br />
        Mot de passe : 123456
      </p>
    </div>
  );
}
