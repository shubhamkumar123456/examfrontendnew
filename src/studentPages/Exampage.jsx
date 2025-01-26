import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { usePDF } from 'react-to-pdf';
import { useLocation, useNavigate } from 'react-router-dom'
import { createTimeModel, useTimeModel } from "react-compound-timer";
import url from '../config/URL';
// import { TimeModelValueView } from "../TimeModelValueView/TimeModelValueView";

const timer = createTimeModel({
  // start from 10 seconds
  initialTime: 90*60000,
  // count down
 
  direction: "backward",
});

const Exampage = () => {
  let location = useLocation()
  let navigate = useNavigate();
  const { value } = useTimeModel(timer);

 
  let user = JSON.parse(localStorage.getItem('user_details'))
  let userId = user.user._id
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  // console.log(toPDF)
  // console.log(location.state);
  let questions = location.state.question
  let examId = location.state._id
const [YourQuestion, setYourQuestion] = useState(questions);
// console.log(YourQuestion)


const handleOption = (question,selectOption)=>{
    // console.log(question)
    // console.log(selectOption)
    let findObj = YourQuestion.find((ele)=>ele._id===question._id)
    let findIndex = YourQuestion.findIndex((ele)=>ele._id===question._id)
    // console.log(findObj, findIndex)
    let isCorrect=false
    if(selectOption._id===question.correctOption._id){
      isCorrect=true
    }
    let updatedObj = {
      ...findObj,
      selectedOption:selectOption,
      isCorrect
    }
    let copyArr=[...YourQuestion]
    copyArr[findIndex] = updatedObj
    setYourQuestion(copyArr)
}
 const handleTextChange = (e,question)=>{
  // console.log(e.target.value)
  // console.log(obj)
  let findObj = YourQuestion.find((ele)=>ele._id===question._id)
    let findIndex = YourQuestion.findIndex((ele)=>ele._id===question._id)
    // console.log(findObj, findIndex)
    
    let updatedObj = {
      ...findObj,
      textAnswer:e.target.value,
    }
    let copyArr=[...YourQuestion]
    copyArr[findIndex] = updatedObj
    setYourQuestion(copyArr)

 }

  if(value.h==0 && value.m==0 && value.s==0 && value.ms==0){
    console.log("yes")
    handleSubmit()

  }


 async function handleSubmit() {
    let res = await axios.put(url+`/attempted/create/${userId}/${examId}`,{attempted:YourQuestion});
    let data = res.data;
    console.log(data)
    navigate('/examsubmitted')
 }

  

 
  return (
    <div ref={targetRef}>
      <h2 className='text-center border border-info mt-3 bg-info p-2'>Exam paper</h2>
      <div className='border border-dark text-center my-2'>{value.h} Hour {value.m} Minute {value.s} seconds</div>
      {  questions.map((ele,i)=>{
        return <ol key={ele._id} type='A'>
            <h5>Question {i+1} : {ele.question}</h5>
            {ele.options.map((opt,i)=>{
                return <label htmlFor={opt._id} key={i} onClick={()=>handleOption(ele,opt)} className='form-control my-1'><input name={ele._id} id={opt._id} type="radio" />{opt.text}</label>
            })}
            {!ele.options.length && <textarea onChange={(e)=>handleTextChange(e,ele)} placeholder='write your answer here' className='form-control'></textarea>}
        </ol>
      })}
      <button className='btn btn-info' onClick={handleSubmit}>Submit Exam</button>
      {/* <button onClick={() => toPDF()}>Download PDF</button> */}
    </div>
  )
}

export default Exampage
