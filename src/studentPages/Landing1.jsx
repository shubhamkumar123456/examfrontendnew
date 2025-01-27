import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';
import url from '../config/URL';

const Landing1 = () => {
  const ctx = useContext(UserContext);
  let userId = ctx.user.user._id;

  const [allExams, setAllExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  console.log(selectedExam);

  const getAllExams = async () => {
    let res = await axios.get(url + '/exam/getallexam');
    let data = res.data;
    setAllExams(data.exam);
  };

  useEffect(() => {
    getAllExams();
  }, []);

  let navigate = useNavigate();

  const handleContinue = async () => {
    if (selectedExam) {
      console.log("yes");

      let res = await axios.post(url + `/attempted/create/${userId}/${selectedExam._id}`);
      console.log(res);

      if (res.data.success) {
        navigate('/studentExam', { state: selectedExam });
      } else {
        toast.warning(res.data.msg, { position: 'top-center' });
      }
    } else {
      toast.info("Please select an exam", { position: 'top-center' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h4 className="text-center mt-6 text-xl font-semibold">Select an Exam</h4>
      <div className="flex flex-col gap-4 w-full max-w-md mt-6">
        {allExams.map((ele) => (
          <label
            key={ele._id}
            className={`flex items-center gap-2 p-4 bg-gray-800 text-white rounded-lg cursor-pointer ${
              selectedExam._id === ele._id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedExam(ele)}
          >
            <input
              name="radio"
              type="radio"
              className="hidden"
              checked={selectedExam._id === ele._id}
              onChange={() => setSelectedExam(ele)}
            />
            {ele.examName}
          </label>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-xs">
        <button
          onClick={handleContinue}
          className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Continue
        </button>
        <h6 className="text-center text-gray-600">OR</h6>
        <a
          href="/dashboard/student"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Dashboard
        </a>
      </div>
    </div>
  );
};

export default Landing1;
