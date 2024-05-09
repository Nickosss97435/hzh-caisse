import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore'; // Assurez-vous d'importer correctement Firestore
import { db } from "../../firebase";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const [journalTotals, setJournalTotals] = useState({
    'Espèces (EUR)': 0,
    'Carte bancaire (EUR)': 0,
    'Chèques (EUR)': 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsSnapshot = await getDocs(collection(db, "caisses/3/transactions"));
        const transactionsData = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Calculer les totaux pour chaque type de journal
        const totals = {
          'Espèces (EUR)': 0,
          'Carte bancaire (EUR)': 0,
          'Chèques (EUR)': 0,
        };
        transactionsData.forEach(transaction => {
          const amount = extractAmount(transaction.Montant);
          if (amount !== null) {
            totals[transaction.Journal] += amount;
          }
        });

        setJournalTotals(totals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fonction pour extraire le montant d'une chaîne de caractères
  const extractAmount = (montantStr) => {
    // Supprimer le symbole € et les espaces
    const trimmedStr = montantStr.replace(/€|\s/g, '');
    // Convertir la virgule en point pour permettre la conversion en nombre flottant
    const cleanedStr = trimmedStr.replace(',', '.');
    // Parser la chaîne en tant que nombre flottant
    const amount = parseFloat(cleanedStr);
    // Vérifier si le résultat est un nombre valide
    return isNaN(amount) ? null : amount;
  };

  const data = {
    labels: Object.keys(journalTotals),
    datasets: [
      {
        label: 'Règlements',
        data: Object.values(journalTotals),
        backgroundColor: [
          '#ffbf00', // Warm orange
          '#3b4545', // Light purple
          '#02aa02', // Light green
        ],
        borderColor: [
          '#ffbf00',
          '#3b4545',
          '#02aa02',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '50%', height: '400px' }}>
      <Doughnut data={data} options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Répartition des règlements',
            labels: {
              fontColor: '#333',
            },
            font: {
              size: 18,
              weight: 'bold',
            },
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      }} />
    </div>
  );
}

export default DoughnutChart;
