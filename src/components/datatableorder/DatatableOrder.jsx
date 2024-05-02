import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { deleteDoc, doc, addDoc, collection, getDoc, where, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import * as XLSX from 'xlsx';

import './datatableorder.scss'

const DatatableOrder = () => {
  const [excelData, setExcelData] = useState([]);
  const [journalTotals, setJournalTotals] = useState({});
  const [totalGeneral, setTotalGeneral] = useState(0);
  const [totalCaisse, setTotalCaisse] = useState(0);
  const [totalSortiesJour, setTotalSortiesJour] = useState(0); // Ajout du state pour le total des sorties du jour
  const [journalTotalEspeces, setJournalTotalEspeces] = useState(0); // Ajout du state pour le total en espèces du journal

  // ---------------------------- Récupération du total de la caisse ---------------------------- //
  useEffect(() => {
    const fetchTotalCaisse = async () => {
      try {
        const totalCaisseDoc = await getDoc(doc(db, "caisses/3/FondCaisse", "totalcaisse"));
        if (totalCaisseDoc.exists()) {
          setTotalCaisse(totalCaisseDoc.data().sommes);
        } else {
          console.log("Le document du total en caisse n'existe pas.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du total en caisse :", error);
      }
    };

    fetchTotalCaisse();
  }, []);

// ---------------------------- Récupération du total des sorties du jour ---------------------------- //
useEffect(() => {
  const fetchTotalSortiesJour = async () => {
    try {
      const today = new Date().toLocaleDateString('fr-FR');
      const querySnapshot = await getDocs(collection(db, "caisses/3/sorties"));
      let totalSorties = 0;
      querySnapshot.forEach((doc) => {
        const sortieDate = doc.data().Date;
        const sortieMontant = parseFloat(doc.data().montant);
        if (sortieDate === today && !isNaN(sortieMontant)) {
          totalSorties += sortieMontant;
        }
      });
      setTotalSortiesJour(totalSorties);
    } catch (error) {
      console.error("Erreur lors de la récupération du total des sorties du jour :", error);
    }
  };

  fetchTotalSortiesJour();
}, []);

  const totalSortiesJourFormatted = typeof totalSortiesJour === 'number' ? totalSortiesJour.toFixed(2) : '0.00';

    // ---------------------------- Calcul des totaux du journal ---------------------------- //
  useEffect(() => {
    const calculateJournalTotals = () => {
      const totals = {};
      let generalTotal = 0;

      excelData.forEach((row) => {
        const journal = row.Journal;
        const montant = parseFloat(row.Montant.replace(' €', '').replace(',', '.'));
        if (!isNaN(montant)) {
          generalTotal += montant;
          if (totals[journal]) {
            totals[journal] += montant;
          } else {
            totals[journal] = montant;
          }
        }
      });

      setJournalTotals(totals);
      setTotalGeneral(generalTotal);
    };

    calculateJournalTotals();
  }, [excelData]);

  // ---------------------------- Calcul du total en espèces du journal ---------------------------- //
  useEffect(() => {
    const calculateJournalTotalEspeces = () => {
      const totalEspeces = Object.entries(journalTotals)
        .filter(([journal, _]) => journal === 'Espèces (EUR)' && journal.includes('Espèces (EUR)')) 
        .map(([_, total]) => total)
        .reduce((acc, curr) => acc + curr, 0);
      setJournalTotalEspeces(totalEspeces);
    };

    calculateJournalTotalEspeces();
  }, [journalTotals]);

  // ---------------------------- Suppression d'une entrée ---------------------------- //
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "caisses/3/transactions/", id));
      setExcelData(excelData.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------------------- Téléchargement du fichier Excel ---------------------------- //
const handleExcelUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    const data = evt.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    const mappedData = excelData.slice(1).map((row, index) => ({
      id: `${index}`,
      Nom: row[0],
      Partenaire: row[1],
      Journal: row[2],
      Mémo: row[3],
      Montant: `${row[4]} €`,
      Date: formatDate(row[5]), // Utilisation de la fonction formatDate pour formater la date
      État: row[6] 
    }));

    setExcelData(mappedData);
  };
  reader.readAsBinaryString(file);
};

// ---------------------------- Formatage de la date ---------------------------- //
const formatDate = (dateString) => {
  if (typeof dateString !== 'number') {
    return dateString;
  }

  // Convertir la date Excel en format de date JavaScript
  const excelDate = new Date((dateString - 25569) * 86400 * 1000);

  // Extraire les composants de la date
  const day = excelDate.getDate().toString().padStart(2, '0');
  const month = (excelDate.getMonth() + 1).toString().padStart(2, '0');
  const year = excelDate.getFullYear();

  // Formater la date comme "jour/mois/année"
  return `${day}/${month}/${year}`;
};
  // ---------------------------- Validation des données ---------------------------- //
