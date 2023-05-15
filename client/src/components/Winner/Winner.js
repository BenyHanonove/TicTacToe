import React from 'react';
import Cookies from 'universal-cookie';
import "./Winner.css";
import winnerLogo from "../../assets/winnerLogo.png";

function Winner() {

  const cookies = new Cookies();

    const clickHandler = ()=>{
        window.location.replace("search");
    };

  return (
    <div className='winnerDiv'>
        <img src={winnerLogo} className="winnerLogo" alt="winner"/>
        <h1 className='winnerH1' >{`congratulations ${cookies.get("username").toUpperCase()}`}</h1>
        <button className='winnerBtn' onClick={clickHandler}>NEW GAME</button>
    </div>
  )
}

export default Winner;