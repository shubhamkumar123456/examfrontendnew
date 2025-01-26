import axios from 'axios';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import url from '../config/URL';
import ThemeProvider from '../components/ThemeProvider';
const ForgetPassword = () => {

        let emailRef = useRef();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        let obj = {
            email:emailRef.current.value
        }
        console.log(obj)
        try {
            let res = await axios.post(url+'/user/forgetPassword',obj)
        let data = res.data;
        console.log(res)
        if(data.success){
            toast.success(data.msg,{position:'top-center'})
        }
        else{
            toast.error(data.msg,{position:"top-center"})

        }
        } catch (error) {
                console.log(error)
        }
    }
  return (
      <ThemeProvider>
          <div className='relative z-10 flex h-[90vh] items-center justify-center'>
<section className="flex flex-col max-w-4xl mx-auto overflow-hidden md:flex-row md:h-48">
  <div className="md:flex md:items-center md:justify-center md:w-1/2 ">
    <div className="px-6 py-6 md:px-8 md:py-0">
      <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Forget Password? </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Enter your email for forget password request</p>
    </div>
  </div>
  <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
    <form>
      <div className="flex flex-col  overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
        <input ref={emailRef} className="px-6 py-2  placeholder-gray-500 bg-white text-black" type="text" name="email" placeholder="Enter your email" aria-label="Enter your email" />
        <button onClick={handleSubmit} className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">Submit</button>
      </div>
    </form>
  </div>
</section>


    </div>
</ThemeProvider>

  )
}

export default ForgetPassword
