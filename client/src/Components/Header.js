import "../Css/Header.css";
import { Btn_Menu } from "./Buttons/Boton_Menu";
import { IoClose } from "react-icons/io5";
import { useRef, useContext, useEffect } from "react";
import { MenuContext } from "../App/App";
import { Link } from "react-router-dom";  // Asegúrate de importar Link

export function Header() {
  const MenuRef = useRef(null);
  const [AbrirMenu, setAbrirMenu] = useContext(MenuContext);

  const CerrarMenu = () => {
    MenuRef.current.classList.add("close");
    setAbrirMenu(false);
  };

  // Asegúrate de cerrar el menú cuando se hace clic en "Login"
  const handleLoginClick = () => {
    if (AbrirMenu) {
      CerrarMenu();  // Cierra el menú al hacer clic en login
    }
  };

  useEffect(() => {
    if (AbrirMenu === true) {
      MenuRef.current.classList.remove("close");
    } else {
      MenuRef.current.classList.add("close");
    }
  });

  return (
    <div ref={MenuRef} className="Contenedor-Header">
      <div className="Logo">
        <h1>AutoFlex</h1>
        <h3>Rental</h3>
        <div className="Caja_Salir" onClick={CerrarMenu}>
          <IoClose />
        </div>
      </div>
      <div className="Menu">
        <Btn_Menu Name="Home" status="Active" />
        <Btn_Menu Name="Inventory" />
        <Btn_Menu Name="Reservation" />
        <Btn_Menu Name="Services" />
        <Btn_Menu Name="Contact" />
      </div>
      <div className="Login">
        {/* Usamos Link para redirigir al usuario a /login */}
        <Link to="/login" onClick={handleLoginClick}>
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
