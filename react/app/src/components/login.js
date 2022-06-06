import React from 'react'
import { useState } from "react";
import './App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
	
  const navigate = useNavigate();
  const [data, setData] = useState({
	  phone: '',
	  password: ''
  })
  
  const handleChange = e => {
  }
  const token = localStorage.getItem('token');
  
  const LoginButtonChange = async e => {
	e.preventDefault();
    let req = {
      password: data.password,
	  phone: data.phone
    };

    fetch('http://localhost:5000/user/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Accept': 'application/json'}
    }).then(response => {
		
      if (response.status == 200) {
		  response.json().then(datass =>{
			localStorage.setItem('token', datass['access_token']);
			localStorage.setItem('UserId', datass['UserId']);
		    navigate('/Main');
		  });
      } 
	  else {
          console.log("Something went wrong");
      }
    });
  }

  return (
    <div className="App">
	<form data-testid="LoginForm" className="form" onSubmit={LoginButtonChange}>
      <header className="App-header">
	  <div>
        <label>
          <b>  Phone  </b>
        </label>
        <input placeholder="Enter phone" name = "phone" type="text" className="field" value={data.phone} onChange={handleChange} required />

        <label>
          <b> Password </b> 
        </label>
        <input placeholder="Enter password" name = "password" type="password" className="field" value={data.password} onChange={handleChange} required />
      </div>
	  <div>
		<button className = "button">Login</button>
	  </div>	
		<p className="SingUp"><Link className="SingUp" to={"/CreateUser"}>Create User</Link></p>
      </header>

	  </form>
    </div>
  );
}

export default Login;