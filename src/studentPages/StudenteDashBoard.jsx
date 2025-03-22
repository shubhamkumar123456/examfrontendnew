import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { IoCheckmarkCircle } from 'react-icons/io5';
import url from '../config/URL';
import UserContext from '../context/UserContext';
import ThemeProvider from '../components/ThemeProvider';


const StudenteDashBoard = () => {

  const [details, setDetails] = useState([]);
  console.log(details)
  const [selectedExam, setSelectedExam] = useState([]);
  console.log(selectedExam)

  const ctx = useContext(UserContext);
  let user = ctx.user;
  const userId = user?.user?._id;

  const StudentAllExam = async () => {
    const res = await axios.get(
      url+`/attempted/getSingleUser/${userId}`
    );
    console.log(res.data);
    setDetails(res.data);
  };

  useEffect(() => {
    if(userId){
      StudentAllExam();

    }
    // console.log(userId);
  }, [userId]);

  const handleClick = (ans) => {
    setSelectedExam(ans.attemptedQuestion);
  };

  let count = 0;
  let totalCount = 0;
  selectedExam?.forEach((ele) => {
    if (ele.isCorrect) count++;
    if (ele.isCorrect === false || ele.isCorrect === true) totalCount++;
  });

  return (
    <ThemeProvider>
    <div className="p-4 relative z-10">
       {/* <AnimatedBackground /> */}
      <h3 className="text-center text-lg font-bold mb-6">Student Dashboard</h3>
      <h1 className='font-bold md:text-2xl text-lg my-2'>Attempted Exams</h1>
      <div className='grid gap-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>

      {details.map((ele) => {
        return <div  key={ele._id} className='cursor-pointer p-3 rounded-md bg-[#BF9B30] hover:bg-[#CFB53B]' onClick={()=>handleClick(ele)}>
        <h1><span className='font-semibold'>Batch:</span>{ele.exam.batch}</h1>
        <h1><span className='font-semibold'>ExamName:</span>{ele.exam.examName}</h1>
        <h1><span className='font-semibold'>Date:</span>{new Date(ele.attemptedAt).toLocaleDateString()}</h1>
      </div>
      })}

        
       
      </div>
      {details.length===0&&<div className='text-center w-full capitalize'>you have not attempted any exams</div>}
      {/* <Row className="gap-4 flex justify-center">
       
      </Row> */}

      {selectedExam?.length > 0 && (
        <div className="mt-6">
          <Row className="flex justify-end mb-4">
            <Col className="border text-[#BF9B30] border-gray-300 p-4 w-48">
            <h1 className='text-2xl font-bold text-center my-2'>Score</h1>
            <h1 className='text-lg text-center'>{((100 / selectedExam?.length) * count).toFixed(2)}/100</h1>
              {/* <p
              className='text-[#BF9B30]'
                title="Score of this exam"
                value={((100 / selectedExam?.length) * count).toFixed(2)}
                suffix={`/100`}
                bgColor='bg-[#BF9B30]'
                color='text-white'
              /> */}
            </Col>
          </Row>

          {selectedExam.map((ele, i) => (
            <ol key={ele._id} className="list-decimal pl-6 mb-6">
              <h5 style={{whiteSpace: "pre-line" }} className="font-semibold text-[#BF9B30]">
                Question {i + 1}: {ele.question}
              </h5>
              {ele.options.map((opt, i) => (
                <li
                key={i}
                className={`my-2 p-2 rounded font-semibold 
                  ${
                    ele.correctOption._id === ele.selectedOption?._id && ele.correctOption._id === opt._id
                      ? 'bg-green-500 text-white' // Correct option selected
                      : ele.selectedOption?._id === opt._id
                      ? 'bg-red-500 text-white' // Wrong option selected
                      : 'bg-gray-200 text-black' // Default unselected option
                  }`}
                >
                  {opt.text}{' '}
                  {ele.correctOption._id === opt._id && (
                    <IoCheckmarkCircle color="blue" size={20} className="inline " />
                  )}
                </li>
              ))}
              {!ele.options.length && (
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled
                  value={ele.textAnswer}
                ></textarea>
              )}
              {ele.options.length >= 0 && (
                <h6 className="flex items-center text-[#BF9B30] gap-2 border border-blue-400 bg-blue-100 rounded p-2 w-max mt-2">
                  Your Answer:
                  <span className="bg-blue-500 text-white rounded px-2 py-1">
                    {JSON.stringify(ele.isCorrect) || 'Not Attempted'}
                  </span>
                </h6>
              )}
            </ol>
          ))}
        </div>
      )}
    </div>
    </ThemeProvider>
  );
};

export default StudenteDashBoard;
