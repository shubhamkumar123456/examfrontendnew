
import React, { useState,useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import url from "../config/URL";
import GoogleLoginComponent from "../components/GoogleLoginComponent";



const Signup = () => {
 
  const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const obj = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      console.log(obj)
      if(!obj.email || !obj.name || !obj.password){
        return toast.error('please fill all the fields' ,{position:"top-center"})
      }
   try {
    const res = await axios.post(
      url+'/user/create',
      obj
    );
    const data = res.data;
    console.log(res)
    if (data.success) {
      navigate('/login');
      toast.success(data.msg, { position: 'top-center' });
    } else {
      toast.error(data.msg, { position: 'top-center' });
    }
   } catch (error) {
      console.log(error)
   }
    };
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="min-h-[91.4vh] bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a2a2a] overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Dots */}
      <div className="absolute h-full inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#BF9B30] rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, Math.sin(i) * 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${(i * 5)}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(191,155,48,0.15), transparent 25%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a] to-transparent"></div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
     
    
    
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#BF9B30] to-[#FFF5E1] bg-clip-text text-transparent">
              Welcome to ExamApp
            </h1>
            <p className="text-[#FFF5E1] text-lg lg:text-xl font-light leading-relaxed">
              Prepare for success with our platform. Track progress, take tests, and achieve your goals seamlessly.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group m-auto lg:m-0 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#BF9B30] to-[#CFB53B] rounded-full text-black font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <span>Start Learning</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          {/* Right Section - Signup Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-lg mx-auto bg-[#1a1a1a] rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#BF9B30] mb-4 text-center">Create an Account</h2>
            <form>
              <div className="mb-4">
                <label className="block text-[#FFF5E1] text-sm font-medium mb-2">Full Name</label>
                <motion.input
                ref={nameRef}
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  className="w-full px-4 py-2 bg-[#2a2a2a] text-[#FFF5E1] rounded-lg focus:ring-2 focus:ring-[#BF9B30]"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#FFF5E1] text-sm font-medium mb-2">Email</label>
                <motion.input
                ref={emailRef}
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  className="w-full px-4 py-2 bg-[#2a2a2a] text-[#FFF5E1] rounded-lg focus:ring-2 focus:ring-[#BF9B30]"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-[#FFF5E1] text-sm font-medium mb-2">Password</label>
                <motion.input
                ref={passwordRef}
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  className="w-full px-4 py-2 bg-[#2a2a2a] text-[#FFF5E1] rounded-lg focus:ring-2 focus:ring-[#BF9B30]"
                  placeholder="Create a password"
                />
              </div>
              <motion.button
              onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full px-4 py-2 bg-[#BF9B30] text-black rounded-lg font-bold shadow-md hover:bg-[#CFB53B] focus:ring-2 focus:ring-offset-2 focus:ring-[#BF9B30] transition-all"
              >
                Sign Up
              </motion.button>
            <GoogleLoginComponent/>
            </form>
            <p className="mt-4 text-[#FFF5E1] text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-[#BF9B30] hover:underline">
                Log in here
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    
    </div>
  );
};

export default Signup;

