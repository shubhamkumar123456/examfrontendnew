import Modal from 'antd/es/modal/Modal';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import url from '../config/URL';

const ShowQestion = (props) => {
    const [questions, setquestions] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);
    const [isModalAddQuestionOpen, setIsModalAddQuestionOpen] = useState(false);
    const [question, setquestion] = useState("");
    const [examId, setexamId] = useState("");
    const getData = async()=>{
        let res = await axios.get(url+'/question/getall');
        let data = res.data;
        // console.log(data.questions);
        setquestions(data.questions);
        setFilteredItem(data.questions)
    }
    useEffect(()=>{
        getData();
    },[])

    const handleSubmit=()=>{
        props.setIsQuestionModalOpen(false);
    }
    const handleCancel = ()=>{
        props.setIsQuestionModalOpen(false);
    }

    let filteredQuestion;
    const handleCategory=(e)=>{
        let category = e.target.value
        console.log(category)
        if(category==="All"){
            setFilteredItem([...questions])
        }else{
            filteredQuestion=questions.filter((ele)=>ele.category.toLowerCase()===category.toLowerCase())
            if(filteredQuestion){
                setFilteredItem(filteredQuestion)
            }
            else{
                setFilteredItem([...questions])
            }
        }
       
    }

    const handleQuestionClick = (obj)=>{
        console.log(obj)
        setquestion(obj)
        setIsModalAddQuestionOpen(true)
    }

   
    const submitAddQuestion=async()=>{
        // http://localhost:8080/exam/addquestion/66b27cbf00e6f955be0e1df5
        let obj={
         question:question._id
        }
        let res = await axios.put(url+`/exam/addquestion/${examId}`, obj)
        let data = res.data;
        console.log(data)
        props.fetchExam()
        // console.log(obj)
        // console.log("examId-->",examId)
        setquestion("")
        setIsModalAddQuestionOpen(false)
    }
    const cancelAddQuestion=()=>{
        setIsModalAddQuestionOpen(false)
    }

  
  return (
    <div>
    {/* Show Question Modal */}
    <Modal 
    styles={{
        content: { backgroundColor: '#CFB53B' }, // turns the Modal red
      }}
    
      open={props.isQuestionModalOpen} 
      onOk={handleSubmit} 
      onCancel={handleCancel}
    >
           <h1 className='font-semibold my-2 text-lg'>All Questions</h1>
      <select 
        onChange={handleCategory} 
        className="form-select w-full my-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">Select question category</option>
        <option value="All">All Questions</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JS">JS</option>
        <option value="REACT JS">REACT JS</option>
        <option value="NODE JS">NODE JS</option>
        <option value="EXPRESS JS">EXPRESS JS</option>
        <option value="MONGO DB">MONGO DB</option>
      </select>
  
      {filteredItem.map((ele, i) => (
        <ol key={ele._id} type="A" className="my-4">
          <h5 style={{whiteSpace: "pre-line" }} className="font-medium text-lg">
            Question {i + 1}: {ele.question}
          </h5>
          <span 
            onClick={() => handleQuestionClick(ele)} 
            className="cursor-pointer text-blue-500 hover:text-blue-700 border border-blue-500 hover:border-blue-700 px-3 py-1 rounded-md transition"
          >
            Add question to exam
          </span>
          {ele.options.map((opt, i) => (
            <li 
              key={i} 
              className="form-control my-1 px-3 py-2 border border-gray-300 rounded-md"
            >
              {opt.text}
            </li>
          ))}
          {ele.correctOption && (
            <li className="list-group-item my-1 bg-blue-100 px-3 py-2 rounded-md text-blue-700">
              Correct Answer = {ele.correctOption.text}
            </li>
          )}
        </ol>
      ))}
    </Modal>
    
  
    {/* Add Question to Exam Modal */}
    <Modal 
      zIndex={2000} 
      title="Add Question to Exam" 
      open={isModalAddQuestionOpen} 
      onOk={submitAddQuestion} 
      onCancel={cancelAddQuestion}
    >
      <select 
        onChange={(e) => setexamId(e.target.value)} 
        className="form-select w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select an exam</option>
        {props.Exams.map((ele) => (
          <option key={ele._id} value={ele._id}>
            Batch: {ele.batch} || ExamName: {ele.examName}
          </option>
        ))}
      </select>
  
      <label htmlFor="selected-question" className="block mb-2 font-medium text-gray-700">
        Question Selected
      </label>
      <p id="selected-question" className="form-control px-3 py-2 border border-gray-300 rounded-md">
        {question.question}
      </p>
    </Modal>
  </div>
  
  )
}

export default ShowQestion
