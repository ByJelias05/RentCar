import image from "../../Images/1151041.jpg"
import "../../Css/Contacto.css"

export function Contacto(){
    return(
     
        <div className="Contenedor_Contacto" id="Contact">

            <div className="Contenedor-Titulo">
                <div className="Titulo_Contacto">
                    <h1>Estamos aquí para ayudarte.</h1>
                    <h3>Comunícate con nosotros</h3>
                    <h5>llenando el formulario</h5>
                    <h2>y te responderemos pronto.</h2>
                </div>
            </div>
            
            <div className="contact-container">
                <form  className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            // value={message}
                            // onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            required
                        />
                    </div>

                    <button type="submit">Enviar Mensaje</button>
                </form>
            </div>
   
        </div>
     
    );
}