import React, { useState } from 'react';
import {instance} from "../../ngrock.js";
import Cookies from "universal-cookie";
import Signup from "../Signup/Signup.js";
import "./Login.css";

function Login() {

  const [userReq ,setUserReq] = useState(null);
  const [showSignUp ,setShowSignUp] = useState(false); 
  const cookies = new Cookies();

  const clickHandler = async ()=>{
      await instance.put("/api/user/login",userReq).then((res)=>{
        cookieSaver(res.data);
      })
  };

  const cookieSaver = (data) =>{
    cookies.set("username",data.username);
    cookies.set("firstName",data.username);
    cookies.set("lastName",data.username);
    window.location.replace("/search");
  };


  return (
   
    <div>
    {!showSignUp?
      (
        <div className='loginDiv'>
      
        <h3 className='formHeader'>LOGIN:</h3>
  
        <input
        placeholder='Username...'
        className='loginInput'
        onChange={((event)=>{
          setUserReq({...userReq,username:event.target.value});
        })}
        /> 
  
        <input
        placeholder='Password...'
        className='loginInput'
        type="password"
        onChange={((event)=>{
          setUserReq({...userReq,password:event.target.value});
        })}
        /> 
  
        <button onClick={clickHandler} className="loginBtn">LOGIN</button>
        <label className="loginLabel" onClick={()=>{setShowSignUp(true)}}>Dont have account yet!</label>
  
      </div>
      )
      :
      (
        <Signup/>
      )}
    
    </div>
  )
}

export default Login;