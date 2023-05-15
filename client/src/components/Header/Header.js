import React from 'react';
import logo from "../../assets/logo.png";
import Cookies from "universal-cookie";
import "./Header.css";

function Header() {

    const  refresh = ()=>{window.location.replace("/search");};

    const cookies = new Cookies();
   
    const user = cookies.get("username");
   
    const logout =()=>{
        const keys = Object.keys(cookies.getAll()) ;
         keys.forEach(key => {cookies.remove(key);});
        window.location.replace("/");
    };

  return (
    <div className='headerDiv'>

        {!user?(null):(<button onClick={logout} className="logoutBtn">LOG OUT</button>)}
      
        <img src={logo} className="headerLogo" alt="header icon for app" onClick={refresh}/>
    </div>
  )
}

export default Header