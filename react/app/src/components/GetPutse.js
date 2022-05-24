import React from 'react'
import { useState } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";

function GetPurse() {
  const  navigate  = useNavigate();
  const [data, setData] = useState({
	  name: '',
	  funds: ''
  })
  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }
  
   const EditButtonHandle = async e => {
	  e.preventDefault();
	  const token = localStorage.getItem('token');
      fetch('http://localhost:5000/purse/' + data.name, {
          method: "GET",
          headers: {'Accept': 'application/json',
		  'Authorization': 'Bearer '+ token
		  }
      }).then(response => {
	    if(response.status == 200){
		   response.json().then(datass =>{
			   alert(datass['funds']);
			   });
		}
		else{
		  alert("Something went wrong");
		}
	  });
  }
	  
    return (
      <div className="App">
	  <form className="form" onSubmit={EditButtonHandle}>
      <header className="App-header">
	     <label>
          <b>  Name  </b>
        </label>
        <input placeholder="Enter name" name = "name" type="text" className="field" value={data.name} onChange={handleChange} required />
        <div>
	   	  <button type = "submit">Find</button>
	    </div>
		<p className="return"><Link className="return" to={"/Main"}>return</Link></p>
	  </header>
	  </form>
    </div>
  )
};
export default GetPurse;