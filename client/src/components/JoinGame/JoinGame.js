import React, { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import "./JoinGame.css";

function JoinGame() {

    const cookies = new Cookies();
    const [room ,setRoom] = useState(null);
    const cookiesUsername = cookies.get("username");

    const clickHandler = ()=>{
      if(room){
        cookies.set("room" ,room);
        window.location.replace("/game");
      }else{
        alert("please enter room number!");
      }
    };

    useEffect(()=>{
      if(!cookiesUsername){window.location.replace("/");}
    },[cookiesUsername]);

  return (
    <div className='App'>

    {!cookies.get("username")?(null)
    :
    (

      <div className='joinGameDiv'>
          <label className='joinGameLabel1'>{`Hey ${cookiesUsername.toUpperCase()} 👋`}</label>
          <label className='joinGameLabel2'>LET`S` START THE GAME</label>
          <label className='joinGameLabel2'>ENTER ROOM ID:</label>

          
          <div className='userDiv'>
            <input
            placeholder='Room id...'
            className='roomInput'
            onChange={((event)=>{setRoom(event.target.value)})}

            />

            <button className='joinGameBtn' onClick={clickHandler}>ENTER</button>
          </div>
          
      </div>

    )}

    </div>

    
  )
}

export default JoinGame;