const handleValidate = async () => {
  // Afficher une alerte de confirmation
  const confirmResult = window.confirm("Attention : vous êtes sur le point de clôturer votre caisse ! Voulez-vous confirmer ?");

  // Vérifier si l'utilisateur a cliqué sur "OK" dans l'alerte
  if (confirmResult) {
    try {
      await Promise.all(
        excelData.map(async (item) => {
          const formattedDate = formatDate(item.Date);
          const dataForFirestore = { ...item, Date: formattedDate };
          await addDoc(collection(db, "caisses/3/transactions/"), dataForFirestore);
        })
      );
      console.log("Données envoyées avec succès à Firestore !");
      setExcelData([]);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données à Firestore :", error);
    }
  } else {
    console.log("L'utilisateur a annulé la clôture de la caisse.");
  }
};


  // ---------------------------- Ouverture d'Odoo ---------------------------- //
  const handleOpenOdoo = () => {
    window.open('https://odoo.mondistri.re/web#action=246&cids=1&menu_id=224&model=account.payment&view_type=list', '_blank');
  };

  // ---------------------------- Colonnes d'action ---------------------------- //
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Supprimer
            </div>
          </div>
        );
      },
    },
  ];

  // ---------------------------- Calcul du total en caisse et différence ---------------------------- //
  const totalEnCaisse = totalCaisse - totalSortiesJourFormatted + journalTotalEspeces;
  const differenceCaisse = totalEnCaisse - totalCaisse;

  // Détermination de la classe en fonction de la valeur de differenceCaisse
let differenceCaisseClass = "";
if (differenceCaisse < 0) {
  differenceCaisseClass = "text-danger"; // Rouge pour une différence négative
} else if (differenceCaisse === 0) {
  differenceCaisseClass = "text-success"; // Vert pour une différence nulle
} else {
  differenceCaisseClass = "text-warning"; // Jaune pour une différence positive
}

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Transaction
      </div>
      
      <div className="totalsContainer">
        <div className="totalItem">
          <h3>Ouverture Caisse</h3>
          <h6>{totalCaisse} €</h6>
        </div>

        <div className="totalItem">
          <h3>Total Sorties du Jour</h3>
          <h6 className="text-danger">{totalSortiesJourFormatted} €</h6>
        </div>

        <div className="totalItem">
          <h3>Totaux par Journal</h3>
          {Object.entries(journalTotals).map(([journal, total]) => (
            <h6 key={journal}>
              {journal}: {total.toFixed(2)} €
            </h6>
          ))}
        </div>

        <div className="totalItem">
          <h3>Total Transactions</h3>
          <h6>{totalGeneral.toFixed(2)} €</h6>
        </div>

        <div className="totalItem">
            <h3>Total en Caisse</h3>
            <h6 className="text-success">{totalEnCaisse.toFixed(2)} €</h6>
          </div>

        <div className="totalItem">
            <h3>Fermeture Caisse</h3>
            <h6 className="text-success">{totalEnCaisse.toFixed(2)} €</h6>
          </div>
          
      </div>
      <div className="totalItem">
      <div className="totalItem">
  <h6 className={differenceCaisseClass}>Différence: {differenceCaisse.toFixed(2)} €</h6>
  {differenceCaisse < 0 && differenceCaisse > -10 && (
    <p className="text-warning">Attention : la caisse est inférieure à la valeur attendue.</p>
  )}
  {differenceCaisse < -10 && (
    <p className="text-danger">Attention : la caisse est très en dessous de la valeur attendue ! Merci de la vérifier.</p>
  )}
  {differenceCaisse > 0 && differenceCaisse < 10 && (
    <p className="text-warning">Attention : la caisse est supérieure à la valeur attendue.</p>
  )}
  {differenceCaisse > 10 && (
    <p className="text-danger">Attention : la caisse est très au-dessus de la valeur attendue ! Merci de la vérifier.</p>
  )}
</div>


      <input
        className="me-5 pb-5"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleExcelUpload}
      />
      <button
        className="openOdooButton btn-purple  ms-5"
        onClick={handleOpenOdoo}
      >
        Odoo
      </button>
      <button
        className="submitButton ms-5"
        type="submit"
        onClick={handleValidate}
      >
        Valider
      </button>
      
      
      </div>
      <DataGrid
        className="datagrid"
        rows={excelData}
        columns={[
          { field: "Nom", headerName: "Nom", width: 150 },
          { field: "Partenaire", headerName: "Partenaire", width: 150 },
          { field: "Journal", headerName: "Journal", width: 150 },
          { field: "Mémo", headerName: "Mémo", width: 150 },
          { field: "Montant", headerName: "Montant", width: 150 },
          { field: "Date", headerName: "Date", width: 150 },
          { field: "État", headerName: "État", width: 150, cellClassName: (params) => `cellWithStatus ${params.value}` },
          ...actionColumn
        ]}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableOrder;
