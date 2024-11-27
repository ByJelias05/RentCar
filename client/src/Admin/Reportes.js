import React from "react";
import { Link } from "react-router-dom";
import "../Css/Reportes.css"

export function Reporte(){
    return(
        <div className="admin-page">
            <h1>ADMINISTRACIÓN</h1>
            <div className="menu">
                <Link to="/admin/lista-vehiculos" className="menu-btn">Lista de Vehículos</Link>
                <Link to="/admin/analisis" className="menu-btn">Análisis</Link>
                <Link to="/admin/economia" className="menu-btn">Economía</Link>
                <Link to="/admin/usuarios" className="menu-btn">Usuarios</Link>
                <Link to="/admin/Reportes" className="menu-btn">REPORTES</Link>
            </div>
                <div class="contenedor-buzon-mensajes">
                    <h2 class="titulo-seccion">Buzón de Mensajes</h2>
                    <div class="tarjeta-mensaje">
                        <div class="encabezado-mensaje">
                        <h3>Papito</h3>
                        <p>Tupapito25@gmail.com</p>
                        </div>
                        <div class="cuerpo-mensaje">
                        <p>klk, esta disponible el Honda civic 2005?</p>
                        </div>
                        <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" class="boton-responder">Responder</a>
                    </div>
                
                </div>

        </div>
    );
}