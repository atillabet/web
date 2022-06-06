import React, {useEffect, useState} from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";

const GetPurse = () => {
  const  navigate  = useNavigate();
  const [PurseData, setPure] = useState([])
  const token = localStorage.getItem('token');
  useEffect(() =>{  fetch('http://localhost:5000/purse/' + localStorage.getItem('UserId'), {
          method: "GET",
          headers: {'Accept': 'application/json',
		  'Authorization': 'Bearer '+ token
		  }
      }).then(response => {
	    if(response.status == 200){
		   response.json().then(datass =>{
		   setPure(datass.purses)});
		   console.log(PurseData)
		}
		else{
		  console.log("Something went wrong");
		}
	  });
  }
  , [])
    return (
      <div className="App">
	  <form data-testid= "GetPurseForm" className="form">
      <header className="App-header">
        <div>
		{PurseData.map((purses) => (
           <div key={purses.PurseId}>
                            <p > Name: {purses.name}</p>
                            <p >Funds: {purses.funds}</p>
                        </div>
		))}
        </div>
	  </header>
	  </form>
    </div>
  );
};
export default GetPurse;