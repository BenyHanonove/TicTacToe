import React, { useEffect } from 'react';
import Login from '../components/Login/Login';
import Cookies from 'universal-cookie';
import Header from '../components/Header/Header.js';

function IndexPage() {
  
  const cookies = new Cookies();

  useEffect(()=>{
    if(cookies.get("username")){window.location.replace("/search")};
  });

  return (
    <div className='App'>
      <Header/>
      <Login/>
    </div>
  )
}

export default IndexPage;