import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/AdminStyles.css";

const ListaVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([
    {
      id: 1,
      modelo: "Toyota Corolla",
      marca: "Toyota",
      año: "2020",
      color: "Blanco",
      img: "../Images/ToyotaCorolla.png",
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [formData, setFormData] = useState({
    modelo: "",
    marca: "",
    año: "",
    color: "",
    img: "", // Nuevo campo para la imagen
  });

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
      img: vehiculo.img, // Cargar la imagen actual al editar
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
      formData.img // Validar también la imagen
    );
  };

  // Agregar vehículo
  const handleAddVehicle = () => {
    if (validateForm()) {
      const newVehicle = {
        ...formData,
        id: vehiculos.length + 1, // Asignar un ID único
      };
      setVehiculos([...vehiculos, newVehicle]);
      closeModal();
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  // Editar vehículo
  const handleEditVehicle = () => {
    if (validateForm()) {
      const updatedVehiculos = vehiculos.map((vehiculo) =>
        vehiculo.id === selectedVehiculo.id ? { ...selectedVehiculo, ...formData } : vehiculo
      );
      setVehiculos(updatedVehiculos);
      closeModal();
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  // Eliminar vehículo con confirmación
  const handleDeleteVehicle = (vehiculo) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este vehículo?");
    if (confirmDelete) {
      setVehiculos(vehiculos.filter((v) => v.id !== vehiculo.id));
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
        <Link to="/admin/Reportes" className="menu-btn">REPORTES</Link>
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
          {vehiculos.map((vehiculo) => (
            <div key={vehiculo.id} className="vehiculo-card">
              <img src={vehiculo.img} alt={vehiculo.modelo} className="vehiculo-img" />
              <p className="vehiculo-modelo">{vehiculo.modelo}</p>
              <div className="vehiculo-actions">
                <button className="edit-btn" onClick={() => openEditModal(vehiculo)}>✎</button>
                <button className="delete-btn2" onClick={() => handleDeleteVehicle(vehiculo)}>🗑</button>
              </div>
            </div>
          ))}
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
