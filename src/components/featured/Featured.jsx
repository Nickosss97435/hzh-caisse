import "./featured.scss";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StatsBc from "../statsbc/StatBc";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Featured = () => {
  const [bcJour, setBcJour] = useState(0);
  const [objectifBc, setObjectifBc] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        // Récupérer bcJour à partir de Firestore
        const bcJourDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (bcJourDoc.exists()) {
          setBcJour(bcJourDoc.data().caJour);
        } else {
          console.log("Le document bcJour n'existe pas.");
        }

        // Récupérer objectifBc à partir de Firestore
        const objectifBcDoc = await getDoc(doc(db, "caisses", "3", "stats",  "objectifs"));
        if (objectifBcDoc.exists()) {
          setObjectifBc(objectifBcDoc.data().caJour);
        } else {
          console.log("Le document objectifBc n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchValues();
  }, []);

  const pourcentageObjectif = (bcJour / objectifBc) * 100 || 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Styles pour personnaliser les couleurs de la barre de progression et du texte
  const customStyles = {
    root: {},
    path: {
      stroke: "#02aa02", // Couleur de la barre de progression
    },
    trail: {
      stroke: "#d6d6d6", // Couleur de la piste de progression
    },
    text: {
      fill: "#02aa02", // Couleur du texte de progression
      fontSize: "24px", // Taille du texte de progression
    },
  };


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Journée</h1>
        <MoreVertIcon fontSize="small" className="link-icon" onClick={openModal} />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          {/* Utilisation du CircularProgressbar avec les styles personnalisés */}
          <CircularProgressbar
            value={pourcentageObjectif}
            text={`${pourcentageObjectif.toFixed(2)} %`}
            strokeWidth={5}
            styles={customStyles}
          />
        </div>
        <p className="title">Bon de commande totales réalisées aujourd'hui</p>
        <p className="amount text-primary">{bcJour} €</p>
        <p className="desc">
          Traitement des BC précédentes. Les derniers BC peuvent ne pas être inclus.
        </p>
      </div>
      {isModalOpen && <StatsBc onClose={closeModal} />}
    </div>
  );
};

export default Featured;
