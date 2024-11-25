import './AdminEconomy.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminEconomy = () => {
  const [economyData, setEconomyData] = useState({
    totalGains: 0,
    totalInvestments: 0,
    netProfit: 0,
  });

  const [newEconomyData, setNewEconomyData] = useState({
    totalGains: '',
    totalInvestments: '',
  });

  // Cargar los datos económicos
  useEffect(() => {
    const fetchEconomyData = async () => {
      try {
        const response = await axios.get('/api/economy');
        setEconomyData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos económicos:', error);
      }
    };
    fetchEconomyData();
  }, []);

  // Calcular la ganancia neta
  useEffect(() => {
    setEconomyData((prevData) => ({
      ...prevData,
      netProfit: prevData.totalGains - prevData.totalInvestments,
    }));
  }, [economyData.totalGains, economyData.totalInvestments]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEconomyData({
      ...newEconomyData,
      [name]: value,
    });
  };

  // Actualizar los datos económicos
  const handleUpdateEconomy = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/economy', newEconomyData);
      setEconomyData(response.data);
      setNewEconomyData({ totalGains: '', totalInvestments: '' });
    } catch (error) {
      console.error('Error al actualizar los datos económicos:', error);
    }
  };

  return (
    <div>
      <h1>Sección de Economía</h1>

      <div>
        <h3>Datos Económicos Actuales</h3>
        <p><strong>Ganancias Totales al Mes:</strong> ${economyData.totalGains}</p>
        <p><strong>Total de Inversiones:</strong> ${economyData.totalInvestments}</p>
        <p><strong>Ganancia Neta:</strong> ${economyData.netProfit}</p>
      </div>

      <form onSubmit={handleUpdateEconomy}>
        <h3>Actualizar Datos Económicos</h3>
        <input
          type="number"
          name="totalGains"
          value={newEconomyData.totalGains}
          onChange={handleChange}
          placeholder="Ingresar ganancias"
          required
        />
        <input
          type="number"
          name="totalInvestments"
          value={newEconomyData.totalInvestments}
          onChange={handleChange}
          placeholder="Ingresar inversiones"
          required
        />
        <button type="submit">Actualizar Datos</button>
      </form>
    </div>
  );
};

export default AdminEconomy;
