import React, { useContext, useEffect, useState } from 'react'

import { toast } from 'react-toastify';
import url from "../config/URL";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import UserContext from "../context/UserContext";
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log(CLIENT_ID)

const GoogleLoginComponent = () => {
    let ctx = useContext(UserContext);
    const [loginData, setLoginData] = useState(
      localStorage.getItem("loginData")
        ? JSON.parse(localStorage.getItem("loginData"))
        : null
    );
    const [user, setUser] = useState({});
    useEffect(() => {
      if (loginData) {
        const decodedUser = jwtDecode(loginData.sessionToken);
        setUser(decodedUser);
      }
    }, [loginData]);

    const handelLogin = async (googleData) => {
        try {
          const res = await fetch(url+"/user/google-login", {
            method: "POST",
            body: JSON.stringify({ token: googleData }),
            headers: { "Content-Type": "application/json" },
          });
      
          if (!res.ok) {
            throw new Error("Failed to log in with Google");
          }
          const data = await res.json();
            localStorage.setItem(
                    "user_details",
                    JSON.stringify({ login: true, user: data.user, token:data.token })
                  );
                  ctx.setuser({ login: true, user: data.user,token:data.token });
                  toast.success(data.msg, { position: "top-center" });
          // setLoginData(data);
          // localStorage.setItem("loginData", JSON.stringify(data));
        } catch (error) {
          console.error("Error logging in:", error);
        }
      };
    
      const handelLogout = () => {
        setLoginData(null);
        localStorage.removeItem("loginData");
        googleLogout();
      };
  return (
    <div className=" w-full">
    {loginData ? (
      <>
        <div className="w-full">
          <img src={user.picture} alt={user.userName} />
          <h3>{user.email}</h3>
          <h6>{user.userName}</h6>
        </div>
        <div>
   
          <button onClick={handelLogout}>Logout</button>
        </div>
      </>
    ) : (
      <div  className="w-full">
      <button className="w-full  flex justify-center" type="button">
<GoogleOAuthProvider clientId={CLIENT_ID}>
  <div className="w-full flex justify-center my-2">
    <GoogleLogin
    size="large"
    // width={300}
    className="w-full block"
      onSuccess={(credentialResponse) => {
        handelLogin(credentialResponse.credential);
      }}
      onError={() => {}}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Continue with Google
        </button>
      )}
    />
  </div>
</GoogleOAuthProvider>
</button>

      </div>
    )}
  </div>
  )
}

export default GoogleLoginComponent
