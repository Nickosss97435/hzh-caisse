import React, { useRef, useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import './ouverture.scss';

export default function OuvertureModal({ onClose }) {

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

  useEffect(() => {
    fetchAmountsFromFirestore();
  }, []);

  const fetchAmountsFromFirestore = async () => {
    try {
      const currencies = Object.keys(amounts);

      const promises = currencies.map(async (currency) => {
        const currencyDocRef = doc(db, "caisses", "3", "FondCaisse", currency);
        const currencyDocSnap = await getDoc(currencyDocRef);
        
        if (currencyDocSnap.exists()) {
          const currencyData = currencyDocSnap.data();
          setAmounts(prevAmounts => ({
            ...prevAmounts,
            [currency]: parseFloat(currencyData.qts) || 0
          }));
        } else {
          console.log(`Document for ${currency} not found.`);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
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
      total += quantity * parseFloat(currency.split('€')[0]); // Multiplier la quantité par la valeur
    }
    return total.toFixed(2);
  };

  // Calculer la valeur totale pour chaque devise
  const calculateCurrencyTotal = (currency) => {
    return (amounts[currency] * parseFloat(currency.split('€')[0])).toFixed(2);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await updateAmountsInFirestore();
      await updateTotalCaisseInFirestore();
      setValidation("");
      window.location.reload();
    } catch {
      setValidation("Woops, votre caisse n'est pas bonne");
    }
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
        const totalCaisseData = totalCaisseDocSnap.data();
        await updateDoc(totalCaisseRef, {
          sommes: calculateTotal()
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
    <div className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" style={{ zIndex: 9999 }}>
      
      <div className="position-relative " style={{ minWidth: "400px", zIndex: 10000 }}>
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title">Ouverture Caisse</h5>
              <div>Total: {calculateTotal()} €</div>
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
                    <span>Total {calculateCurrencyTotal(currency)} €</span>
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
