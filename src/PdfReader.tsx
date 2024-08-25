import React from 'react';
import './PdfReader.css';
// import pdfFile from './assets/cv.pdf';

const PdfReader: React.FC = () => {
  return (
    <div className="pdf-reader">
      <iframe src='/assets/cv.pdf' width="100%" height="100%" title="cv"></iframe>
    </div>
  );
};

export default PdfReader;
