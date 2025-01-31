import React, { useContext, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import url from "../config/URL";
import GoogleLoginComponent from "../components/GoogleLoginComponent";
import ThemeProvider from "../components/ThemeProvider";

const Login = () => {
  const ctx = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
     if(!obj.email || !obj.name || !obj.password){
            return toast.error('please fill all the fields' ,{position:"top-center"})
          }

    try {
      const res = await axios.post(
        url+"/user/login",
        obj
      );
      const data = res.data;

      if (data.success) {
        localStorage.setItem(
          "user_details",
          JSON.stringify({ login: true, user: data.user, token:data.token })
        );
        ctx.setuser({ login: true, user: data.user,token:data.token });
        toast.success(data.msg, { position: "top-center" });

        if (data.user.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/landingpage");
        }
      } else {
        toast.error(data.msg, { position: "top-center" });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <section className="h-[91.4vh]  flex items-stretch  overflow-hidden text-white bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a2a2a]">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="lg:flex w-1/2 hidden bg-cover bg-no-repeat relative items-center"
        style={{
          backgroundImage:
            "url(https://images7.alphacoders.com/133/1337527.png)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0" />
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold text-left bg-gradient-to-r from-[#BF9B30] to-[#FFF5E1] bg-clip-text text-transparent">
            Welcome to ExamMaster
          </h1>
          <p className="text-3xl my-4 text-[#FFF5E1]">
            The ultimate platform to manage and take objective exams.
          </p>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
        style={{ backgroundColor: "#161616" }}
      >
       
        <div className="w-full relative py-6 z-20">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="my-6 w-max mx-auto"
          >
             <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#BF9B30] to-[#FFF5E1] bg-clip-text text-transparent">
              Welcome to ExamApp
            </h1>
            {/* <img
              src="/logo.png"
              className="w-36 h-36 bg-black rounded-full"
              alt="ExamMaster Logo"
            /> */}
          </motion.h1>
          <p className="text-xl text-[#FFF5E1] font-semibold">
            Log in to access your dashboard
          </p>
          <form
            onSubmit={handleSubmit}
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
          >
             
            <div className="pb-2 pt-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="block w-full p-4 text-lg rounded-sm bg-[#2a2a2a] text-[#FFF5E1] focus:ring-2 focus:ring-[#BF9B30]"
              />
            </div>
            <div className="pb-2 pt-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="block w-full p-4 text-lg rounded-sm bg-[#2a2a2a] text-[#FFF5E1] focus:ring-2 focus:ring-[#BF9B30]"
              />
            </div>
            <div className="text-right text-[#FFF5E1] hover:underline">
              <Link to="/forgetPassowrd">Forgot your password?</Link>
            </div>
            <div className="px-4 pb-2 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="uppercase block w-full p-4 text-lg rounded-full bg-[#BF9B30] text-black hover:bg-[#CFB53B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF9B30]"
              >
                Sign In
              </motion.button>
            </div>
            <GoogleLoginComponent/>
            <div className="mt-6 text-[#FFF5E1]">
              Don't have an account?
              <Link to="/signup" className="text-[#BF9B30] hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>
    
      </motion.div>
    </section>
  );
};

export default Login;
