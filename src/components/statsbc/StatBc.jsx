import React, { useRef, useState, useEffect } from "react";
import {  doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function StatsBc({ onClose }) {
  const [validation, setValidation] = useState("");
  const [ResultatscaJour, setResultatscaJour] = useState("");
  const [ObjectifscaJour, setObjectifscaJour] = useState("");
  const formRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultatsDoc = await getDoc(doc(db, "caisses/3/stats", "resultats"));
        const objectifsDoc = await getDoc(doc(db, "caisses/3/stats", "objectifs"));

        if (resultatsDoc.exists()) {
          setResultatscaJour(resultatsDoc.data().caJour);
        }
        if (objectifsDoc.exists()) {
          setObjectifscaJour(objectifsDoc.data().caJour);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données depuis Firestore :", error);
      }
    };

    fetchData();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setValidation("");
      

      const resultatsCaJour = parseFloat(ResultatscaJour).toFixed(2);
      const objectifsCaJour = parseFloat(ObjectifscaJour).toFixed(2);

      // Mettre à jour les données dans Firestore
      await Promise.all([
        updateDoc(doc(db, "caisses/3/stats", "resultats"), { caJour: resultatsCaJour }),
        updateDoc(doc(db, "caisses/3/stats", "objectifs"), { caJour: objectifsCaJour }),
      ]);

      onClose(); // Fermer la modal après la mise à jour des données
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données dans Firestore :", error);
      setValidation("Woops, une erreur est survenue lors de la mise à jour des données");
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
              <h5 className="modal-title">Mise à jour de la Journée</h5>
              <button onClick={closeModal} type="button" className="btn-close"></button>
            </div>
            <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
              <form ref={formRef} onSubmit={handleForm} className="form">
                <div className="mb-3">
                  <label htmlFor="ResultatscaJour" className="form-label">Résultat</label>
                  <div className="input-group">
                    <input required type="number" className="form-control bg-light" id="ResultatscaJour" name="ResultatscaJour" value={ResultatscaJour} onChange={(e) => setResultatscaJour(e.target.value)} />
                    <span className="input-group-text">€</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="ObjectifscaJour" className="form-label">Objectif</label>
                  <div className="input-group">
                    <input required type="number" className="form-control bg-light" id="ObjectifscaJour" name="ObjectifscaJour" value={ObjectifscaJour} onChange={(e) => setObjectifscaJour(e.target.value)} />
                    <span className="input-group-text">€</span>
                  </div>
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
