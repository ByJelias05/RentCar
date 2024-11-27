import image from "../../Images/1151041.jpg"
import "../../Css/Reservation.css"

export function Reservations(){
    return(
     
        <div className="Contenedor_Inventario" id="Reservation">

            <img className="Back-Image-Reservation" src={image} alt="" />

                <div className="Contenedor_Reservation">
                    <div className="Contenedor-Titulo">
                        <div className="Titulo_Reservation">
                            <h1> Completa el formulario </h1>
                            <h3>para reservar tu vehículo en minutos.</h3>
                            <h5>Selecciona tus fechas, elige</h5>
                            <h2>el modelo de tu preferencia y  <span> ¡listo!</span></h2>
                        </div>
                        <a href="#Inventory" className="All_Vehiculos">Buscar Vehiculo</a>
                    </div>

                    <div className="Fav-Form">
                        <div className="VehichlosFavorito">


                            {/* <div className="Caja-Fav">
                                <img src="#" alt="foto del vehiculo" />
                            </div> */}


                            <h3 style={{textAlign: 'center'}}>Aqui veras tus vehiculos en favorito</h3>
                            
                        </div>
                        <div className="reservation-container">
                            <h2>Formulario de Reservación</h2>
                            <form >
                                <div className="form-group">
                                    <label htmlFor="start-date">Fecha de Inicio</label>
                                    <input
                                        type="date"
                                        id="start-date"
                                        name="start-date"
                                        // value={startDate}
                                        // onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="end-date">Fecha de Fin</label>
                                    <input
                                        type="date"
                                        id="end-date"
                                        name="end-date"
                                        // value={endDate}
                                        // onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="vehicle-type">Tipo de Vehículo</label>
                                    <select
                                        id="vehicle-type"
                                        name="vehicle-type"
                                        // value={vehicleType}
                                        // onChange={(e) => setVehicleType(e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccione el tipo de vehículo</option>
                                        <option value="compact">Compacto</option>
                                        <option value="sedan">Sedán</option>
                                        <option value="suv">SUV</option>
                                        <option value="luxury">De Lujo</option>
                                        <option value="electric">Eléctrico</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="extras">Opciones Adicionales</label>
                                    <select
                                        id="extras"
                                        name="extras"
                                        // value={extras}
                                        // onChange={(e) => setExtras(e.target.value)}
                                    >
                                        <option value="none">Ninguno</option>
                                        <option value="gps">GPS</option>
                                        <option value="baby-seat">Silla para Bebé</option>
                                        <option value="road-assistance">Asistencia en Carretera</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <button type="submit">Reservar Ahora</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
     
    );
}