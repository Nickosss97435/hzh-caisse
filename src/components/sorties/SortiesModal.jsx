import React, { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function SortiesModal({ onClose }) {
  const [validation, setValidation] = useState("");
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setValidation("");

      // Récupération des valeurs des champs du formulaire
      const rawDate = formRef.current.Date.value; // Get the raw date from input

      // Format the date to dd/mm/yyyy
      const formattedDate = new Date(rawDate).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const montant = parseFloat(formRef.current.montant.value).toFixed(2) + " €";
      const Partenaire = formRef.current.Partenaire.value;
      const Mémo = formRef.current.Mémo.value;

      // Envoi des données vers Firestore
      await addDoc(collection(db, "caisses/3/sorties"), {
        Date: formattedDate,
        montant: montant,
        Partenaire: Partenaire,
        Mémo: Mémo,
      });
      
      onClose(); // Fermer la modal après l'envoi des données
    } catch (error) {
      console.error("Erreur lors de l'envoi des données vers Firestore:", error);
      setValidation("Woops, une erreur est survenue lors de l'envoi des données");
    }
  };

  const closeModal = () => {
    setValidation("");
    onClose();
  };

  // Obtenez la date du jour au format "YYYY-MM-DD"
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-10" style={{ zIndex: 9999 }}>
      <div className="position-relative " style={{ minWidth: "400px", zIndex: 10000 }}>
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title">Sortie de Caisse</h5>
              <button onClick={closeModal} type="button" className="btn-close"></button>
            </div>
            <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
              <form ref={formRef} onSubmit={handleForm} className="form">
                <div className="mb-3">
                  <label htmlFor="Date" className="form-label">Date de sortie</label>
                  <input 
                    type="date" 
                    className="form-control bg-light" 
                    id="Date" 
                    name="Date" 
                    defaultValue={currentDate}
                    // readOnly 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="montant" className="form-label">Montant de la sortie</label>
                  <div className="input-group">
                    <input required type="text" className="form-control bg-light" id="montant" name="montant" />
                    <span className="input-group-text">€</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="Partenaire" className="form-label">Sortie par</label>
                  <select className="form-control bg-light" name="Partenaire" id="Partenaire">
                    <option value="">--Veuillez choisir une option--</option>
                    <option value="Jonas Baptiste">Jonas Baptiste</option>
                    <option value="Nicolas QUÉRAT">Nicolas QUÉRAT</option>
                    <option value="Olivier FRANSON">Olivier FRANSON</option>
                    <option value="Fabrice TIZOMBA">Fabrice TIZOMBA</option>
                    <option value="Bruno K'BIDI">Bruno K'BIDI</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="Mémo" className="form-label">Motif de la sortie</label>
                  <input required type="text" className="form-control bg-light" id="Mémo" name="Mémo" />
                </div>
                
                <p className="text-danger mt-1">{validation}</p>
                <button type="submit" className="btn btn-dark-yellow">Valider</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
