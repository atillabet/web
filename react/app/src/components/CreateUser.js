import React from 'react'
import { useState } from "react";
import './App.css';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

const  CreateUser = () => {
  const  navigate  = useNavigate();
  const [data, setData] = useState({
	  phone: '',
	  password: '',
	  confrim_password: '',
	  lastName: '',
	  firstName: '',
	  email: ''
  })
  
  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }
   
    const CreateButtonChange = async e => {
	  e.preventDefault();
      if(data.password == data.confrim_password){
        let datas = {
          password: data.password,
	      phone: data.phone,
	      lastName: data.lastName,
	      firstName: data.firstName,
	      email: data.email
        };
      fetch('http://localhost:5000/user', {
          method: "POST",
          body: JSON.stringify(datas),
          headers: {'Accept': 'application/json'}
      }).then(response => {
	    if(response.status == 200){
		   navigate('/login');
		}
		else{
		  console.log("Something went wrong");
		}
	  });
	}
    else{
	  console.log("Password not same");
	}
  }

  return (
    <div className="App">
	<form data-testid="CreateUserForm" className="form" onSubmit={CreateButtonChange}>
      <header className="App-header">
	  <div>
	  
        <label>
          <b>  First Name  </b>
        </label>
        <input placeholder="Enter first name" name = "firstName" type="text" className="field" value={data.firstName} onChange={handleChange} required />
        <label>
          <b> Last Name </b> 
        </label>
        <input placeholder="Enter last name" name = "lastName" type="text" className="field" value={data.lastName} onChange={handleChange} required />
        <label>
          <b>  Phone  </b>
        </label>
        <input placeholder="Enter phone" name = "phone" type="text" className="field" value={data.phone} onChange={handleChange} required />
        <label>
          <b> Email </b> 
        </label>
        <input placeholder="Enter email" name = "email" type="text" className="field" value={data.email} onChange={handleChange} required />
		 <label>
          <b>  Password  </b>
        </label>
        <input placeholder="Enter password" name = "password" type="password" className="field" value={data.password} onChange={handleChange} required />
        <label>
          <b> Confrim password </b> 
        </label>
        <input placeholder="Confrim password" name = "confrim_password" type="password" className="field" value={data.confrim_password} onChange={handleChange} required />
		</div>
		<button className="button">Create User</button>
      </header>
	  </form>
    </div>
  );
}
export default CreateUser;