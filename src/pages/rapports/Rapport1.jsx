import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar"
import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CachedIcon from '@mui/icons-material/Cached';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import MyPdfDocument from '../../rapports/MyPdfDocument'; // Assurez-vous que le chemin d'importation est correct
import axios from 'axios'; // Importez axios pour effectuer des appels API

const Rapport1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State pour gérer le chargement

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsSnapshot = await getDocs(collection(db, "caisses/3/transactions"));
        const transactionsData = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const sortiesSnapshot = await getDocs(collection(db, "caisses/3/sorties"));
        const sortiesData = sortiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Combinaison des données des transactions et des sorties
        const allData = [...transactionsData, ...sortiesData];

        // Tri des données par date
        allData.sort((a, b) => new Date(a.Date) - new Date(b.Date));

        // Regroupement des transactions par date
        const groupedData = groupByDate(allData);

        setData(groupedData);
        setLoading(false); // Mettre le chargement à false une fois les données chargées
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Mettre le chargement à false en cas d'erreur
      }
    };

    fetchData();
  }, []);

  // Fonction utilitaire pour regrouper les transactions par date
  const groupByDate = (data) => {
    const groupedData = {};

    data.forEach(item => {
      const date = item.Date;
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });

    return groupedData;
  };

  // Fonction pour envoyer le document par email
  const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-email', data); // Appelez l'API backend pour envoyer l'email
      console.log(response.data); // Affichez la réponse du serveur
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <PDFDownloadLink className="icon" document={<MyPdfDocument data={data} />} fileName="rapport.pdf">
          {({ blob, url, loading: downloadLoading, error }) => (
            downloadLoading ? <CachedIcon fontSize="small" /> : <CloudUploadIcon fontSize="small" onClick={sendEmail} />
          )}
        </PDFDownloadLink>
        <div className="Container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CachedIcon fontSize="large" />
              <span style={{ marginLeft: '5px' }}>Chargement...</span>
            </div>
          ) : (
            <PDFViewer width="100%" height="800px">
              <MyPdfDocument data={data} />
            </PDFViewer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rapport1;
