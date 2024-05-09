import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { db } from "../../firebase";
import { generatePdf } from './TablePDF';
import emailjs from 'emailjs-com';

const GeneratePdfAndSendEmail = () => {
  const [loading, setLoading] = useState(false);

  const handleGeneratePDFAndSendEmail = async () => {
    setLoading(true);
    
    // Récupérer les données depuis Firestore
    const snapshot = await db.collection('caisse','3', 'FondCaisse').get();
    const data = snapshot.docs.map(doc => doc.data());

    // Générer le PDF
    const pdfBlob = await generatePdf(data);

    // Envoyer le PDF par e-mail via EmailJS
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userID = process.env.REACT_APP_EMAILJS_USER_ID;

    const templateParams = {
      to_email: 'test@test.re',
      from_name: 'test@test.re',
      message_html: 'Veuillez trouver ci-joint le PDF généré.',
    };

    emailjs.send(serviceID, templateID, templateParams, userID, { attachment: pdfBlob })
      .then((response) => {
        console.log('E-mail envoyé avec succès !', response);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Button onClick={handleGeneratePDFAndSendEmail} disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Générer PDF et Envoyer Email'}
      </Button>
    </div>
  );
};

export default GeneratePdfAndSendEmail;
