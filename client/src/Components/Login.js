import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Login.css";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Realizar la petición de autenticación al backend
    try {
      const response = await fetch("http://localhost:5050/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la respuesta es exitosa y el rol es admin, redirige
        if (data.role === "admin") {
          // Almacena el token y redirige
          localStorage.setItem("token", data.token); // Guarda el token si es necesario
          navigate("/admin/lista-vehiculos");
        } else {
          setError("No tienes permisos de administrador.");
        }
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login; // Exportar como default