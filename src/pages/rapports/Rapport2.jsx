import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CachedIcon from '@mui/icons-material/Cached';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import MyPdfDocument from '../../rapports/MyPdfDocument';

const Rapport2 = () => {
  const [selectedDate, setSelectedDate] = useState(""); // État pour stocker la date choisie par l'utilisateur

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
console.log(selectedDate);
  return (
    <div className="list">
      <div>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      {selectedDate && (
        <PDFDownloadLink className="icon" document={<MyPdfDocument selectedDate={selectedDate} />} fileName="rapport.pdf">
          {({ loading: downloadLoading }) => (
            downloadLoading ? <CachedIcon fontSize="small" /> : <CloudUploadIcon fontSize="small" />
          )}
        </PDFDownloadLink>
      )}
      <div className="Container">
        {selectedDate ? (
          <PDFViewer width="100%" height="800px">
            <MyPdfDocument selectedDate={selectedDate} />
          </PDFViewer>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>Sélectionnez une date pour afficher les données.</div>
        )}
      </div>
    </div>
  );
}

export default Rapport2;
