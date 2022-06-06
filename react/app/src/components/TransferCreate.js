import React from 'react'
import { useState } from "react";
import './App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

const CreateTransfer = () => {
	
  const navigate = useNavigate();
  const [data, setData] = useState({
	  nameSender: '',
	  nameRreciever: '',
	  funds: ''
  })
  
  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const token = localStorage.getItem('token');
  const CreateTransfer = async e => {
	e.preventDefault();
    let req = {
      nameSender: data.nameSender,
	  nameRreciever: data.nameRreciever,
	  quanityFunds: data.funds
    };

    fetch('http://localhost:5000/transfer', {
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
	<form data-testid= "TransferCreateForm" className="form" onSubmit={CreateTransfer}>
      <header className="App-header">
	  <div>
        <label>
          <b>  Sender  </b>
        </label>
        <input placeholder="Enter sender" name = "nameSender" type="text" className="field" value={data.nameSender} onChange={handleChange} required />

        <label>
          <b>  Reciever  </b>
        </label>
        <input placeholder="Enter reciever" name = "nameRreciever" type="text" className="field" value={data.nameRreciever} onChange={handleChange} required />
		
		<label>
          <b> Funds </b> 
        </label>
        <input placeholder="Enter funds" name = "funds" type="text" className="field" value={data.funds} onChange={handleChange} required />
      
	  </div>
	  <div>
		<button className="button">Make transfer</button>
	  </div>	
      </header>

	  </form>
    </div>
  );
}

export default CreateTransfer;