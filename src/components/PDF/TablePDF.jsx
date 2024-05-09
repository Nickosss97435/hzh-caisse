import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { db } from "../../firebase";

const GeneratePDF = () => {
  const [ setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const snapshot = await db.collection('caisse').doc('3').collection('FondCaisse').get();
        const fetchedData = snapshot.docs.map(doc => doc.data());
        setData(fetchedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        {data.map((item, index) => (
          <Page key={index} style={styles.page}>
            <View style={styles.section}>
              <Text>Données Caisse Ouest :</Text>
              <View style={styles.row}>
                <Text>{item.field1}</Text>
                <Text>{item.field2}</Text>
                {/* Ajoutez d'autres champs ici */}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
              </View>
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    alignItems: 'center',
    padding: 5,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export default GeneratePDF;
