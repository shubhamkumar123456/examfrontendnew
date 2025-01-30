import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
const PdfViewer = ({ url, onClose }) => {
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      };
      
      const modalStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '80%',
        height: '80%',
        overflow: 'auto',
      };
    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <button onClick={onClose} style={{ float: 'right' }}>Close</button>
          <Document file={url}>
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    );
  };


export default PdfViewer;