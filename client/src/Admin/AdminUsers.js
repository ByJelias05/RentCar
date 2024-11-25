import './AdminUsers.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  
  // Cargar los usuarios desde el backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  // Manejar cambios en el formulario de creación de usuario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  // Crear un nuevo usuario
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', role: '' });
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  // Eliminar un usuario
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`); // Corrección: Uso de backticks
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      <h1>Administrar Usuarios</h1>

      {/* Formulario para agregar un nuevo usuario */}
      <form onSubmit={handleAddUser}>
        <h3>Agregar Nuevo Usuario</h3>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Rol</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
        </select>
        <button type="submit">Agregar Usuario</button>
      </form>

      {/* Mostrar la lista de usuarios */}
      <h3>Lista de Usuarios</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.role}
            <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;

