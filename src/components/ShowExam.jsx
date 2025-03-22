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
        <Switch className='ring-1 ring-[#CFB53B] absolute z-50 right-2 top-4 ' checked={ele.enable} onClick={()=>onChange(ele)} />
      <Card onClick={()=>handleCardClick(ele)} title={`Batch:  ${ele.batch}`} bordered={false}>
        {ele.examName}
      </Card>
    </div>
    })}
   
  </div>

      
  <Modal title="Exam paper" open={showModel} onOk={handleSubmit} onCancel={handleCancel}>
  {selectedExam.question.length > 0 ? (
    selectedExam.question.map((ele, i) => (
      <ol key={ele._id} type="A" className="mb-6">
        <h5 className="text-lg  font-semibold mb-3" style={{whiteSpace: "pre-line" }}>
          Question {i + 1}: {ele.question}
        </h5>
        {ele.options.map((opt, idx) => (
          <li
            key={idx}
            className="w-full border border-gray-300 rounded-lg p-3 mb-2 hover:bg-gray-100"
          >
            {opt.text}
          </li>
        ))}
      </ol>
    ))
  ) : (
    <h3 className="text-gray-600 text-center text-lg font-medium">
      No questions have been added to the exam.
    </h3>
  )}
</Modal>

    </div>
  )
}

export default ShowExam
