import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Logo from '../assets/img/logo192.png';

const MyPdfDocument = ({ selectedDate }) => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [fondCaisseData, setFondCaisseData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedDate) {
          const formattedDate = selectedDate.split('-').reverse().join('/');

          const transactionsQuery = query(collection(db, "caisses/3/transactions"), where("Date", "==", formattedDate));
          const transactionsSnapshot = await getDocs(transactionsQuery);
          const transactions = transactionsSnapshot.docs.map(doc => doc.data());
          setTransactionsData(transactions);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    const fetchFondCaisseData = async () => {
      try {
        const fondCaisseSnapshot = await getDocs(collection(db, "caisses/3/FondCaisse"));
        const fondCaisse = fondCaisseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Suppression du signe € et tri des données en fonction des valeurs numériques
        const sortedFondCaisse = fondCaisse.sort((a, b) => {
          const valueA = parseFloat(a.id.replace("€", ""));
          const valueB = parseFloat(b.id.replace("€", ""));
          return valueA - valueB;
        });
        setFondCaisseData(sortedFondCaisse);
      } catch (error) {
        console.error("Error fetching fond caisse data:", error);
      }
    };

    fetchData();
    fetchFondCaisseData();
  }, [selectedDate]);
  
  useEffect(() => {
    const currentUser = "Nom de l'utilisateur";
    setCurrentUser(currentUser);
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.image} src={Logo} />
          <View style={styles.headerText}>
            <Text style={styles.societe}>HZH-OUEST</Text>
            <Text style={styles.address}>16 Bis Rue Claude Chappe</Text>
            <Text style={styles.address}>ZAC 2000, Le Port</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text>Journal de Caisse Ouest :</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Date</Text>
              <Text style={styles.columnHeader}>Nom</Text>
              <Text style={styles.columnHeader}>Partenaire</Text>
              <Text style={styles.columnHeader}>Mémo</Text>
              <Text style={styles.columnHeader}>Journal</Text>
              <Text style={styles.columnHeader}>Montant</Text>
            </View>
            {transactionsData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.cell}>{item.Date}</Text>
                <Text style={styles.cell}>{item.Nom}</Text>
                <Text style={styles.cell}>{item.Partenaire}</Text>
                <Text style={styles.cell}>{item.Mémo}</Text>
                <Text style={styles.cell}>{item.Journal}</Text>
                <Text style={styles.cell}>{item.Montant} €</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
        <Text style={styles.footerText}>{currentUser} - {new Date().toLocaleDateString()}</Text>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <Text>État de la caisse :</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.columnHeader}>Monnaie</Text>
              <Text style={styles.columnHeader}>Quantité</Text>
              <Text style={styles.columnHeader}>Total</Text>
            </View>
            {fondCaisseData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.cell}>{item.id}</Text>
                <Text style={styles.cell}>{item.qts}</Text>
                <Text style={styles.cell}>{parseFloat(item.qts) * parseFloat(item.id.replace("€", ""))} €</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
        <Text style={styles.footerText}>{currentUser} - {new Date().toLocaleDateString()}</Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  content: {
    marginBottom: 20,
  },
  table: {
    border: '1 solid black',
  },
  societe: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid black',
  },
  columnHeader: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: 'green',
    color: '#FFFFFF',
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 8,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 10,
    right: 10,
    color: 'grey',
  },
  footerText: {
    position: 'absolute',
    fontSize: 10,
    bottom: 10,
    left: 10,
    color: 'grey',
  },
});

export default MyPdfDocument;
