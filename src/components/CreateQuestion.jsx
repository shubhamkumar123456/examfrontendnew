import Modal from 'antd/es/modal/Modal';

import axios from 'axios';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import url from '../config/URL';
const CreateQuestion = (props) => {





    const handleCancel = () => {
        props.setIsModalOpen(false);
    };

    let questionRef = useRef();
    let option1Ref = useRef();
    let option2Ref = useRef();
    let option3Ref = useRef();
    let option4Ref = useRef();
    let answerRef = useRef();
    let categoryRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let obj = {
            question: questionRef.current.value,
            options: [option1Ref.current.value, option2Ref.current.value, option3Ref.current.value, option4Ref.current.value],
            correctOption: answerRef.current.value,
            category: categoryRef.current.value
        }
console.log(obj)
        let res = await axios.post(url+'/question/create', obj);
        let data = res.data;
        console.log(data);
        if (data.success) {
            toast.success(data.message, { position: 'top-center' });
            questionRef.current.value = ""
            answerRef.current.value = ""
            option1Ref.current.value = ""
            option2Ref.current.value = ""
            option3Ref.current.value = ""
            option4Ref.current.value = ""
            categoryRef.current.value = ""
        } else {
            toast.error(data.message, { position: 'top-center' });
        }
        props.setIsModalOpen(false);
    }
    return (
        <div>
        <Modal
        styles={{
            content: { backgroundColor: '#CFB53B' }, // turns the Modal red
          }}
          open={props.isModalOpen}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
              <h1 className='font-semibold my-2 text-lg'>Create Question Component</h1>
          {/* Question Label and Textarea */}
          <label htmlFor="question" className="block text-gray-700 font-medium mb-1">
            Question
          </label>
          <textarea
            ref={questionRef}
            id="question"
            className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter question here..."
          ></textarea>
      
          {/* Options */}
          <label htmlFor="options" className="block text-gray-700 font-medium mb-1">
            Options
          </label>
          <input
            type="text"
            ref={option1Ref}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter option 1"
          />
          <input
            type="text"
            ref={option2Ref}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter option 2"
          />
          <input
            type="text"
            ref={option3Ref}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter option 3"
          />
          <input
            type="text"
            ref={option4Ref}
            className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter option 4"
          />
      
          {/* Answer */}
          <label htmlFor="answer" className="block text-gray-700 font-medium mb-1">
            Answer
          </label>
          <input
            type="number"
            ref={answerRef}
            id="answer"
            className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter correct option number"
          />
      
          {/* Category Selection */}
          <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
            Category
          </label>
          <select
            ref={categoryRef}
            id="category"
            className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select question category</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JS">JS</option>
            <option value="REACT JS">REACT JS</option>
            <option value="NODE JS">NODE JS</option>
            <option value="EXPRESS JS">EXPRESS JS</option>
            <option value="MONGO DB">MONGO DB</option>
          </select>
        </Modal>
      </div>
      
    )
}

export default CreateQuestion
