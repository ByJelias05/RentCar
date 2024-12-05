
import { Header } from '../Components/Header';
import { Contacto } from '../Components/Sections/Contacto';
import { Inventory } from '../Components/Sections/inventory';
import { Reservations } from '../Components/Sections/Reservations';
import { Services } from '../Components/Sections/Services';
import { Slide } from '../Components/Slide/Slide';
import ConnectionTest from '../Components/ConnectionTest';

import '../Css/App.css';

import { createContext, useState } from 'react';

export const MenuContext = createContext();

function App() {
  
  const [AbrirMenu, setAbrirMenu] = useState(false);
  const [ApagarMenu, setApagarMenu] = useState(false);

  return (
   <MenuContext.Provider value={[AbrirMenu, setAbrirMenu, setApagarMenu]}>
     <div className="App">
        <div className="Header-App" id='Home'>
          {
            ApagarMenu != true ?
            <Header/>
            :
            null
          }
          <Slide/>
        </div>
        <div className="Body-App">
          <Inventory/>
          <Reservations/>
          <Services/>
          <Contacto/>
          <div style={{ padding: "20px", backgroundColor: "#f9f9f9", marginTop: "20px" }}>
            <ConnectionTest />
          </div>
        </div>
    </div>
   </MenuContext.Provider>
  );
}

export default App;
