import { Col, Modal, Row, Statistic } from 'antd';
import React, { useRef, useState } from 'react'
import { TiTick } from "react-icons/ti";

import axios from 'axios';
import generatePDF from 'react-to-pdf';
import url from '../config/URL';
const AlluserDetails = (props) => {

    const targetRef = useRef();
    console.log(props.allUser)

    // console.log(ctx)
    const [showModal, setshowModal] = useState(false);
    const [result, setresult] = useState([]);
    console.log(result)

    const handleExamChange = async (e) => {
        let value = e.target.value;
        let userId = value.split('&')[0]
        let examId = value.split('&')[1]
        // console.log(userId)
        // console.log(examId)
        let res = await axios.get(url + `/attempted/getSingleAttempted/${userId}/${examId}`);
        let data = res.data;
        // console.log(data.result)
        setresult(data.result)

        // let res = await
        setshowModal(true)
    }
    const handleSubmit = () => {
        setshowModal(false)
    }

    const handleCancel = () => {
        setshowModal(false)
    }

    let count = 0;
    let correctCount = 0
    let totalCount = 0
    result?.attemptedQuestion?.forEach((ele) => {
        if (ele.isCorrect) {
            count++;
        }
        if (ele.isCorrect === true) {
            correctCount++;
        }
        if (ele.isCorrect === false || ele.isCorrect === true) {
            totalCount++
        }
    })

    let filteredUsers = [...props.allUser];
    const [x, setX] = useState("");
    filteredUsers = props.allUser.filter((ele) => ele.name.toLowerCase().includes(x.toLowerCase()) || ele.email.toLowerCase().includes(x.toLowerCase()))
    const handleSearcChanger = (e) => {
        setX(e.target.value)
    }

    // pagination code starts here
    const [currentPage, setcurrentPage] = useState(1);
    let itemPerPage = 8;
    let lastIndex = itemPerPage * currentPage;
    let firstIndex = lastIndex - itemPerPage;
    let slicedArr = filteredUsers.slice(firstIndex, lastIndex);
    let noOfButton = Math.ceil(filteredUsers.length / itemPerPage);
    let btnArr = [...Array(noOfButton + 1).keys()].slice(1)

    const handlePrev = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < noOfButton) {
            setcurrentPage(currentPage + 1)
        }
    }
    return (
        <div className='relative  z-1 flex justify-center flex-col w-full ' >
              <h1 className="text-lg md:text-xl lg:text-2xl text-center my-2 font-bold bg-gradient-to-r from-[#BF9B30] to-[#FFF5E1] bg-clip-text text-transparent">
            All Users Details Page
            </h1>
      
        {/* Search Form */}
        <form className="w-full bg-[#BF9B30] md:w-1/2 mx-auto mb-4">
          <input
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-800 text-black"
            type="text"
            placeholder="Search user by username..."
            onChange={handleSearcChanger}
          />
        </form>
      
        {/* Table */}
        <div className="relative overflow-x-auto">
          <table className="table-auto w-full text-center border border-gray-700">
            <thead className="bg-transparent border-2 border-[#CFB53B] text-white">
              <tr className='bg-gradient-to-r from-[#BF9B30] to-[#FFF5E1] bg-clip-text text-transparent'>
                <th className="px-4 py-2 border border-gray-700 ">Sno</th>
                <th className="px-4 py-2 border border-gray-700 ">Name</th>
                <th className="px-4 py-2 border border-gray-700 ">Email</th>
                <th className="px-4 py-2 border border-gray-700 ">Exams</th>
              </tr>
            </thead>
            <tbody className='bg-transparent border-2 border-[#CFB53B] text-white'>
              {slicedArr.map((ele, index) => (
                <>
                  {ele.name !== "admin" && (
                    <tr key={ele._id} className="bg-gradient-to-r from-[#BF9B30] to-[#FFF5E1] bg-clip-text text-transparent">
                      <td className="px-4 py-2 border border-gray-700 ">{index + 1}</td>
                      <td className="px-4 py-2 border border-gray-700 ">{ele.name}</td>
                      <td className="px-4 py-2 border border-gray-700 ">{ele.email}</td>
                      <td className="px-4 py-2 border border-gray-700 ">
                        <select
                          onChange={handleExamChange}
                          className="sm:w-full w-max sm:text-lg text-sm  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-800 text-black"
                        >
                          <option className="text-sm">Select an exam</option>
                          {ele.Exam.map((el) => (
                            <option key={el._id} value={`${ele._id}&${el._id}`} className="text-sm text-black">
                              {el.examName}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
      
          {/* Pagination */}
          <nav aria-label="Page navigation" className="mt-4">
            <ul className="flex flex-wrap justify-center">
              <li
                onClick={()=>setcurrentPage(1)}
                className="cursor-pointer px-3 py-1 sm:text-lg text-sm  my-1 mx-1 border border-gray-300 rounded-md bg-gray-200 text-black hover:bg-gray-300"
              >
                First
              </li>
              <li
                onClick={handlePrev}
                className="cursor-pointer px-3 my-1 py-1 sm:text-lg text-sm  mx-1 border border-gray-300 rounded-md bg-gray-200 text-black hover:bg-gray-300"
              >
                Previous
              </li>
              {btnArr.map((ele) => (
                ele >= currentPage && ele < currentPage + 5 &&
                <li
                  key={ele}
                  onClick={() => setcurrentPage(ele)}
                  className={`cursor-pointer px-3 my-1 sm:text-lg text-sm  py-1 mx-1 border border-gray-300 rounded-md ${
                    currentPage === ele
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                >
                  {ele}
                </li>
              ))}
            {btnArr.length>5 &&  <li className='sm:text-lg text-sm my-1'>...</li>}
              <li
                onClick={handleNext}
                className="cursor-pointer my-1 px-3 py-1 mx-1 border border-gray-300 rounded-md bg-gray-200 text-black hover:bg-gray-300"
              >
                Next
              </li>
              <li
                onClick={()=>setcurrentPage(noOfButton)}
                className="cursor-pointer px-3 py-1 my-1 mx-1 border border-gray-300 rounded-md bg-gray-200 text-black hover:bg-gray-300"
              >
                Last
              </li>
            </ul>
          </nav>
        </div>
      
        {/* Modal */}
        <Modal
         styles={{
          content: { backgroundColor: '#CFB53B' }, // turns the Modal red
        }}
      

  open={showModal}
  onOk={handleSubmit}
  onCancel={handleCancel}
>
<div className='flex gap-3'>
<h1 className='font-semibold my-2 text-lg'>Result</h1>
  <button
    onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
    className="mb-4 px-4 py-2 bg-green-800  text-white rounded-md hover:bg-green-600"
  >
    Download PDF
  </button>
</div>

  <div ref={targetRef}>
    <div className="flex justify-center text-center">
      <div className="border border-gray-300 bg-[#CFB53B] p-4 w-40 rounded-md">
        <h1 className="text-center text-white text-xl font-semibold my-2">
          Score
        </h1>
        <h1 className="text-lg text-white text-center">
          {((100 / result?.attemptedQuestion?.length) * count).toFixed(2)}/100
        </h1>
      </div>
    </div>

    <h3 className="text-lg font-bold mt-4 text-black">User Attempted Questions</h3>
    <span className="text-black">{new Date(result.attemptedAt).toLocaleDateString()}</span>

    {result?.attemptedQuestion?.map((ele, i) => (
      <ol key={ele._id} type="A" className="mt-4">
        <h5 className="text-sm md:text-lg text-black font-medium">
          Question {i + 1}: {ele.question}
        </h5>
        {ele.options.map((opt, idx) => (
          <li
            key={idx}
            className={`my-2 p-2 rounded-md ${
              opt._id === ele.selectedOption?._id && ele.isCorrect===true
                ? "bg-green-500 text-white"
                : opt._id === ele.selectedOption?._id && ele.isCorrect===false
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {opt.text}
            {ele.correctOption._id === opt._id && (
              <span className={"ml-2 text-white font-bold"}>✔</span>
            )}
          </li>
        ))}
        {!ele.options.length && (
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-black bg-[#FFF9E3]"
            disabled
            value={ele.textAnswer}
          ></textarea>
        )}
        {ele.options.length >= 0 && (
          <h6
            className={`p-3 mt-2 rounded-md ${
              ele.isCorrect
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            Your Answer: {ele.isCorrect ? "Correct" :ele.isCorrect===false?"Incorrect":"Not Attempted"}
          </h6>
        )}
      </ol>
    ))}
  </div>
</Modal>

      </div>
      
      
    )
}

export default AlluserDetails
