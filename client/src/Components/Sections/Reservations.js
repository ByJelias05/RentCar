import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../Images/1151041.jpg";
import "../../Css/Reservation.css";

export function Reservations() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [formData, setFormData] = useState({
    userId: 1,
    VehicleId: "",
    startDate: "",
    endDate: "",
    totalPrice: 0.0,
    dailyPrice: 0.0, // Guardamos el precio diario del vehículo seleccionado
    status: "Pending",
    extras: []
  });

  // Calcular el precio total
  const calculateTotalPrice = (startDate, endDate, dailyPrice) => {
    console.log("Calculando el precio con:", startDate, endDate, dailyPrice); // Log para ver los parámetros
  
    if (startDate && endDate && dailyPrice) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Verificar que la fecha de fin es posterior a la fecha de inicio
      if (end >= start) {
        const duration = Math.ceil((end - start) / (1000 * 3600 * 24)); // Duración en días
        console.log("Duración en días:", duration); // Verificación de la duración
  
        const totalPrice = duration * dailyPrice; // Calcular el precio total
        console.log("Total calculado:", totalPrice); // Verificación del precio total
  
        setFormData((prev) => ({
          ...prev,
          totalPrice: totalPrice, // Actualizar el total
        }));
      } else {
        alert("La fecha de fin debe ser posterior a la fecha de inicio.");
      }
    }
  };
  
  
  
  // Cargar categorías y vehículos desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/category");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Error al cargar categorías.");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };
  
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/CRUD/vehicles");
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);  // Asegúrate de que los vehículos estén almacenados correctamente
        } else {
          console.error("Error al cargar vehículos.");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };
  
    fetchCategories();
    fetchVehicles();
  }, []);


  const getUniqueBrands = (category) => {
    const filteredVehicles = vehicles.filter(vehicle => vehicle.categoryName === category);
  
    // Usamos Set para eliminar duplicados, luego convertimos a un array
    const uniqueBrands = [...new Set(filteredVehicles.map(vehicle => vehicle.brand))];
    
    return uniqueBrands;
  };

  
  // Actualizar categoría seleccionada
const handleCategoryChange = (e) => {
  setSelectedCategory(e.target.value);
  setSelectedBrand(""); // Resetear la marca
  setSelectedVehicle(""); // Resetear el vehículo
  setFormData((prev) => ({
    ...prev,
    vehicleId: "",
    totalPrice: 0.0, // Restablecer el precio
    dailyPrice: 0.0, // Restablecer el precio diario
  }));
};

const handleBrandChange = (e) => {
  setSelectedBrand(e.target.value);
  setSelectedVehicle(""); // Resetear el vehículo
  setFormData((prev) => ({
    ...prev,
    vehicleId: "",
    totalPrice: 0.0, // Restablecer el precio
    dailyPrice: 0.0, // Restablecer el precio diario
  }));
};

  // Actualizar vehículo seleccionado
  
// Actualizar vehículo seleccionado
const handleVehicleChange = (e) => {
  const selectedId = parseInt(e.target.value, 10); // Asegúrate de que el ID sea un número
  setSelectedVehicle(selectedId);

  const selectedVehicleData = vehicles.find((vehicle) => vehicle.vehicleId === selectedId);
  
  if (selectedVehicleData) {
    const { dailyPrice } = selectedVehicleData;
    setFormData((prev) => ({
      ...prev,
      vehicleId: selectedId,
      dailyPrice: dailyPrice,
    }));
    calculateTotalPrice(formData.startDate, formData.endDate, dailyPrice);
  }
};



  // Actualizar fechas y calcular precio total
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    const { startDate, endDate, dailyPrice } = formData;
    console.log("Fechas cambiadas:", startDate, endDate, "Precio diario:", dailyPrice);
  
    // Solo recalcular si las fechas y el precio diario están disponibles
    if (startDate && endDate && dailyPrice) {
      calculateTotalPrice(startDate, endDate, dailyPrice);
    }
  };
  
  
  

  // Recalcular el precio total cuando el dailyPrice o las fechas cambien
  useEffect(() => {
    const { startDate, endDate, dailyPrice } = formData;
    if (startDate && endDate && dailyPrice) {
      console.log("Calculando total con fechas:", startDate, endDate, "y precio diario:", dailyPrice);
      calculateTotalPrice(startDate, endDate, dailyPrice);
    }
  }, [formData.vehicleId, formData.dailyPrice]); // Dependemos de vehicleId y dailyPrice
  
  

  const handleExtrasChange = (e) => {
    const { value } = e.target;
    // Solo agregarlo si no está ya en el array
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(value)
        ? prev.extras // Si el valor ya está, no agregarlo
        : [...prev.extras, value] // Si no, agregarlo al array
    }));
  };

 // Enviar la reservación al checkout
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const selectedVehicleData = vehicles.find((vehicle) => vehicle.vehicleId === selectedVehicle);

    if (!selectedVehicleData) {
      console.error("No se encontró el vehículo seleccionado.");
      return;
    }

    // Pasar todos los datos necesarios al componente Checkout
    navigate("/checkout", {
      state: {
        vehicle: selectedVehicleData, // Pasa el objeto completo del vehículo
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalPrice: formData.totalPrice,
        extras: formData.extras, // Pasa los extras como un array
      },
    });
  } catch (error) {
    console.error("Error al crear la reservación:", error);
    alert("Ocurrió un error al conectar con el servidor.");
  }
};



