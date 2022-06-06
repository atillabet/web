import React from 'react'
import { useState } from "react";
import './App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  window.localStorage.removeItem('UserId');
  const token = localStorage.getItem('token');
  window.localStorage.removeItem('token');
  fetch('http://localhost:5000/user/logout', {
          method: "GET",
          headers: {'Accept': 'application/json',
		  'Authorization': 'Bearer '+ token
		  }
    }); 
  
  navigate('/login');
  return (
      <div className="App">
	<form data-testid="LoginForm" className="form">
      <header className="App-header">      
	  </header>

	  </form>
    </div>)
}

export default Logout;