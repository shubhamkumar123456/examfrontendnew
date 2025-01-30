import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'antd';

const ShowNotes = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [notes, setNotes] = useState([]);
  const [modalWidth, setModalWidth] = useState(800); // Default width for large screens

  useEffect(() => {
    getNotes();
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getNotes = async () => {
    try {
      let res = await axios.get('https://exambackendnew.onrender.com/notes/getAllNotes');
      if (res.status === 200) {
        setNotes(res.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setModalWidth(800); // Large screens (lg)
    } else if (window.innerWidth >= 768) {
      setModalWidth(600); // Medium screens (md)
    } else {
      setModalWidth(350); // Small screens (sm)
    }
  };

  const handleCancel = () => {
    setSelectedPdf(null);
  };

  return (
    <div className="relative z-10">
      <ul className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 text-center'>
        {notes.map((pdf) => (
          <li key={pdf.file} className='text-center w-[100px]'>
            <img className='m-auto' src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" alt="PDF" width="30" />
            <button onClick={() => setSelectedPdf(pdf.file)}>
              {pdf.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Responsive Modal */}
      {selectedPdf && (
        <Modal
          width={modalWidth} 
          open={!!selectedPdf} 
          onOk={handleCancel} 
          onCancel={handleCancel}
        >
          <div style={{ border: "1px solid black", marginTop: "10px", width: "100%", height: "600px" }}>
            <iframe 
              src={selectedPdf} 
              width="100%" 
              height="100%" 
              style={{ border: "none" }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShowNotes;
