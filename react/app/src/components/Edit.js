import React from 'react'
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function Edit() {
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
  
   const EditButtonHandle = async e => {
	  e.preventDefault();
	  let datas = {
		  firstName: data.firstName
	  };
	  const token = localStorage.getItem('token');
      fetch('http://localhost:5000/user/1', {
          method: "PUT",
          body: JSON.stringify(datas),
          headers: {'Accept': 'application/json',
		  'Authorization': 'Bearer '+ token
		  }
      }).then(response => {
	    if(response.status == 200){
		   navigate('/Main');
		}
		else{
		  console.log("Something went wrong");
		}
	  });
  }
  
  return (
    <div className="App">
	<form data-testid= "EditForm" className="form" onSubmit={EditButtonHandle}>
      <header className="App-header">
	  <div>
	  
        <label>
          <b>  First Name  </b>
        </label>
        <input placeholder="Enter first name" name = "firstName" type="text" className="field" value={data.firstName} onChange={handleChange}  />
        <label>
          <b> Last Name </b> 
        </label>
        <input placeholder="Enter last name" name = "lastName" type="text" className="field" value={data.lastName} onChange={handleChange} />
        <label>
          <b>  Phone  </b>
        </label>
        <input placeholder="Enter phone" name = "phone" type="text" className="field" value={data.phone} onChange={handleChange}  />
        <label>
          <b> Email </b> 
        </label>
        <input placeholder="Enter email" name = "email" type="text" className="field" value={data.email} onChange={handleChange}  />
		 <label>
          <b>  Password  </b>
        </label>
        <input placeholder="Enter password" name = "password" type="password" className="field" value={data.password} onChange={handleChange}  />
        <label>
          <b> Confrim password </b> 
        </label>
		<input placeholder="Confrim password" name = "confrim_password" type="password" className="field" value={data.confrim_password} onChange={handleChange} />
		</div>
		<button className="button">Edit user</button>
      </header>
	  </form>
    </div>
  )
};
export default Edit;