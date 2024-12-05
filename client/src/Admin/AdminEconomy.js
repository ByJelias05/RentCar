import React, { useState, useEffect } from "react";
import "../Css/AdminUsers.css";
import { Link } from "react-router-dom";

const AdminEconomy = () => {
  const [economyData, setEconomyData] = useState({
    totalGains: 5000,
    totalInvestments: 2000,
    netProfit: 3000,
  });

  const [newData, setNewData] = useState({ totalGains: "", totalInvestments: "" });

  useEffect(() => {
    const { totalGains, totalInvestments } = economyData;
    setEconomyData((prev) => ({
      ...prev,
      netProfit: totalGains - totalInvestments,
    }));
  }, [economyData.totalGains, economyData.totalInvestments]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { totalGains, totalInvestments } = newData;
    setEconomyData({
      totalGains: parseFloat(totalGains),
      totalInvestments: parseFloat(totalInvestments),
      netProfit: parseFloat(totalGains) - parseFloat(totalInvestments),
    });
    setNewData({ totalGains: "", totalInvestments: "" });
  };

  return (
    <div className="admin-page">
      <h1>ADMINISTRACIÓN</h1>
      <div className="menu">
        <Link to="/admin/lista-vehiculos" className="menu-btn">Lista de Vehículos</Link>
        <Link to="/admin/analisis" className="menu-btn">Análisis</Link>
        <Link to="/admin/economia" className="menu-btn">Economía</Link>
        <Link to="/admin/usuarios" className="menu-btn">Usuarios</Link>
        <Link to="/admin/reportes" className="menu-btn">Reportes</Link>
      </div>
      <div className="data-box">
        <h2>Estado Actual</h2>
        <p>Ganancias Totales: ${economyData.totalGains}</p>
        <p>Inversiones Totales: ${economyData.totalInvestments}</p>
        <p>Ganancia Neta: ${economyData.netProfit}</p>
      </div>
      <form className="formulario" onSubmit={handleUpdate}>
        <h3>Actualizar Datos</h3>
        <input
          type="number"
          name="totalGains"
          placeholder="Nuevas Ganancias"
          value={newData.totalGains}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="totalInvestments"
          placeholder="Nuevas Inversiones"
          value={newData.totalInvestments}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default AdminEconomy;
