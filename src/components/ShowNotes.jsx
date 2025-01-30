import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'antd';

const ShowNotes = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [notes, setNotes] = useState([]);

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

  useEffect(() => {
    getNotes();
  }, []);

  const handleCancel = ()=>{
    setSelectedPdf(false)
  }

  return (
    <div className="relative z-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      <ul>
        {notes.map((pdf) => (
          <li key={pdf.file}>
            <button 
              onClick={() => setSelectedPdf(pdf.file)}
            >
              {pdf.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Display PDF in an iframe when selected */}
      {selectedPdf && <Modal width={800}   open={selectedPdf?true:false} 
      onOk={handleCancel} 
      onCancel={handleCancel}>
        
        <div style={{ border: "1px solid black", marginTop: "10px", width: "100%", height: "600px" }}>
          <iframe 
            src={selectedPdf} 
            width="100%" 
            height="100%" 
            style={{ border: "none" }}
          />
        </div>
      
        
        </Modal>}
    </div>
  );
};

export default ShowNotes;
