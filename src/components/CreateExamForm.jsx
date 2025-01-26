
import { Modal } from 'antd';
import axios from 'axios';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import url from '../config/URL';

const CreateExamForm = (props) => {

    let batchRef = useRef();
    let examRef = useRef();
    const handleCancel = () => {
      
        props.setIsModalOpen1(false);
      };

      const handleSubmit = async()=>{
        let obj ={
            examName:examRef.current.value,
            batch:batchRef.current.value
        }
        console.log(obj)
        let res = await axios.post(url+'/exam/createexam',obj)
        let data = res.data;
        console.log(data);
        if(data.success){
            console.log("yes");
            examRef.current.value = ""
            batchRef.current.value = ""
            toast.success(data.message,{position:'top-center'});
        }else{
        
            toast.error(data.message,{position:'top-center'});
        }
        props.setIsModalOpen1(false);
      }
  return (
    <div className=' '>
  <Modal
 
styles={{
  content: { backgroundColor: '#CFB53B' }, // turns the Modal red
}}
   
    open={props.isModalOpen1}
    onOk={handleSubmit}
    onCancel={handleCancel}
   
  
  >
    <h1 className='font-semibold my-2 text-lg'> Create Exam Paper</h1>
    {/* Dropdown for Batch Time */}
    <select
      ref={batchRef}
      className="w-full   border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      id=""
    >
      <option value="">Enter your Batch time</option>
      <option value="10-12">10-12</option>
      <option value="12-2">12-2</option>
      <option value="2-4">2-4</option>
      <option value="3-5">3-5</option>
      <option value="4-6">4-6</option>
      <option value="6-7">6-7</option>
    </select>

    {/* Input for Exam Name */}
    <div className="relative  bg-[#CFB53B] my-4">
      <input
        ref={examRef}
        type="text"
        id="exam-name"
        placeholder=" Enter your exam name "
        className="peer w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* <label
        htmlFor="exam-name"
        className="absolute  left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-blue-500 peer-focus:text-sm"
      >
        Enter your exam name
      </label> */}
    </div>
  </Modal>
</div>

  )
}

export default CreateExamForm
