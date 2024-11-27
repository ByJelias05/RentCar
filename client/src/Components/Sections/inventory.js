import image from "../../Images/CarroKi.jpeg"
import image2 from "../../Images/CarroToyota.jpg"
import image3 from "../../Images/CarroHonda.jpg"
import Toyota from "../../Images/Toyota.png"
import Honda from "../../Images/Honda.png"
import Kia from "../../Images/Kia.png"
import video from "../../Videos/a.mp4"

import {useContext, useState} from "react"
import { VehiculosToyota } from "../../Layouts/VehiculosToyota" 
import { VehiculosHonda } from "../../Layouts/VehiculosHonda" 
import { VehiculosKia } from "../../Layouts/VehiculosKia" 

import "../../Css/Inventory.css"
import { MenuContext } from "../../App/App"
import { TodosVehiculo } from "../../Layouts/TodosVehiculo"

export function Inventory(){

    const [AbrirMenu, setAbrirMenu, setApagarMenu] = useContext(MenuContext)

    const objInvetarios = {
        VehiculosKia: VehiculosKia,
        VehiculosToyota: VehiculosToyota,
        VehiculosHonda: VehiculosHonda,
        TodosVehiculo: TodosVehiculo
    }

    const [Catalogo, setCatalogo] = useState("Home_Inventario")

    const InvenatioActual = objInvetarios[Catalogo];

    return(
        <>
        
            {
                Catalogo == "Home_Inventario" ?
                <div className="Contenedor_Inventario" id="Inventory">
                    <video autoPlay loop muted>
                            <source src={video} type="video/mp4"/>
                    </video>

                    <div className="Contenedor_Inventory">
                        <div>
                            <div className="Titulo_Inventario">
                                <h1>¡Elije tu marca</h1>
                                <h3 className="Borde-Letra">Y Vehiculo favotiro</h3>
                                <h5>Para tus paseos!</h5>
                                <div>
                                <h2 className="Borde-Letra2">Disfruta de Auto<span>Flex</span></h2>
                                </div>
                            </div>
                            <button className="All_Vehiculos" onClick={() => {setCatalogo("TodosVehiculo"); setApagarMenu(true)}}>Ver todos los vehiculos</button>
                        </div>
                    <div className="Marcas_Populares">
                            <h1 className="Titulo_Marcas">Marcas populares</h1>
                        <div className="Contenedor_Marcas">
                            <div className="s" onClick={() => {setCatalogo("VehiculosKia"); setApagarMenu(true)}}>
                                <div className="t">
                                    <img className="image1" src={image} alt="" />
                                </div>
                                <div className="o">
                                    <img src={Kia} alt="" />
                                </div>
                            </div>
                            <div className="s" onClick={() => {setCatalogo("VehiculosToyota"); setApagarMenu(true)}}>
                                <div className="t">
                                    <img className="image2" src={image2} alt="" />
                                </div>
                                <div className="o">
                                    <img src={Toyota} alt="" />
                                </div>
                            </div>
                            <div className="s" onClick={() => {setCatalogo("VehiculosHonda"); setApagarMenu(true)}}>
                                <div className="t">
                                    <img className="image3" src={image3} alt="" />
                                </div>
                                <div className="o">
                                    <img src={Honda} alt="" />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
            :
            <InvenatioActual fuction={setCatalogo}/>
            }
        
        </>
    );
}