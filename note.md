
# GUIT HUB
### Git Hub

créer un nouveau repositorie
sur VSCode: 
git init
git remote add origin https://github.com/Nickosss97435/
git add .
git commit -m "premier commit"
git push origin master

git add .
git commit -m "deuxieme commit"
git push origin master



# Structure DB Firestore

# __Caisses
## ____1
### ____FondCaisse
#### ________Total
#### ________200€
#### ________100€
#### ________50€
#### ________20€
#### ________10€
#### ________5€
#### ________2€
#### ________1€
#### ________0.50€
#### ________0.20€
#### ________0.10€
#### ________0.05€
#### ________0.02€
#### ________0.01€
### ____transactions
#### ________uid_1
##### ___________Date
##### ___________Journal
##### ___________Montant
##### ___________Mémo
##### ___________Nom
##### ___________Partenaire
##### ___________id
##### ___________État
## ____2
### ____FondCaisse
#### ________Total
#### ________200€
#### ________100€
#### ________50€
#### ________20€
#### ________10€
#### ________5€
#### ________2€
#### ________1€
#### ________0.50€
#### ________0.20€
#### ________0.10€
#### ________0.05€
#### ________0.02€
#### ________0.01€
### ____transactions
#### ________uid_1
##### ___________Date
##### ___________Journal
##### ___________Montant
##### ___________Mémo
##### ___________Nom
##### ___________Partenaire
##### ___________id
##### ___________État
## ____3
### ____FondCaisse
#### ________Total
#### ________200€
#### ________100€
#### ________50€
#### ________20€
#### ________10€
#### ________5€
#### ________2€
#### ________1€
#### ________0.50€
#### ________0.20€
#### ________0.10€
#### ________0.05€
#### ________0.02€
#### ________0.01€
### ____transactions
#### ________uid_1
##### ___________Date
##### ___________Journal
##### ___________Montant
##### ___________Mémo
##### ___________Nom
##### ___________Partenaire
##### ___________id
##### ___________État
## ____4
### ____FondCaisse
#### ________Total
#### ________200€
#### ________100€
#### ________50€
#### ________20€
#### ________10€
#### ________5€
#### ________2€
#### ________1€
#### ________0.50€
#### ________0.20€
#### ________0.10€
#### ________0.05€
#### ________0.02€
#### ________0.01€
### ____transactions
#### ________uid_1
##### ___________Date
##### ___________Journal
##### ___________Montant
##### ___________Mémo
##### ___________Nom
##### ___________Partenaire
##### ___________id
##### ___________État

# __users
## ____uid1
### _____agence
### _____avatar
### _____email
### _____name
### _____phone
### _____role
### _____user
### _____username

# __les règle Firestore Database

//***************A l'origine: ******************/

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

<!--***************Sécurisation: règles de sécurité de base qui autorisent l'accès en lecture aux utilisateurs authentifiés et l'accès en écriture aux utilisateurs ayant le rôle d'administrateur******************-->

service cloud.firestore {
  match /databases/{database}/documents {
    // Autoriser l'accès en lecture aux utilisateurs authentifiés
    match /{document=**} {
      allow read: if request.auth != null;
    }

    // Autoriser l'accès en écriture aux administrateurs
    match /{document=**} {
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}

<!--Firestore Storage -->
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}


service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Vérifier si l'utilisateur est authentifié
      allow read, write: if request.auth != null && 
                            // Vérifier si l'utilisateur est administrateur
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}

<!--************************************************************************************************************************* -->

## Structure Application

# _backend
## __index.js
## __Routes
### ___Route.js

# _frontend
## __index.js
## __App.js
## __datatablesource.js
## __formSource.js
## __firebase.js
## __theme.js
## __src
### ___assets
#### ____img
##### _____png
##### _____jpg
##### _____svg
#### ____fonts
### ___components
#### ____navbar
##### _____Navbar.jsx
#### ____sidebar
##### _____Sidebar.jsx
#### ____chart
##### _____Chart.jsx
#### ____datatable
##### _____Datatable.jsx
#### ____datatablelog
##### _____DatatableLog.jsx
#### ____datatableorder
##### _____DatatableOrder.jsx
#### ____ouverture
##### _____OuvertureModal.jsx
#### ____fermeture
##### _____FermetureModal.jsx
#### ____profiles
##### _____Profiles.jsx
#### ____table
##### _____Table.jsx
#### ____widget
##### _____Widget.jsx
### ___context
#### ____AuthContext.js
#### ____AuthReducer.js
#### ____darkModeContext.js
#### ____darkModeReducer.js
### ___pages
#### ____home
##### _____Home.jsx
#### ____list
##### _____list.jsx
#### ____log
##### _____log.jsx
#### ____login
##### _____login.jsx
#### ____new
##### _____New.jsx
#### ____order
##### _____Order.jsx
#### ____profiles
##### _____Profiles.jsx
#### ____single
##### _____Single.jsx
### ___style
#### ____dak.scss
#### ____Nuancier.scss


<!-- ******************************save code********************************  -->

<!-- **************************DatatableOrder.jsx**************************** -->

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import FermetureModal from "../fermeture/FermetureModal";
import { deleteDoc, doc, addDoc, collection, getDoc, getDocs } from "firebase/firestore";
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
  const [fermetureModalVisible, setFermetureModalVisible] = useState(false);
  const [totalFermeture, setTotalFermeture] = useState(0); // État pour stocker le total de fermeture

  // ---------------------------- Ouverture et fermeture de la Modal Fermeture ---------------------------- //
  const handleOpenFermetureModal = () => {
    setFermetureModalVisible(true);
  };

  const handleCloseFermetureModal = () => {
    setFermetureModalVisible(false);
  };

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

