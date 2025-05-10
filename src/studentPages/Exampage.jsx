import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { usePDF } from 'react-to-pdf';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTimeModel, useTimeModel } from 'react-compound-timer';
import url from '../config/URL';
import ThemeProvider from '../components/ThemeProvider';
import { FcAlarmClock } from 'react-icons/fc';
import UserContext from '../context/UserContext';

// Helper to create a timer
const createExamTimer = (initialTime) =>
  createTimeModel({
    initialTime,
    direction: 'backward',
  });

const Exampage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const questions = state?.question || [];
  const examId = state?._id;

  const initialTime = questions.length * 60000; // 2 minutes per question
  // const initialTime = questions.length * 2 * 60000; // 2 minutes per question
  const [timer] = useState(() => createExamTimer(initialTime)); // Initialize timer once
  const { value } = useTimeModel(timer);

  const [yourQuestions, setYourQuestions] = useState(questions);
  const [submitted, setSubmitted] = useState(false);

  const ctx = useContext(UserContext);
  let userId = ctx.user?.user?._id
  // const userId = user?.user?._id;

  const { toPDF, targetRef } = usePDF({ filename: 'exam-paper.pdf' });

  useEffect(() => {
    timer.start();

    return () => timer.stop(); // Cleanup on component unmount
  }, [timer]);

  useEffect(() => {
    if (
      !submitted &&
      value.h === 0 &&
      value.m === 0 &&
      value.s === 0 &&
      value.ms === 0
    ) {
      handleSubmit();
    }
  }, [value, submitted]);

  const handleOption = (question, selectOption) => {
    const updatedQuestions = yourQuestions.map((q) =>
      q._id === question._id
        ? {
            ...q,
            selectedOption: selectOption,
            isCorrect: selectOption._id === question.correctOption._id,
          }
        : q
    );
    setYourQuestions(updatedQuestions);
  };

  const handleTextChange = (e, question) => {
    const updatedQuestions = yourQuestions.map((q) =>
      q._id === question._id ? { ...q, textAnswer: e.target.value } : q
    );
    setYourQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    console.log(yourQuestions)
    if (submitted) return; // Prevent multiple submissions
    setSubmitted(true);

    try {
      const res = await axios.put(`${url}/attempted/create/${userId}/${examId}`, {
        attempted: yourQuestions,
      });
      console.log(res.data);
      navigate('/examsubmitted');
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };


   useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        alert("You switched tabs! The exam will be submitted automatically.");
        handleSubmit()
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <div ref={targetRef} className="p-6 bg-transparent relative z-1 min-h-screen">
        <h2 className="text-center bg-blue-500 text-white py-3 rounded-lg text-xl mb-6">
          Exam Paper
        </h2>
        <div className="text-center flex sm:flex-row flex-col justify-center gap-3 items-center border border-gray-400 rounded-lg p-3 mb-6 text-lg">
          <FcAlarmClock size={30} />
          <p className="text-sm md:text-xl sm:text-lg">
            {value.h} Hour {value.m} Minute {value.s} Seconds
          </p>
        </div>
        {questions.map((ele, i) => (
          <ol key={ele._id} type="A" className="mb-6">
            <pre style={{whiteSpace: "pre-line" }} className="text-lg font-semibold mb-3">
              Question {i + 1}: {ele.question}
            </pre>
            {ele.options.map((opt, i) => (
              <label
                htmlFor={opt._id}
                key={i}
                onClick={() => handleOption(ele, opt)}
                className={`block border border-gray-300 rounded-lg p-3 mb-2 cursor-pointer hover:bg-black hover:text-white ${
                  ele.selectedOption?._id === opt._id
                    ? 'bg-blue-100 border-blue-500'
                    : ''
                }`}
              >
                <input
                  name={ele._id}
                  id={opt._id}
                  type="radio"
                  className="mr-2"
                />
                {opt.text}
              </label>
            ))}
            {!ele.options.length && (
              <textarea
                onChange={(e) => handleTextChange(e, ele)}
                placeholder="Write your answer here"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            )}
          </ol>
        ))}
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleSubmit}
        >
          Submit Exam
        </button>
      </div>
    </ThemeProvider>
  );
};

export default Exampage;
