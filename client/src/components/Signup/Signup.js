import React, { useState } from 'react';
import Login from "../Login/Login.js";
import "./Signup.css";
import {instance} from "../../ngrok.js";

function Signup() {

  const [user ,setUser] = useState({});
  const [showLogin ,setShowLogin] = useState(false);


  const clickHandler = async ()=>{

    await instance.post("/api/user/signup",user).then((res)=>{
      console.log(res.data);
      alert("new user has been created.");
      window.location.reload();
    })

  };


  return (

    <div>
    {!showLogin?
      (
      <div className='signupDiv'>
      
        <h3 className='formHeader'>SIGN UP:</h3>

        <input
        placeholder='First name...'
        className='signupInput'
        onChange={((event)=>{
          setUser({...user ,firstName:event.target.value});
        })}
        /> 

        <input
        placeholder='Last name...'
        className='signupInput'
        onChange={((event)=>{
          setUser({...user ,lastName:event.target.value});
        })}
        /> 

        <input
        placeholder='Username...'
        className='signupInput'
        onChange={((event)=>{
          setUser({...user ,username:event.target.value});
        })}
        /> 

        <input
        placeholder='Password...'
        type="password"
        className='signupInput'
        onChange={((event)=>{
          setUser({...user ,password:event.target.value});
        })}
        /> 

        <button onClick={clickHandler} className="signupBtn">SIGN UP</button>

        <label className='signupLabel' onClick={()=>{setShowLogin(true)}}>Already has account</label>
      </div>
      )
      :
      (
        <Login/>
      )}
    </div>
  )
}

export default Signup;