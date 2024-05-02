import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const MyPdfDocument = () => {
  const [data, setData] = useState([]);

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
      } catch (error) {
        console.error("Error fetching data:", error);
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.header}>
          {/* En-tête de l'entreprise */}
          <Text src="../assets/img/logo.svg"></Text>
          <Text>HZH-OUEST</Text>
          <Text>16 Bis Rue Claude Chappe</Text>
            <Text> ZAC 2000, Le Port</Text>
          <Text>+262 262 25 99 99</Text>
          {/* Autres informations d'entreprise */}
        </View>

        <View style={styles.content}>
          <Text>Journal de Caisse Ouest :</Text>
          {/* Affichage des données */}
          {Object.keys(data).map((date, index) => (
            <View key={index}>
              <Text style={styles.date}>{date}</Text>
              {data[date].map((item, i) => (
                <View key={i} style={styles.transaction}>
                  <Text>Date: {item.Date}</Text>
                  <Text>Journal: {item.Journal}</Text>
                  <Text>Montant: {item.Montant}</Text>
                  <Text>Mémo: {item.Mémo}</Text>
                  <Text>Nom: {item.Nom}</Text>
                  <Text>Partenaire: {item.Partenaire}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
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
  },
  content: {
    marginBottom: 20,
  },
  date: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  transaction: {
    marginBottom: 10,
  },
});

export default MyPdfDocument;
