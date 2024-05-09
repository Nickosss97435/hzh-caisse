import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [resultatsJanvier, setResultatsJanvier] = useState(0);
  const [objectifsJanvier, setObjectifsJanvier] = useState(0);
  const [resultatsFevrier, setResultatsFevrier] = useState(0);
  const [objectifsFevrier, setObjectifsFevrier] = useState(0);
  const [resultatsMars, setResultatsMars] = useState(0);
  const [objectifsMars, setObjectifsMars] = useState(0);
  const [resultatsAvril, setResultatsAvril] = useState(0);
  const [objectifsAvril, setObjectifsAvril] = useState(0);
  const [resultatsMai, setResultatsMai] = useState(0);
  const [objectifsMai, setObjectifsMai] = useState(0);
  const [resultatsJuin, setResultatsJuin] = useState(0);
  const [objectifsJuin, setObjectifsJuin] = useState(0);
  const [resultatsJuillet, setResultatsJuillet] = useState(0);
  const [objectifsJuillet, setObjectifsJuillet] = useState(0);
  const [resultatsAout, setResultatsAout] = useState(0);
  const [objectifsAout, setObjectifsAout] = useState(0);
  const [resultatsSeptembre, setResultatsSeptembre] = useState(0);
  const [objectifsSeptembre, setObjectifsSeptembre] = useState(0);
  const [resultatsOctobre, setResultatsOctobre] = useState(0);
  const [objectifsOctobre, setObjectifsOctobre] = useState(0);
  const [resultatsNovembre, setResultatsNovembre] = useState(0);
  const [objectifsNovembre, setObjectifsNovembre] = useState(0);
  const [resultatsDecembre, setResultatsDecembre] = useState(0);
  const [objectifsDecembre, setObjectifsDecembre] = useState(0);
  // Déclarer d'autres états pour les autres mois

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultatJanvierDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatJanvierDoc.exists()) {
          setResultatsJanvier(resultatJanvierDoc.data().Janvier);
        } else {
          console.log("Le document resultatsJanvier n'existe pas.");
        }

        const objectifsJanvierDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsJanvierDoc.exists()) {
          setObjectifsJanvier(objectifsJanvierDoc.data().Janvier);
        } else {
          console.log("Le document objectifsJanvier n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Fevrier********************************************** */
      try {
        const resultatFevrierDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatFevrierDoc.exists()) {
          setResultatsFevrier(resultatFevrierDoc.data().Fevrier);
        } else {
          console.log("Le document resultatsFevrier n'existe pas.");
        }

        const objectifsFevrierDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsFevrierDoc.exists()) {
          setObjectifsFevrier(objectifsFevrierDoc.data().Fevrier);
        } else {
          console.log("Le document objectifsFevrier n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Mars********************************************** */
      try {
        const resultatMarsDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatMarsDoc.exists()) {
          setResultatsMars(resultatMarsDoc.data().Mars);
        } else {
          console.log("Le document resultatsMars n'existe pas.");
        }

        const objectifsMarsDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsMarsDoc.exists()) {
          setObjectifsMars(objectifsMarsDoc.data().Mars);
        } else {
          console.log("Le document objectifsMars n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Avril********************************************** */
      try {
        const resultatAvrilDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatAvrilDoc.exists()) {
          setResultatsAvril(resultatAvrilDoc.data().Avril);
        } else {
          console.log("Le document resultatsAvril n'existe pas.");
        }

        const objectifsAvrilDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsAvrilDoc.exists()) {
          setObjectifsAvril(objectifsAvrilDoc.data().Avril);
        } else {
          console.log("Le document objectifsAvril n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Mai********************************************** */
      try {
        const resultatMaiDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatMaiDoc.exists()) {
          setResultatsMai(resultatMaiDoc.data().Mai);
        } else {
          console.log("Le document resultatsMai n'existe pas.");
        }

        const objectifsMaiDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsMaiDoc.exists()) {
          setObjectifsMai(objectifsMaiDoc.data().Mai);
        } else {
          console.log("Le document objectifsMai n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Juin********************************************** */
      try {
        const resultatJuinDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatJuinDoc.exists()) {
          setResultatsJuin(resultatJuinDoc.data().Juin);
        } else {
          console.log("Le document resultatsJuin n'existe pas.");
        }

        const objectifsJuinDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsJuinDoc.exists()) {
          setObjectifsJuin(objectifsJuinDoc.data().Juin);
        } else {
          console.log("Le document objectifsJuin n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Juillet********************************************** */
      try {
        const resultatJuilletDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatJuilletDoc.exists()) {
          setResultatsJuillet(resultatJuilletDoc.data().Juillet);
        } else {
          console.log("Le document resultatsJuillet n'existe pas.");
        }

        const objectifsJuilletDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsJuilletDoc.exists()) {
          setObjectifsJuillet(objectifsJuilletDoc.data().Juillet);
        } else {
          console.log("Le document objectifsJuillet n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Aout********************************************** */
      try {
        const resultatAoutDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatAoutDoc.exists()) {
          setResultatsAout(resultatAoutDoc.data().Aout);
        } else {
          console.log("Le document resultatsAout n'existe pas.");
        }

        const objectifsAoutDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsAoutDoc.exists()) {
          setObjectifsAout(objectifsAoutDoc.data().Aout);
        } else {
          console.log("Le document objectifsAout n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Septembre********************************************** */
      try {
        const resultatSeptembreDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatSeptembreDoc.exists()) {
          setResultatsSeptembre(resultatSeptembreDoc.data().Septembre);
        } else {
          console.log("Le document resultatsSeptembre n'existe pas.");
        }

        const objectifsSeptembreDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsSeptembreDoc.exists()) {
          setObjectifsSeptembre(objectifsSeptembreDoc.data().Septembre);
        } else {
          console.log("Le document objectifsSeptembre n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Octobre********************************************** */
      try {
        const resultatOctobreDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatOctobreDoc.exists()) {
          setResultatsOctobre(resultatOctobreDoc.data().Octobre);
        } else {
          console.log("Le document resultatsOctobre n'existe pas.");
        }

        const objectifsOctobreDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsOctobreDoc.exists()) {
          setObjectifsOctobre(objectifsOctobreDoc.data().Octobre);
        } else {
          console.log("Le document objectifsOctobre n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Novembre********************************************** */
      try {
        const resultatNovembreDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatNovembreDoc.exists()) {
          setResultatsNovembre(resultatNovembreDoc.data().Novembre);
        } else {
          console.log("Le document resultatsNovembre n'existe pas.");
        }

        const objectifsNovembreDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsNovembreDoc.exists()) {
          setObjectifsNovembre(objectifsNovembreDoc.data().Novembre);
        } else {
          console.log("Le document objectifsNovembre n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
//*************************************Decembre********************************************** */
      try {
        const resultatDecembreDoc = await getDoc(doc(db, "caisses", "3", "stats", "resultats"));
        if (resultatDecembreDoc.exists()) {
          setResultatsDecembre(resultatDecembreDoc.data().Decembre);
        } else {
          console.log("Le document resultatsDecembre n'existe pas.");
        }

        const objectifsDecembreDoc = await getDoc(doc(db, "caisses", "3", "stats", "objectifs"));
        if (objectifsDecembreDoc.exists()) {
          setObjectifsDecembre(objectifsDecembreDoc.data().Decembre);
        } else {
          console.log("Le document objectifsJDecembre n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };


    fetchData();
  }, []);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Graphique Bar - Évolution CA',
      },
    },
    maintainAspectRatio: false, // Désactiver le maintien du rapport hauteur/largeur
    responsive: true,
    scales: {
      x: {
        type: 'category', // Utilisation de l'échelle de catégorie
        stacked: true,
      },
      y: {
        stacked: false,
        // min: 0, // Définir une valeur minimale pour l'axe y
      },
    },
  };

  const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Ca Actuel',
        data: [resultatsJanvier,  resultatsFevrier,  resultatsMars, resultatsAvril,  resultatsMai,  resultatsJuin,  
          resultatsJuillet,  resultatsAout,  resultatsSeptembre,  resultatsOctobre,  resultatsNovembre,  resultatsDecembre ],
        backgroundColor: '#02aa02',
      },
      {
        label: 'Objectif CA 2024',
        data: [objectifsJanvier, objectifsFevrier, objectifsMars, objectifsAvril, objectifsMai, objectifsJuin, 
          objectifsJuillet, objectifsAout, objectifsSeptembre, objectifsOctobre, objectifsNovembre, objectifsDecembre], // Données pour les mois à partir de Mai
        backgroundColor: '#3b4545',
      },
    ],
  };

  return (
    <div style={{ width: '50%', height: '400px' }}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default BarChart;
