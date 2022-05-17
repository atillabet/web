import React from 'react'
import { useState } from "react";
import './App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

const Main = () => {

  return (
    <div className="App">
	<form className="form">
      <header className="App-header">
	    <p className="EditAccout"><Link className="EditAccout" to={"/User/Edit"}>Edit account</Link></p>
      </header>

	  </form>
    </div>
  );
}

export default Main;