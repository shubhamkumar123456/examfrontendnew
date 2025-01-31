
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPage from './pages/AdminPage';

import Question from './pages/Question';
import Landingpage from './studentPages/Landingpage';
import Exampage from './studentPages/Exampage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudenteDashBoard from './studentPages/StudenteDashBoard';
import Navbar from './components/Navbar';
import { useContext, useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import ExamsubmitedSuccess from './pages/ExamsubmitedSuccess';
import Landing1 from './studentPages/Landing1';
import LoaderComponent from './components/LoaderComponent';
import axios from 'axios';
import Profilepage from './pages/Profilepage';
import url from './config/URL';
import ForgetPassword from './pages/ForgetPassword';
import StudentNotes from './studentPages/StudentNotes';
import ChatWithAi from './pages/ChatWithAi';

function App() {
  const [loading, setloading] = useState(false);
  let ctx = useContext(UserContext);

  let login = ctx.user.login;
  let admin = ctx.user.user.isAdmin || false

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      setloading(true);
      return config;
    }, (error) => {
      return Promise.reject(error)
    })
    axios.interceptors.response.use((config) => {
      setloading(false);
      return config;
    }, (error) => {
      return Promise.reject(error)
    })
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <div className='mb-[60px]'>
          <Navbar />
        </div>

        <LoaderComponent show={loading} />


        <main className='max-h-screen'>
          <Routes>
            {login === true && admin && <Route path='/' element={<AdminPage />} />}
            {login === true && !admin && <Route path='/' element={<StudenteDashBoard />} />}
            {login === false && <Route path='/' element={<Navigate to={'/login'} />} />}
            {login === false && <Route path='/login' element={<Login />} />}
            {login === true && admin === true && <Route path='/login' element={<Navigate to={'/admin'} />} />}
            {login === true && admin === false && <Route path='/login' element={<Navigate to={'/dashboard/student'} />} />}
            {login === true && admin === false && <Route path='/signup' element={<Navigate to="/dashboard/student" />} />}
            {login === true && admin === true && <Route path='/signup' element={<Navigate to="/admin" />} />}
            {login === false && <Route path='/signup' element={<Signup />} />}
            {login === true && <Route path='/admin' element={<AdminPage />} />}
            {login === false && <Route path='/admin' element={<Navigate to={'/login'} />} />}
            {login === true && <Route path='/studentExam' element={<Exampage />} />}
            {login === true && <Route path='/landingpage' element={<Landingpage />} />}
            {login === true && <Route path='/question/:tags' element={<Question />} />}
            {login === true && <Route path='/dashboard/student' element={<StudenteDashBoard />} />}
            {login===true &&<Route path='/profilepage' element={<Profilepage />} />}
          { login===true && <Route path='/examsubmitted' element={<ExamsubmitedSuccess />} />}
          { login===true && <Route path='/notes' element={<StudentNotes />} />}
         { login===false &&  <Route path='/forgetPassowrd' element={<ForgetPassword />} />}
       <Route path='/chatAi' element={login===true?<ChatWithAi />:<Navigate to={'/login'}/>} />
         


          </Routes>
        </main>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
