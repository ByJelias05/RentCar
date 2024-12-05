import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Añadir useLocation para acceder al estado
import "../Css/Checkout.css";
import videoBackground from "../Videos/Inventory_Back.mp4";

export function Checkout() {
  const location = useLocation();  // Obtener el estado pasado desde Reservation.js
  const navigate = useNavigate();

  const { vehicle, startDate, endDate, totalPrice, extras } = location.state || {};
  const extrasList = Array.isArray(extras) ? extras : [];  // Aseguramos que extras sea un array

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditCardData, setCreditCardData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [paypalUsername, setPaypalUsername] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Función para cambiar el paso de la reserva
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Función para manejar el cambio del método de pago
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Función para manejar los cambios en los datos de la tarjeta de crédito
  const handleCardDataChange = (e) => {
    const { name, value } = e.target;
    setCreditCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar el cambio del nombre de usuario de PayPal
  const handlePaypalUsernameChange = (e) => {
    setPaypalUsername(e.target.value);
  };

  // Función para manejar el envío del formulario de pago
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Validación de los datos de la tarjeta de crédito
    if (paymentMethod === "creditCard") {
      if (
        !/^\d{16}$/.test(creditCardData.cardNumber) ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(creditCardData.expirationDate) ||
        !/^\d{3,4}$/.test(creditCardData.cvv)
      ) {
        alert("Por favor verifica los detalles de tu tarjeta.");
        return;
      }
    } else if (paymentMethod === "paypal" && !paypalUsername) {
      alert("Por favor ingresa tu usuario de PayPal.");
      return;
    }

    // Simulación de procesamiento de pago
    setIsProcessing(true);
    setTimeout(() => {
      alert("Pago procesado exitosamente. ¡Gracias por su compra!");
      setIsProcessing(false);
      // Redirigir al usuario a la página de agradecimiento
      navigate("/thank-you");
    }, 2000); // Simula un retraso en la transacción
  };

  return (
    <div className="checkout-container">
      <div className="video-background-wrapper">
        <video
          className="video-background"
          autoPlay
          loop
          muted
          onLoadedData={() => console.log("Video cargado")}
        >
          <source src={videoBackground} type="video/mp4" />
          {/* Puedes agregar otros formatos si es necesario */}
          <source src="../Videos/Inventory_Back.webm" type="video/webm" />
          <source src="../Videos/Inventory_Back.ogg" type="video/ogg" />
          Tu navegador no soporta el formato de video.
        </video>
      </div>

      <div className="checkout-form">
        {step === 1 && (
          <>
            <h1>Resumen del Pedido</h1>
            <div className="order-summary">
              {/* Mostrar el nombre completo del vehículo */}
              <p><strong>Vehículo:</strong> {vehicle ? `${vehicle.brand} ${vehicle.model}` : "No seleccionado"}</p>
              <p><strong>Fecha de Inicio:</strong> {startDate}</p>
              <p><strong>Fecha de Fin:</strong> {endDate}</p>
              <p><strong>Extras:</strong> {extrasList.length > 0 ? extrasList.join(", ") : "Ninguno"}</p>
              <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
            </div>
            <button className="btn-reservar" onClick={nextStep}>Continuar al Pago</button>
          </>
        )}

        {step === 2 && (
          <>
            <h1>Seleccionar Método de Pago</h1>
            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  onChange={handlePaymentMethodChange}
                  checked={paymentMethod === "creditCard"}
                />
                Tarjeta de Crédito
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  onChange={handlePaymentMethodChange}
                  checked={paymentMethod === "paypal"}
                />
                PayPal
              </label>
            </div>

            {paymentMethod === "creditCard" && (
              <div className="credit-card-details">
                <div className="form-group">
                  <label htmlFor="cardNumber">Número de Tarjeta</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={creditCardData.cardNumber}
                    onChange={handleCardDataChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expirationDate">Fecha de Expiración</label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    value={creditCardData.expirationDate}
                    onChange={handleCardDataChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={creditCardData.cvv}
                    onChange={handleCardDataChange}
                    required
                  />
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="paypal-details">
                <div className="form-group">
                  <label htmlFor="paypalUsername">Usuario de PayPal</label>
                  <input
                    type="text"
                    id="paypalUsername"
                    name="paypalUsername"
                    value={paypalUsername}
                    onChange={handlePaypalUsernameChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="navigation-buttons">
              <button onClick={prevStep}>Atrás</button>
              <button onClick={nextStep}>Siguiente</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1>Confirmar Pago</h1>
            <p>Por favor verifica tu información antes de confirmar.</p>
            {isProcessing && <p>Procesando el pago, por favor espera...</p>}
            <form onSubmit={handlePaymentSubmit}>
              <button type="submit" className="btn-reservar">
                {isProcessing ? "Procesando..." : "Confirmar Pago"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
