// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './AdminLogin';
function Home() {
  const location = useLocation();
  const navigate = useNavigate();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);




  return (

<Login></Login>

  );
}

export default Home;
