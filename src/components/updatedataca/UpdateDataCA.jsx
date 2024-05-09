import './updatedataca.scss';
import { useState, useEffect } from "react";
import { doc, updateDoc,getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const UpdateDataCA = ({ type }) => {
  const [resultats, setResultats] = useState({});
  const [objectifs, setObjectifs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultatsDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        const objectifsDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));

        if (resultatsDoc.exists()) {
          setResultats(resultatsDoc.data());
        } else {
          console.log("Le document resultats n'existe pas.");
        }

        if (objectifsDoc.exists()) {
          setObjectifs(objectifsDoc.data());
        } else {
          console.log("Le document objectifs n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [type]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Mettre à jour le document resultats
      await updateDoc(doc(db, "caisses", "3", "stats", "resultats"), {
        [type]: Number(event.target.resultats.value)
      });

      // Mettre à jour le document objectifs
      await updateDoc(doc(db, "caisses", "3", "stats", "objectifs"), {
        [type]: Number(event.target.objectifs.value)
      });

      console.log("Données mises à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données :", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "resultats") {
      setResultats({ ...resultats, [type]: value });
    } else if (name === "objectifs") {
      setObjectifs({ ...objectifs, [type]: value });
    }
  };
  

  return (
    <div className="widget">
      <div className="left">
        <span className="title fs-2 sm-1">{type}</span>
        <form onSubmit={handleFormSubmit}>
          <label className="title fs-5 me-5 ms-5">Résultats CA</label>
          <input type="number" name="resultats" value={resultats[type] || ''} onChange={handleInputChange} />
          <label className="title fs-5 me-5 ms-5">Objectifs CA</label>
          <input type="number" name="objectifs" value={objectifs[type] || ''} onChange={handleInputChange} />
          <button type="submit">Valider</button>
        </form>
      </div>
      
    </div>
  );
};

export default UpdateDataCA;
