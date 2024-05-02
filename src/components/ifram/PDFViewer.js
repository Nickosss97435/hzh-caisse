import React from 'react';

const PDFViewer = () => {
  return (
    <iframe
      title="PDF Viewer"
      src="../../rapports/MyPdfDocument.js"
      width="100%"
      height="500px"
      frameBorder="0"
      allowFullScreen
    />
  );
};

export default PDFViewer;
