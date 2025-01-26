import React, { useRef, useState } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar';
import url from '../config/URL';
const CreateTestForm = (props) => {

  const [clickedCheck, setclickedCheck] = useState(false);
  console.log(clickedCheck)
  let questionRef = useRef()
  let option1Ref = useRef()
  let option2Ref = useRef()
  let option3Ref = useRef()
  let option4Ref = useRef()
  let categoryRef = useRef()
  let checkboxRef = useRef()
  let batchRef = useRef()
  let textRef = useRef()
  let examNoRef = useRef()
  let correctAnswerRef = useRef()

  const submitForm = async (e) => {
    e.preventDefault();
    let option;
    let option1 = option1Ref.current.value
    let option2 = option2Ref.current.value
    let option3 = option3Ref.current.value
    let option4 = option4Ref.current.value
    if(option1 && option2 && option3 && option4){
      option=[option1, option2, option3, option4]
    }
    let obj = {
      question: questionRef.current.value,
      options:option?option:"" ,
      correctOption:option? Number(correctAnswerRef.current.value):"",
      batch:batchRef.current.value,
      examno:examNoRef.current.value,
      category:categoryRef.current.value
    }
    console.log(obj)
    let res = await axios.post(url+'/test/create', obj)
    console.log(res)
    if(res.ok){
      alert("question added successfully")
  }
  }
  const handleCheckCHange = (e)=>{
    console.log("running")
    let value = e.target.checked
    console.log(value)
    if(value===true){
      setclickedCheck(true)
    }else{
      setclickedCheck(false)
    }
  }
  return (
    <div className='container'>
       
        
          <div className='testFormComponent p-3'>
          <button type="button" onClick={()=>props.setclickedCreate(false)} className="btn-close" aria-label="Close"></button>
      <form action="" className='col-md-6 m-auto bg-dark text-white p-3'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Question</label>
          <textarea ref={questionRef} type="text" className="form-control" id="question" aria-describedby="emailHelp" />

        </div>
        <select ref={batchRef} className="form-select" aria-label="Default select example">
  <option  selected >Batch time</option>
  <option value="10-12">10-12</option>
  <option value="12-2">12-2</option>
  <option value="3-5">3-5</option>
  <option value="5-7">5-7</option>
</select>

<select name='otherSearch'  ref={categoryRef} className="form-select mt-2" aria-label="Default select example">
  <option  selected >Category</option>
  <option value="All">All</option>
  <option value="HTML">HTML</option>
  <option value="CSS">CSS</option>
  <option value="JS">JavaScript</option>
  <option value="JS">ReactJs</option>
  <option value="JS">NodeJs</option>
  <option value="JS">ExpressJs</option>
  <option value="JS">MongoDB</option>
</select>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Exam No</label>
          <input ref={examNoRef} type="number" placeholder='exam no' className="form-control" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Options</label>
          <input ref={option1Ref} type="text" placeholder='A' className="form-control" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">

          <input ref={option2Ref} type="text" placeholder='B' className="form-control" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">

          <input ref={option3Ref} type="text" placeholder='C' className="form-control" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">

          <input ref={option4Ref} type="text" placeholder='D' className="form-control" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Text Answer</label>
          <input onChange={handleCheckCHange} ref={checkboxRef} className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />

        </div>
     {clickedCheck &&   <div className="form-floating">
          <textarea ref={textRef} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
          <label for="floatingTextarea">type your answer</label>
        </div>}

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Correct Answer</label>
          <input ref={correctAnswerRef} type="number" placeholder='enter option number' className="form-control" aria-describedby="emailHelp" />

        </div>
        <button className='btn btn-success' onClick={submitForm}>submit</button>
      </form>

          </div>
      
    </div>
   
  )
}

export default CreateTestForm
