import image2 from "../Images/CarroKi.jpeg"
import image3 from "../Images/ToyotaCorolla.png"
import "../Css/Catalogo.css"

import { IoChevronBack } from "react-icons/io5";
import { MenuContext } from "../App/App";
import { useContext } from "react";
import { Vehiculo } from "../Components/Boxs/Vehiculo";

import {useRef} from "react"

export function VehiculosKia({fuction}){

    const CarrosRef = useRef(null)
    const JeepRef = useRef(null)

    const [AbrirMenu, setAbrirMenu, setApagarMenu] = useContext(MenuContext)

    const TipoVehiculo = (e) =>{

       if(e.target.innerHTML == "Carros"){
            JeepRef.current.classList.remove("Active")
            CarrosRef.current.classList.add("Active")
       }
       else{
            CarrosRef.current.classList.remove("Active")
            JeepRef.current.classList.add("Active") 
       }
    }

    return(
        <div className="Contenedor_Catalogo">
            <img src={image2} alt="" />

           <div className="Header-Vehicluos">
                <div className="Header">
                    <div className="Btn-Atras" onClick={() => {fuction("Home_Inventario"); setApagarMenu(false)}}>
                        <button><IoChevronBack/></button>
                    </div>
                </div>
                <div className="Vehiculos-Informacion">
                    <div className="Informacion-General-Vehiculo">
                        <div className="Caja-General">
                            <div class="detalle-vehiculo">
                                <img src="ruta-imagen-vehiculo.jpg" alt="Toyota Corolla" class="imagen-vehiculo" />
                                <h3 class="titulo-vehiculo">Toyota Corolla</h3>
                                <p class="info-vehiculo"><strong>Tipo de gasolina:</strong> Diésel</p>
                                <p class="info-vehiculo"><strong>Precio por día:</strong> USD 50</p>
                                <p class="info-vehiculo"><strong>Capacidad:</strong> 5 pasajeros</p>
                                <p class="info-vehiculo"><strong>Transmisión:</strong> Automática</p>
                                <p class="info-vehiculo"><strong>Descripción:</strong> Vehículo cómodo y eficiente, ideal para viajes urbanos y largos recorridos.</p>
                                <button class="boton-favorito">Agregar a Favoritos</button>
                            </div>

                        </div>
                    </div>
                    <div className="Contenedor-Izquierda">
                        <div className="Filtro-Autos">
                            <div className="Btn-TipoVehiculo">
                                <h3 ref={CarrosRef} className="Active" onClick={TipoVehiculo}>Carros</h3>
                                <h3 ref={JeepRef} onClick={TipoVehiculo}>Jeepetas</h3>
                            </div>
                            <div className="Buscador-Vehiculo">
                                <input type="text" placeholder="Search Auto"/>
                                <button>Buscar</button>
                            </div>
                            
                        </div>
                        <div className="Cajas-Vehiculos">
                            <Vehiculo/>
                            <Vehiculo/>
                            <Vehiculo/>
                            <Vehiculo/>
                            <Vehiculo/>
                            <Vehiculo/>
                            <Vehiculo/>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    );
}