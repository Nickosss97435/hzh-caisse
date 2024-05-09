import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; 
import { Link } from "react-router-dom";
//import emailjs from 'emailjs-com';
import { Resend } from 'resend';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Logo from '../../assets/img/logo192.png';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import Rapport2 from '../../pages/rapports/Rapport2';

function generatePDF(data) {
  const doc = new jsPDF();
  let yPos = 20;

  // Add header with logo
  doc.addImage(Logo, 'JPEG', 10, 10, 10, 10);
  doc.text(" Caisse HZH-Mondistri Le PORT", 70, 20);

  // Add table
  const table = [];
  data.forEach(item => {
    const row = [];
    row.push(item.id, item.qts, item.sommes, item.transactions, item.sorties); // Example fields
    table.push(row);
  });

  doc.autoTable({
    startY: yPos + 10,
    head: [['Monnaies','Quantité', 'Total Caisse']], // Example headers
    body: table,
  });

  // Add page number
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text('Page ' + String(i), 10, doc.internal.pageSize.height - 10);
  }

  return doc;
}

function Test() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const fondcaisseSnapshot = await getDocs(collection(db, "caisses/3/FondCaisse"));
      const fondcaisseData = fondcaisseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const transactionsSnapshot = await getDocs(collection(db, "caisses/3/transactions"));
      const transactionsData = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const sortiesSnapshot = await getDocs(collection(db, "caisses/3/sorties"));
      const sortiesData = sortiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Combine all data
      const allData = [...fondcaisseData, ...transactionsData, ...sortiesData];
      setData(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleGeneratePDFAndSendEmail = async () => {
    try {
      setLoading(true); // Set loading to true before async operations

      // Fetch data from Firestore
      await fetchData();

      // Generate PDF
      const pdfBlob = generatePDF(data);
    // Save PDF
    pdfBlob.save('Caisse Moundistri-Ouest.pdf');

      // Convert Blob to Data URL
      const pdfDataUrl = pdfBlob.output('datauristring');

      //******************************/ Send email Via emailJS********************************//
    //   const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    //   const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    //   const userID = process.env.REACT_APP_EMAILJS_USER_ID;

    //   await emailjs.send(
    //     serviceID,
    //     templateID,
    //     {
    //       to_email: 'test@test.re',
    //       from_name: 'test@test.re',
    //       message_html: 'Veuillez trouver ci-joint le PDF généré.',
    //       attachment: pdfDataUrl,
    //     },
    //     userID
    //   ); process.env.REACT_APP_RESEND_ID

    const resend = new Resend(process.env.REACT_APP_RESEND_ID);
    
    // await resend.emails.send({
    //     from: 'onboarding@resend.dev',
    //     to: ['test@test.re'],
    //     subject: 'hello world',
    //     text: 'it works!',
    //     attachments: [
    //       {
    //         filename: 'Caisse-Ouest.pdf',
    //         content: pdfDataUrl,
    //       },
    //     ],
    //     headers: {
    //       'X-Entity-Ref-ID': '123456789',
    //     },
    //     tags: [
    //       {
    //         name: 'category',
    //         value: 'confirm_email',
    //       },
    //     ],
    //   });

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'test@test.re',
        subject: 'Bonjour tout le monde !',
        attachment: pdfDataUrl,
        html: '<p>Félicitations pour l\'envoi de votre <strong>premier e-mail envoyer depuis l\'API RESEND</strong>!</p>'
      });

      alert("Votre message a bien été envoyé !");
    } catch (error) {
      alert('Échec de l\'envoi de l\'e-mail. Veuillez réessayer plus tard.');
      console.error('Erreur d\'envoi d\'e-mail :', error);
    } finally {
      setLoading(false); // Définir le chargement sur false après les opérations
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar/>
        <div className="top">
          <div className="left">
          <h1 className="title">Générer le PDF et envoyer par e-mail</h1>
            <div className="item">
            <Link onClick={handleGeneratePDFAndSendEmail} disabled={loading}>
            <div className="editButton">{loading ? 'Envoi en cours...' : 'Générer PDF et Envoyer Email'}</div>
          </Link>
              {/* <Button onClick={handleGeneratePDFAndSendEmail} disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Générer PDF et Envoyer Email'}
              </Button> */}
            </div>
            <Rapport2 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
