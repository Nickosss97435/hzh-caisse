// Dans FermetureModal.js
import React, { useRef, useState, useEffect } from "react"; 
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import './fermeture.scss';

export default function FermetureModal({ onClose, updateTotalFermeture }) {

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

  const [totalFermeture, setTotalFermeture] = useState("0.00");

  const inputs = useRef([]);

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  useEffect(() => {
    calculateAndUpdateTotalFermeture(); // Mettre à jour le total de la fermeture dès le début
  }, []); // Utilisez une dépendance vide pour exécuter ce code une seule fois au montage

  const formRef = useRef();

  useEffect(() => {
    calculateAndUpdateTotalFermeture(); // Mettre à jour le total de la fermeture à chaque modification des montants
  }, [amounts]); // Utilisez amounts comme dépendance pour exécuter ce code à chaque modification des montants

  const calculateAndUpdateTotalFermeture = () => {
    let total = 0;
    for (const [currency, quantity] of Object.entries(amounts)) {
      total += quantity * parseFloat(currency.split('€')[0]);
    }
    setTotalFermeture(total.toFixed(2)); // Mettre à jour l'état totalFermeture
    updateTotalFermeture(total.toFixed(2)); // Mettre à jour le total de la fermeture dans DatatableOrder
  };
  
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await updateAmountsInFirestore();
      updateTotalCaisseInFirestore();
      setValidation("");
      onClose(totalFermeture); // Passer le total à DatatableOrder
    } catch {
      setValidation("Woops, votre caisse n'est pas bonne");
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAmounts(prevAmounts => ({
      ...prevAmounts,
      [name]: parseFloat(value) || 0
    }));
  };
  

  const updateAmountsInFirestore = async () => {
    try {
      const currencies = Object.keys(amounts);
      const promises = currencies.map(async (currency) => {
        const currencyDocRef = doc(db, "caisses", "3", "FondCaisse", currency);
        await updateDoc(currencyDocRef, {
          qts: amounts[currency].toString()
        });
      });
      await Promise.all(promises);
    } catch (error) {
      console.error("Error updating data in Firestore:", error);
      throw error;
    }
  };

  const updateTotalCaisseInFirestore = async () => {
    try {
      const totalCaisseRef = doc(db, "caisses", "3", "FondCaisse", "totalcaisse");
      const totalCaisseDocSnap = await getDoc(totalCaisseRef);
      if (totalCaisseDocSnap.exists()) {
        await updateDoc(totalCaisseRef, { 
          sommes: totalFermeture
        });
      } else {
        console.log("Document for totalcaisse not found.");
      }
    } catch (error) {
      console.error("Error updating total caisse in Firestore:", error);
      throw error;
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
              <div>Total: {totalFermeture} €</div>
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
                    <span>Total {(amount * parseFloat(currency.split('€')[0])).toFixed(2)} €</span>
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
