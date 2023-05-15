import React from 'react';
import Cookies from 'universal-cookie';
import loserLogo from "../../assets/loserLogo.png";
import "./Loser.css";

function Loser() {

    const cookies = new Cookies();

    const clickHandler = ()=>{
        window.location.replace("search");
    };

  return (
    <div className='loserDiv'>
        <img src={loserLogo} className="loserLogo" alt="loser"/>
        <h1 className='loserH1'>{`${cookies.get("username").toUpperCase()} you are a loser!`}</h1>
        <button className='loserBtn' onClick={clickHandler}>NEW GAME</button>
    </div>
  )
}

export default Loser;