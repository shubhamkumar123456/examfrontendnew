import React, { useContext, useEffect, useState } from 'react'


import CreateExamForm from '../components/CreateExamForm'
import CreateQuestion from '../components/CreateQuestion'
import { Button } from 'antd/es/radio';
import ShowQestion from '../components/ShowQestion';
import axios from 'axios';
import ShowExam from '../components/ShowExam';
import AlluserDetails from '../components/AlluserDetails';
import url from '../config/URL';
import ThemeProvider from '../components/ThemeProvider';
import { toast } from 'react-toastify';
import { set } from 'rsuite/esm/internals/utils/date';
import ShowNotes from '../components/ShowNotes';
import UserContext from '../context/UserContext';

const AdminPage = () => {
  let ctx = useContext(UserContext)
  const [selectedOption, setselectedOption] = useState("showExamPapers");

  const [showExamPage, setShowExamPage] = useState(false);
  const [Exams, setExams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [showPage, setshowPage] = useState("");


  const showModal = () => {
    setIsModalOpen(true);
  };


  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const showQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const fetchExam = async () => {
    let res = await axios.get(url+'/exam/getallexam');
    let data = res.data
    // console.log(data)
    if (data.success) {
      console.log(data.exam)
      setExams(data.exam)
    }

  }
  useEffect(() => {
    fetchExam()
  }, [])

  const [allUserDetails, setallUserDetails] = useState([]);
  const handleUserClicked=async()=>{
    let res =await axios.get(url+'/user/getall')
    let data =res.data;
    setallUserDetails(data.users)
  }

  const [input, setinput] = useState("");
  const handleUpload = async(e)=>{
    let file = e.target.files[0];
    setinput(file.name)
    // console.log(file)
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mediaAgain");
    try {
      let res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsf7eyovf/upload",
        formData
      );
      // console.log(res)
      let data = res.data;
      if (data.secure_url) {
        let res1 = await axios.post('https://exambackendnew.onrender.com/notes/create',{
          file: data.secure_url,
          name: file.name,
        },{
          headers:{
            'Authorization':ctx.user.token
          }
        })
        console.log(res1)
        // let data1 = res1.data;
        if(res1.status==200 || res1.status==201){
          setinput("")
          console.log("Notes uploaded successfully")
          toast.success("Notes uploaded successfully", { position: "top-center" });
        }
        
      } else {
        toast.error("Error uploading image", { position: "top-center" });
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  }
  
  
  return (
    <ThemeProvider>
    <div className="flex flex-wrap m-0 p-0 pt-3">
    {/* Admin Dashboard Sidebar */}
    <div className="w-full relative z-10 md:w-1/4 px-3">
      <h3 className="text-center border bg-black text-white border-gray-400 p-1">Admin Dashboard</h3>
      <div className="p-2 flex #CFB53B flex-col">
        <button className="mx-1 my-1 bg-[#CFB53B] hover:bg-[#EFB53B] text-white py-2 px-4 rounded" onClick={showModal1}>
          Create Exam
        </button>
        <button className="mx-1 my-1 bg-[#CFB53B] hover:bg-[#EFB53B] text-white py-2 px-4 rounded" onClick={showModal}>
          Create Question
        </button>
        <button className="mx-1 my-1 bg-[#CFB53B] hover:bg-[#EFB53B] text-white py-2 px-4 rounded" onClick={showQuestionModal}>
          Show all questions
        </button>
        <button className="mx-1 my-1 bg-[#CFB53B] hover:bg-[#EFB53B] text-white py-2 px-4 rounded" onClick={() => {setShowExamPage(true); setselectedOption('showExamPapers')}}>
          Show Exam papers
        </button>
        <button className="mx-1 my-1 bg-[#CFB53B] hover:bg-[#EFB53B] text-white py-2 px-4 rounded" onClick={handleUserClicked}>
          Show All Users
        </button>
        <button onClick={()=>setselectedOption("uploadNotes")} className="mx-1 my-1 bg-[#CFB53B] hover:bg-[#EFB53B] text-white py-2 px-4 rounded" >
          Upload Notes

          {/* <input hidden type="file" multiple /> */}
        </button>
        <button onClick={()=>setselectedOption("showNotes")} className="mx-1 my-1 bg-[#CFB53B] hover:bg-[#EFB53B] text-white py-2 px-4 rounded" >
          Show All Notes

          {/* <input hidden type="file" multiple /> */}
        </button>
      </div>
       
    </div>
  
    {/* Main Content */}
    <div className="w-full  md:w-3/4 px-3">
    {selectedOption==="showExamPapers" && <div>
    {showExamPage && <ShowExam Exams={Exams} fetchExam={fetchExam} />}
      <ShowQestion
        fetchExam={fetchExam}
        Exams={Exams}
        isQuestionModalOpen={isQuestionModalOpen}
        setIsQuestionModalOpen={setIsQuestionModalOpen}
      />
      <CreateExamForm setIsModalOpen1={setIsModalOpen1} isModalOpen1={isModalOpen1} />
      <CreateQuestion setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>}
      


      {selectedOption==="uploadNotes" && <div className='z-10 relative w-[300px] '>
    <label htmlFor="file" className='bg-green-400 px-4 py-2 rounded-md hover:bg-green-500' >
        Upload Notes
      <input value={setinput} id='file' onChange={handleUpload} type="file" hidden />
    </label>
   </div>}
      {selectedOption==="showNotes" && <div className='z-10 relative w-[300px] '>
        <ShowNotes/>
   </div>}
    </div>
   <div className='w-full my-2 p-4'>
   {allUserDetails.length > 0 && (
        <AlluserDetails allUser={allUserDetails} setallUserDetails={setallUserDetails} />
      )}
   </div>
 
  </div>
  </ThemeProvider>
  
  )
}

export default AdminPage
