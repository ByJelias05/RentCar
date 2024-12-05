import React, { useState } from "react";
import "../Css/AdminUsers.css";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@gmail.com", role: "Admin" },
    { id: 2, name: "María López", email: "maria@gmail.com", role: "User" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [editingUser, setEditingUser] = useState(null); // Para almacenar el usuario a editar

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: "", email: "", role: "" });
      alert("Usuario agregado con éxito.");
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditingUser(userToEdit);
    setNewUser({ name: userToEdit.name, email: userToEdit.email, role: userToEdit.role });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.role) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setNewUser({ name: "", email: "", role: "" });
      alert("Usuario actualizado con éxito.");
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
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

      {/* Formulario para agregar o editar usuario */}
      <form className="formulario" onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
        <h3>{editingUser ? "Editar Usuario" : "Agregar Usuario"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newUser.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
          required
        />
        <select name="role" value={newUser.role} onChange={handleInputChange} required>
          <option value="">Seleccionar Rol</option>
          <option value="Admin">Admin</option>
          <option value="User">Usuario</option>
        </select>
        <button type="submit">{editingUser ? "Actualizar Usuario" : "Agregar Usuario"}</button>
        {editingUser && <button type="button" onClick={() => setEditingUser(null)}>Cancelar</button>}
      </form>

      {/* Tabla de usuarios */}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="action-btn edit-btn2" onClick={() => handleEditUser(user.id)}>
                  Editar
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDeleteUser(user.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
