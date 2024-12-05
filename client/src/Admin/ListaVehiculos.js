import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Css/AdminStyles.css";

const ListaVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);  // Vehículos desde la base de datos
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [formData, setFormData] = useState({
    modelo: "",
    marca: "",
    año: "",
    color: "",
    img: "",
  });

  // Obtener vehículos desde la API
  const fetchVehiculos = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/CRUD/vehicles");
      if (response.ok) {
        const data = await response.json();
        console.log("Vehículos obtenidos:", data); // Verificar si los datos están correctos
        setVehiculos(data);
      } else {
        console.error("Error al cargar los vehículos");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  useEffect(() => {
    fetchVehiculos();  // Cargar vehículos cuando el componente se monte
  }, []);

  // Abrir ventana emergente para agregar vehículo
  const openAddModal = () => {
    setFormData({ modelo: "", marca: "", año: "", color: "", img: "" });
    setShowAddModal(true);
  };

  // Abrir ventana emergente para editar vehículo
  const openEditModal = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setFormData({
      modelo: vehiculo.modelo,
      marca: vehiculo.marca,
      año: vehiculo.año,
      color: vehiculo.color,
      img: vehiculo.img,
    });
    setShowEditModal(true);
  };

  // Cerrar ventana emergente
  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  // Manejo de cambio de formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validar si los campos no están vacíos
  const validateForm = () => {
    return (
      formData.modelo &&
      formData.marca &&
      formData.año &&
      formData.color &&
      formData.img
    );
  };

  // Agregar vehículo a la base de datos
  const handleAddVehicle = async () => {
    if (validateForm()) {
      const newVehicle = {
        modelo: formData.modelo,
        marca: formData.marca,
        año: formData.año,
        color: formData.color,
        img: formData.img,
      };

      try {
        const response = await fetch("http://localhost:5050/api/CRUD/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVehicle),
        });

        if (response.ok) {
          alert("Vehículo agregado correctamente.");
          fetchVehiculos();  // Recargar la lista de vehículos
          closeModal();
        } else {
          alert("Error al agregar el vehículo.");
        }
      } catch (error) {
        console.error("Error al agregar el vehículo:", error);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  // Editar vehículo en la base de datos
  const handleEditVehicle = async () => {
    if (validateForm()) {
      const updatedVehicle = {
        ...formData,
        id: selectedVehiculo.id,
      };

      try {
        const response = await fetch(`http://localhost:5050/api/CRUD/vehicles/${selectedVehiculo.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVehicle),
        });

        if (response.ok) {
          alert("Vehículo editado correctamente.");
          fetchVehiculos();  // Recargar la lista de vehículos
          closeModal();
        } else {
          alert("Error al editar el vehículo.");
        }
      } catch (error) {
        console.error("Error al editar el vehículo:", error);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  // Eliminar vehículo de la base de datos
const handleDeleteVehicle = async (vehicleId) => {
  const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este vehículo?");
  if (confirmDelete) {
    try {
      // Aquí se interpolará el vehicleId en la URL
      const response = await fetch(`http://localhost:5050/api/CRUD/${vehicleId}`, {
        method: "DELETE", // Método DELETE
      });

      if (response.ok) {
        alert("Vehículo eliminado correctamente.");
        fetchVehiculos();  // Recargar los vehículos
      } else {
        alert("Error al eliminar el vehículo.");
      }
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
      alert("Error al conectar con el servidor.");
    }
  }
};

  

  return (
    <div className="admin-page">
      <h1>ADMINISTRACIÓN</h1>
      <div className="menu">
        <Link to="/admin/lista-vehiculos" className="menu-btn">LISTA DE VEHÍCULOS</Link>
        <Link to="/admin/analisis" className="menu-btn">ANÁLISIS</Link>
        <Link to="/admin/economia" className="menu-btn">ECONOMÍA</Link>
        <Link to="/admin/usuarios" className="menu-btn">USUARIOS</Link>
        <Link to="/admin/reportes" className="menu-btn">Reportes</Link>
      </div>
      <div className="content">
        <h2>LISTA DE VEHÍCULOS</h2>
        <button className="add-btn" onClick={openAddModal}>AGREGAR</button>

        {/* Ventana emergente para agregar vehículo */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Agregar Vehículo</h3>
              <form>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  placeholder="Modelo"
                />
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  placeholder="Marca"
                />
                <input
                  type="text"
                  name="año"
                  value={formData.año}
                  onChange={handleChange}
                  placeholder="Año"
                />
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Color"
                />
                <input
                  type="text"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                  placeholder="Ruta de la Imagen"
                />
                <button type="button" onClick={handleAddVehicle}>Agregar</button>
                <button type="button" onClick={closeModal}>Cancelar</button>
              </form>
            </div>
          </div>
        )}

<div className="vehiculos-list">
{vehiculos.length > 0 ? (
  vehiculos.map((vehiculo) => (
    <div key={vehiculo.vehicleId} className="vehiculo-card">
      <img src={vehiculo.img} alt={vehiculo.model} className="vehiculo-img" />
      <p className="vehiculo-modelo">{vehiculo.model}</p> {/* Modelo */}
      <p className="vehiculo-marca">{vehiculo.brand}</p> {/* Marca */}
      <div className="vehiculo-actions">
        <button className="edit-btn" onClick={() => openEditModal(vehiculo)}>✎</button>
        <button className="delete-btn2" onClick={() => handleDeleteVehicle(vehiculo.vehicleId)}>🗑</button>
        </div>
    </div>
  ))
) : (
  <p>No hay vehículos disponibles.</p>
)}

</div>

      </div>

      {/* Ventana emergente para editar vehículo */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar Vehículo</h3>
            <form>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Modelo"
              />
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                placeholder="Marca"
              />
              <input
                type="text"
                name="año"
                value={formData.año}
                onChange={handleChange}
                placeholder="Año"
              />
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color"
              />
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleChange}
                placeholder="Ruta de la Imagen"
              />
              <button type="button" onClick={handleEditVehicle}>Editar</button>
              <button type="button" onClick={closeModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaVehiculos;