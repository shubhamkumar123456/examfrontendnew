import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';
import url from '../config/URL';
import ThemeProvider from '../components/ThemeProvider';


const Landingpage = () => {
  const ctx = useContext(UserContext);
  const userId = ctx.user.user._id;

  const [allExams, setAllExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  const getAllExams = async () => {
    const res = await axios.get(url+'/exam/getallexam');
    const data = res.data;
    setAllExams(data.exam);
  };

  useEffect(() => {
    getAllExams();
  }, []);

  const navigate = useNavigate();

  const handleContinue = async () => {
    if (selectedExam) {
      const res = await axios.post(
        url+`/attempted/create/${userId}/${selectedExam._id}`
      );

      if (res.data.success) {
        navigate('/studentExam', { state: selectedExam });
      } else {
        toast.warning(res.data.msg, { position: 'top-center' });
      }
    } else {
      toast.info('Please select an exam', { position: 'top-center' });
    }
  };

  return (
<ThemeProvider>
<div className="p-4 relative z-10">
      <h4 className="text-center mt-3 text-lg font-semibold">Select an Exam</h4>
      <div className="flex flex-col items-center gap-2 mt-4">
        {allExams.map((ele) => {
          return (
            ele.enable === true && (
              <label
                key={ele._id}
                className={`p-3 w-72 rounded-lg cursor-pointer ${
                  selectedExam === ele ? 'bg-black text-white' : 'bg-gray-900 text-white'
                }`}
                onClick={() => setSelectedExam(ele)}
              >
                <input
                  type="radio"
                  name="exam"
                  className="mx-3"
                  checked={selectedExam === ele}
                  onChange={() => setSelectedExam(ele)}
                />
                {ele.examName}
              </label>
            )
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-2 mt-6">
        <button
          onClick={handleContinue}
          className="w-32 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Continue
        </button>
        <h6 className="text-center text-gray-500">OR</h6>
        <Link
          to="/dashboard/student"
          className="w-32 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-center"
        >
          Dashboard
        </Link>
      </div>
    </div>
</ThemeProvider>
  );
};

export default Landingpage;
