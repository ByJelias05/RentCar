import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App/App";
import Analisis from "../Admin/Analisis";
import ListaVehiculos from "../Admin/ListaVehiculos";
import AdminEconomy from "../Admin/AdminEconomy";
import AdminUsers from "../Admin/AdminUsers";
import Login from "../Components/Login";
import { Reservations } from "../Components/Sections/Reservations";  
import { Checkout } from '../Components/Checkout';
import { Reporte } from "../Admin/Reportes";

export function Ruta() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/analisis" element={<Analisis />} />
        <Route path="/admin/lista-vehiculos" element={<ListaVehiculos />} />
        <Route path="/admin/economia" element={<AdminEconomy />} />
        <Route path="/admin/usuarios" element={<AdminUsers />} />
        <Route path="/admin/reportes" element={<Reporte/>} />
        <Route path="/login" element={<Login />} />

        {/* Rutas para Reservations y Checkout */}
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}
