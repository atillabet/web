import React from 'react'
import { useState } from "react";
import './App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

const PurseDel = () => {
	
  const navigate = useNavigate();
  const [data, setData] = useState({
	  name: ''
  })
  
  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const token = localStorage.getItem('token');
  const DeletePurse = async e => {
	e.preventDefault();
    let req = {
	  name: data.name,
	  userId: localStorage.getItem('UserId')
    };

    fetch('http://localhost:5000/purse', {
        method: "DELETE",
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
	<form data-testid= "PurseDelForm" className="form" onSubmit={DeletePurse}>
      <header className="App-header">
	  <div>
        <label>
          <b>  Purse to del </b>
        </label>
        <input placeholder="Enter name" name = "name" type="text" className="field" value={data.name} onChange={handleChange} required />
      </div>
	  <div>
		<button className="button">Delete purse</button>
	  </div>	
      </header>

	  </form>
    </div>
  );
}

export default PurseDel;