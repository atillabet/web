import React from 'react'
import { useState } from "react";
import './App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

const Main = () => {

  return (
    <div className="App">
	<form data-testid="MainForm" className="form">
      <header className="App-header">
	    <p className="EditAccout"><Link className="EditAccout" to={"/User/Edit"}>Edit account</Link></p>
		<p className="CreatePurse"><Link className="CreatePurse" to={"/User/Purse"}>Create purse</Link></p>
		<p className="DeletePurse"><Link className="DeletePurse" to={"/User/Purse/Del"}>Delete purse</Link></p>
		<p className="Logout"><Link className="Logout" to={"/logout"}>Logout</Link></p>
		<p className="CreateTransfer"><Link className="CreateTransfer" to={"/Transfer"}>Create transfer</Link></p>
		<p className="GetPurse"><Link className="GetPurse" to={"/Purse/Get"}>Get purse</Link></p>
      </header>

	  </form>
    </div>
  );
}

export default Main;