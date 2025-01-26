
import { MdMenuBook } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import {
  googleLogout,
} from "@react-oauth/google";

function Header() {
  const [showDropDown, setshowDropDown] = useState(false);
  const [showDropDown1, setshowDropDown1] = useState(false);
  let navigate = useNavigate()
  const ctx = useContext(UserContext)
  console.log(ctx)
  let user = ctx?.user?.user;
  console.log(user)
  const handleLogout = () => {
    googleLogout()
    localStorage.removeItem('user_details')
    ctx.setuser({ login: false, user: "" })
    navigate('/login')
    setshowDropDown(false)
  }

  return (
    <>
  

   <nav className="bg-[rgb(215,159,56)] z-50 fixed top-0 px-8 left-0 right-0">
  <div className="container relative mx-auto py-2 flex justify-between items-center">
    <HiOutlineBars3CenterLeft onClick={()=>setshowDropDown1(!showDropDown1)} className="md:hidden block" size={28}/>
    <h1 onClick={()=>navigate(user.isAdmin?'/admin':'/dashboard/student')} className="text-2xl font-bold text-gray-50">ExamMaster</h1>
    <div className=" space-x-10 md:flex hidden">
      <div className="flex items-center space-x-2">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </span>
        <span className="text-gray-50">Topics</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </span>
        <span className="text-gray-50">Notes</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </span>
        <span className="text-gray-50">Certificate Training</span>
      </div>
    </div>
   {showDropDown1 &&<div className=" md:hidden bg-white text-black rounded-lg flex flex-col items-left  absolute top-[85%] py-2 w-max space-x-10">
    <ul className="min-w-24">
      <li className="py-2 px-3 hover:bg-gray-100"><Link className="">Topic</Link></li>
      <li className="py-2 px-3 hover:bg-gray-100"><Link className="">Notes</Link></li>
    </ul>
    
    
    </div>}
 
      <div className="relative font-[sans-serif] w-max">
      <button type="button" onClick={()=>setshowDropDown(!showDropDown)}
        className="sm:px-4 py-2 flex items-center rounded-full text-[#333] text-sm sm:border border-gray-300 outline-none sm:hover:bg-gray-100">
        <img src={user?.profilePic?user.profilePic:"https://readymadeui.com/profile_6.webp"} className={`w-7 h-7 ${ctx.user.login?'mr-3':''} rounded-full shrink-0`}></img>
    {ctx.user.login &&  <p className="sm:block hidden">{user?.name}</p>}
        {/* <svg className="" xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-400 inline ml-3" viewBox="0 0 24 24">
          <path fill-rule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
            clip-rule="evenodd" data-original="#000000" />
        </svg> */}
      </button>


      {showDropDown && <ul id="dropdownMenu" className='absolute block right-0 shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto'>
       {ctx.user.login && <li onClick={()=>{navigate('/profilepage'); setshowDropDown(false)}} className='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3" viewBox="0 0 512 512">
            <path
              d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
              data-original="#000000"></path>
          </svg>
          View profile
        </li>}
        {ctx.user.login && !ctx.user.user.isAdmin && (
          <li onClick={()=>{navigate('/landingpage');setshowDropDown(false)}} className='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3" viewBox="0 0 512 512">
            <path
              d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
              data-original="#000000"></path>
          </svg>
          Exam page
        </li>
          
        )}
       {ctx.user.login && !ctx.user.user.isAdmin && <li onClick={()=>{navigate('/dashboard/student'); setshowDropDown(false)}} className='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3" viewBox="0 0 512 512">
            <path
              d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
              data-original="#000000"></path>
          </svg>
          Dashboard
        </li>}

       {ctx.user.login && ctx.user.user.isAdmin && <li onClick={()=>navigate('/admin')} className='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3" viewBox="0 0 512 512">
            <path
              d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
              data-original="#000000"></path>
          </svg>
          Dashboard
        </li>}
      {ctx.user.login &&  <li onClick={handleLogout} className='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3"
            viewBox="0 0 6.35 6.35">
            <path
              d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
              data-original="#000000"></path>
          </svg>
          Logout
        </li>}
      {!ctx.user.login &&  <li onClick={()=>{navigate('/login');setshowDropDown(false)}} className='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3"
            viewBox="0 0 6.35 6.35">
            <path
              d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
              data-original="#000000"></path>
          </svg>
          Login
        </li>}
      {!ctx.user.login &&  <li onClick={()=>{navigate('/signup');setshowDropDown(false)}} className='py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3"
            viewBox="0 0 6.35 6.35">
            <path
              d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
              data-original="#000000"></path>
          </svg>
          Signup
        </li>}
      </ul> }
    </div>
  </div>

</nav>



</>

  );
}
export default Header;
