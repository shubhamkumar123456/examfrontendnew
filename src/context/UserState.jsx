import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios';
import url from '../config/URL';

const UserState = (props) => {
  
    const details = JSON.parse(localStorage.getItem('user_details'))
    const [user, setuser] = useState({
        login:details?details.login:false,
        user:details?details.user:"",
        token:details?details.token:"",
    });

    const getUserDetails = async() => {
       let res = await axios.get(url+'/user/getUserDetails',{
        headers:{
          
        'Authorization':user.token
        }
       });
       let data = res.data;
       console.log(data)
       if(res.data.success===true){
           setuser({...user,user:data.user});
       }
    }

    useEffect(()=>{
     if(user.token){
         getUserDetails();
     }
    },[user.token])
  return (
 
    <UserContext.Provider value={{user,setuser,getUserDetails}}>
        {props.children}
    </UserContext.Provider>
  )
}
export default UserState