useEffect(() => {
  console.log("Vehículos cargados:", vehicles);  // Verifica el contenido de 'vehicles'
}, [vehicles]);



  return (
    <div className="Contenedor_Inventario" id="Reservation">
      <img className="Back-Image-Reservation" src={image} alt="Background" />
      <div className="Contenedor_Reservation">
        <div className="Contenedor-Titulo">
          <div className="Titulo_Reservation">
            <h1> Completa el formulario </h1>
            <h3>para reservar tu vehículo en minutos.</h3>
            <h5>Selecciona tus fechas, elige</h5>
            <h2>el modelo de tu preferencia y <span> ¡listo!</span></h2>
          </div>
          <a href="#Inventory" className="All_Vehiculos">Buscar Vehículo</a>
        </div>
        <div className="Fav-Form">
          <div className="reservation-container">
            <h2>Formulario de Reservación</h2>
            <form onSubmit={handleSubmit}>

              
  {/* Selección de Fecha de Inicio */}
  <div className="form-group">
    <label htmlFor="startDate">Fecha de Inicio</label>
    <input
      type="date"
      id="startDate"
      name="startDate"
      value={formData.startDate}
      onChange={handleDateChange}
      required
    />
  </div>


  {/* Selección de Fecha de Fin */}
  <div className="form-group">
    <label htmlFor="endDate">Fecha de Fin</label>
    <input
      type="date"
      id="endDate"
      name="endDate"
      value={formData.endDate}
      onChange={handleDateChange}
      required
    />
  </div>

  {/* Selección de Categoría */}
  <div className="form-group">
    <label htmlFor="category">Tipo de Vehículo</label>
    <select
      id="category"
      value={selectedCategory}
      onChange={handleCategoryChange}
      required
    >
      <option value="">Seleccione un tipo de vehículo</option>
      {categories.map((category) => (
        <option key={category.categoryId} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  </div>

   {/* Selección de Marca */}
   {selectedCategory && (
    <div className="form-group">
      <label htmlFor="brand">Marca</label>
      <select
        id="brand"
        value={selectedBrand}
        onChange={handleBrandChange}
        required
      >
        <option value="">Seleccione una marca</option>
        {getUniqueBrands(selectedCategory).map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  )}

  {/* Selección de Vehículo */}
  {selectedBrand && (
    <div className="form-group">
      <label htmlFor="vehicle">Vehículo</label>
      <select
        id="vehicle"
        value={selectedVehicle}
        onChange={handleVehicleChange}
        required
      >
        <option value="">Seleccione un vehículo</option>
        {vehicles
          .filter(
            (vehicle) =>
              vehicle.categoryName === selectedCategory &&
              vehicle.brand === selectedBrand
          )
          .map((vehicle) => (
            <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
              {vehicle.brand} - {vehicle.model} - ${vehicle.dailyPrice} /día
            </option>
          ))}
      </select>
    </div>
  )}
  {/* Opciones Adicionales */}
  <div className="form-group">
    <label htmlFor="extras">Opciones Adicionales</label>
    <select
      id="extras"
      name="extras"
      value={formData.extras}
      onChange={handleDateChange}
    >
      <option value="none">Ninguno</option>
      <option value="gps">GPS</option>
      <option value="baby-seat">Silla para Bebé</option>
      <option value="road-assistance">Asistencia en Carretera</option>
    </select>
  </div>

  {/* Total a Pagar */}
  <div className="form-group">
    <div className="total-container">
      <h3>Total a Pagar: ${formData.totalPrice.toFixed(2)}</h3>
    </div>
  </div>

  {/* Botón de Confirmación */}
  <button type="submit" className="btn-reservar">
    Confirmar Reserva
  </button>
</form>
          
          </div>
        </div>
      </div>
    </div>
  );
}
