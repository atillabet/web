import React from 'react'
import { useState } from "react";
import './App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

const Purse = () => {
	
  const navigate = useNavigate();
  const [data, setData] = useState({
	  funds: '',
	  name: ''
  })
  
  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const token = localStorage.getItem('token');
  const CreatePurse = async e => {
	e.preventDefault();
    let req = {
      funds: data.funds,
	  name: data.name,
	  userId: localStorage.getItem('UserId')
    };

    fetch('http://localhost:5000/purse', {
        method: "POST",
        body: JSON.stringify(req),
        headers: {'Accept': 'application/json',
		          'Authorization': 'Bearer '+ token}
    }).then(response => {
		
      if (response.status == 200) {
		  response.json().then(datass =>{
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
	<form data-testid="PurseForm" className="form" onSubmit={CreatePurse}>
      <header className="App-header">
	  <div>
        <label>
          <b>  Name  </b>
        </label>
        <input placeholder="Enter name" name = "name" type="text" className="field" value={data.name} onChange={handleChange} required />

        <label>
          <b> Funds </b> 
        </label>
        <input placeholder="Enter funds" name = "funds" type="text" className="field" value={data.funds} onChange={handleChange} required />
      </div>
	  <div>
		<button className = "button">Create purse</button>
	  </div>	
      </header>

	  </form>
    </div>
  );
}

export default Purse;