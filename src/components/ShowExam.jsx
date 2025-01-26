import Modal from 'antd/es/modal/Modal';
import React, {  useState } from 'react'
import { Card } from 'antd';
import { Switch } from 'antd';
import axios from 'axios';
import url from '../config/URL';
const ShowExam = (props) => {
  console.log(props.Exams)
  const [selectedExam, setSelectedExam] = useState({question:[]});
  const [showModel, setShowModel] = useState(false);
  
    const handleCancel = () => {
    
        setShowModel(false);
      };

    const handleSubmit = ()=>{
      setShowModel(false);
    }

 

    const handleCardClick=(ans)=>{
      setShowModel(true);
        console.log(ans)
        setSelectedExam(ans)
    }

    const [checked, setchecked] = useState(false);
    const onChange = async(ans) => {
      console.log(ans)
      let enable = ans.enable
      // console.log(`switch to ${checked}`);
      let res =await axios.put(url+`/exam/toggleExam/${ans._id}`,{enable:!enable})
      let data = res.data;
      console.log(data)
      props.fetchExam()

    };
  return (
    <div>
       <h1 className="text-lg md:text-xl lg:text-2xl text-center my-2 font-bold bg-gradient-to-r from-[#BF9B30] to-[#FFF5E1] bg-clip-text text-transparent">
             Show Exam Page
            </h1>
      
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sn:grid-cols-2 grid-cols-1 gap-2' gutter={16}>
    {props.Exams.map((ele)=>{
      return  <div className=' relative' key={ele._id} span={8}>
      <Card onClick={()=>handleCardClick(ele)} title={`Batch:  ${ele.batch}`} bordered={false}>
        <Switch className='ring-1 ring-[#CFB53B] absolute right-2 top-4 ' checked={ele.enable} onClick={()=>onChange(ele)} />
        {ele.examName}
      </Card>
    </div>
    })}
   
  </div>

      
      <Modal title="Exam paper" open={showModel} onOk={handleSubmit} onCancel={handleCancel}>
       
      {  selectedExam.question.map((ele,i)=>{
        return <ol key={ele._id} type='A'>
            <h5>Question {i+1} :{ele.question}</h5>
            {ele.options.map((opt,i)=>{
                return <li key={i} className='form-control my-1'>{opt.text}</li>
            })}
        </ol>
      })}
      {!selectedExam.question.length && <h3>No question is added in the exam</h3>}
         

</Modal>
    </div>
  )
}

export default ShowExam
