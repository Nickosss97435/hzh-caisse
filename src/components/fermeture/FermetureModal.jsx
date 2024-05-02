import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './fermeture.scss';

export default function FermetureModal({ onClose }) {
  const navigate = useNavigate();

  const [validation, setValidation] = useState("");
  const [amounts, setAmounts] = useState({
    '200€': 0,
    '100€': 0,
    '50€': 0,
    '20€': 0,
    '10€': 0,
    '5€': 0,
    '2€': 0,
    '1€': 0,
    '0.50€': 0,
    '0.20€': 0,
    '0.10€': 0,
    '0.05€': 0,
    '0.02€': 0,
    '0.01€': 0
  });

  // Ajouter les valeurs correspondantes à chaque devise
  const currencyValues = {
    '200€': 200,
    '100€': 100,
    '50€': 50,
    '20€': 20,
    '10€': 10,
    '5€': 5,
    '2€': 2,
    '1€': 1,
    '0.50€': 0.5,
    '0.20€': 0.2,
    '0.10€': 0.1,
    '0.05€': 0.05,
    '0.02€': 0.02,
    '0.01€': 0.01
  };

  const inputs = useRef([]);

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAmounts(prevAmounts => ({
      ...prevAmounts,
      [name]: parseFloat(value) || 0
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    for (const [currency, quantity] of Object.entries(amounts)) {
      total += quantity * currencyValues[currency]; // Multiplier la quantité par la valeur de la devise
    }
    return total.toFixed(2);
  };

  // Calculer la valeur totale pour chaque devise
  const calculateCurrencyTotal = (currency) => {
    return (amounts[currency] * currencyValues[currency]).toFixed(2);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setValidation("");
      navigate("/order");
    } catch {
      setValidation("Woops, votre caisse n'est pas bonne");
    }
  };

  const closeModal = () => {
    setValidation("");
    onClose();
  };

  return (
    <div className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-10" style={{ zIndex: 9999 }}>
      
      <div className="position-relative " style={{ minWidth: "400px", zIndex: 10000 }}>
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title">Fermeture Caisse</h5>
              <div>Total: {calculateTotal()} €</div> {/* Affichage du total */}
              <button onClick={closeModal} type="button" className="btn-close"></button>
            </div>
            <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
              <form ref={formRef} onSubmit={handleForm} className="form">
                {Object.entries(amounts).map(([currency, amount]) => (
                  <div className="mb-3" key={currency}>
                    <label htmlFor={currency} className="form-label">{currency}</label>
                    <input 
                      ref={addInputs} 
                      name={currency} 
                      required 
                      type="number" 
                      className="form-control bg-light" 
                      id={currency} 
                      value={amount} 
                      onChange={handleInputChange} 
                    />
                    <span>Total {calculateCurrencyTotal(currency)} €</span> {/* Affichage de la valeur totale */}
                  </div>
                ))}
                <p className="text-danger mt-1">{validation}</p>
                <button className="btn btn-dark-yellow">Valider</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
