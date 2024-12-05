import React, { useEffect, useState } from "react";

function ConnectionTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/test`);
        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          setMessage("Error: No se pudo conectar al backend");
        }
      } catch (error) {
        setMessage("Error: No se pudo conectar al servidor");
        console.error(error);
      }
    };

    checkConnection();
  }, []);

  return (
    <div>
      <h1>Prueba de Conexión</h1>
      <p>{message}</p>
    </div>
  );
}

export default ConnectionTest;