// ---------------------------- Déclarez une fonction pour mettre à jour le total de fermeture ---------------------------- //
const updateTotalCaisse = (totalFermeture) => {
  // Mettez à jour le total de fermeture dans l'état ou effectuez toute autre logique nécessaire
  setTotalFermeture(totalFermeture);
};
  // ---------------------------- Calcul du total en caisse et différence ---------------------------- //
  const totalEnCaisse = totalCaisse - totalSortiesJourFormatted + journalTotalEspeces;
  const differenceCaisse = totalFermeture - totalEnCaisse;

   // ---------------------------- Modifier la couleur du message d'alerte en fonction de la valeur de differenceCaisse ---------------------------- //
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
            <h6 className="text-success">{totalFermeture} €</h6>
        </div>
      </div>
      <div className="totalsContainer">
          <div className="totalItem">
            <input className="downloadxlsx pe-5" type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} />
            <button className="openOdooButton btn-purple  ms-5" onClick={handleOpenOdoo} >
              Odoo
            </button>
            <button className="submitButton ms-5 mt-5" type="submit" onClick={handleValidate} >
              Valider
            </button>
            <button className="fermetureButton ms-5 mt-5" onClick={handleOpenFermetureModal}>
              Fermeture
            </button>
            {fermetureModalVisible && <FermetureModal onClose={handleCloseFermetureModal} updateTotalCaisse={updateTotalCaisse} />}
          </div>
        </div>
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
        <div className="totalItem">

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

<!-- ***************************FermetureModal.jsx******************************* -->

import React, { useRef, useState, useEffect } from "react"; 
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import './fermeture.scss';

export default function FermetureModal({ onClose, updateTotalCaisse }) {

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
          updateTotalFermeture(); // Mettre à jour totalFermeture dès que les montants sont récupérés
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
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [name]: parseFloat(value) || 0
    }));
    updateTotalFermeture(); // Mettre à jour totalFermeture à chaque modification du montant
  };

  const updateTotalFermeture = () => {
    const totalFermeture = calculateTotal();
    updateTotalCaisse(totalFermeture);
  }

  const calculateTotal = () => {
    let total = 0;
    for (const [currency, quantity] of Object.entries(amounts)) {
      total += quantity * parseFloat(currency.split('€')[0]); // Multiplier la quantité par la valeur
    }
    return total.toFixed(2);
  };

  const calculateCurrencyTotal = (currency) => {
    return (amounts[currency] * parseFloat(currency.split('€')[0])).toFixed(2);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await updateAmountsInFirestore();
      await updateTotalCaisseInFirestore();
      setValidation("");
      // window.location.reload();
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
    <div className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center " style={{ zIndex: 9999 }}>
      
      <div className="position-relative " style={{ minWidth: "400px", zIndex: 10000 }}>
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title">Fermeture Caisse </h5>
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
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
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






export default function FermetureModal({ onClose, updateTotalFermeture })



setTotalFermeture(total.toFixed(2)); // Mettre à jour l'état totalFermeture
    updateTotalFermeture(total.toFixed(2)); // Mettre à jour le total de la fermeture dans DatatableOrder
  };

# hzholding 

REACT_APP_FIREBASE_API_KEY  =  AIzaSyBFwAaOdkO60mjnmm8CAvyYXIw1dMYepnA
REACT_APP_FIREBASE_AUTH_DOMAIN  =  hzholding.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID  =  hzholding
REACT_APP_FIREBASE_STORAGE_BUCKET  =  hzholding.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID  =  971470248360
REACT_APP_FIREBASE_APP_ID  =  1:971470248360:web:0166bbcdaae80d5c01259d
REACT_APP_FIREBASE_MEASUREMENT_ID  =  G-PZ8VVP7E9V

# gestion-caisse 

REACT_APP_FIREBASE_API_KEY  =  AIzaSyB9tVMD6kLxYCCJKBd000iSAHaz9JTsdT4
REACT_APP_FIREBASE_AUTH_DOMAIN  =  gestion-caisse-bfb3d.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL  =  https://gestion-caisse-bfb3d-default-rtdb.europe-west1.firebasedatabase.app
REACT_APP_FIREBASE_PROJECT_ID  =  gestion-caisse-bfb3d
REACT_APP_FIREBASE_STORAGE_BUCKET  =  gestion-caisse-bfb3d.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID  =  402222495757
REACT_APP_FIREBASE_APP_ID  =  1:402222495757:web:40cf10aef77ddc22c1bd44
REACT_APP_FIREBASE_MEASUREMENT_ID  =  G-PZ8VVP7E9V

règle Firestore
REGLE 1:

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

REGLE 2

rules_version = '2';

function isUserAuthentificated() {
 return request.auth != null
}

function isUserOwner(ID_ouverture_caisse) {
 return request.auth.uid == ID_ouverture_caisse
}

function isUserAdmin() {
 return request.auth.token.admin == true
}

service cloud.firestore {
  match /databases/{database}/documents {
    match /Caisses/Agence_Ouest/Ouverture_caisse/{ID_ouverture_caisse} {
      allow read, write: if isUserAuthentificated() && isUserOwner(ID_ouverture_caisse) || isUserAdmin();
    }
     
  }
}