import "../../Css/Slide.css"

import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";

import { useContext } from "react"
import { MenuContext } from "../../App/App"
import { Home } from "../Sections/Home"
import { Inventory } from "../Sections/inventory";

export function Slide(){

    const [AbrirMenu, setAbrirMenu] = useContext(MenuContext);

    return(
        <div className="Contenedor_Slide">
       
            <div className="Menu-Abrir" >
                <CiMenuFries  onClick={() =>{setAbrirMenu(!AbrirMenu)}}/>
            </div>
                <Home/>
           
    
        </div>
    );
}