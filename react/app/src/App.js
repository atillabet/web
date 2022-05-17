import React from 'react'
import { useState } from "react";
import CreateUser from './components/CreateUser'
import Login from './components/login'
import Main from './components/Main'
import Edit from './components/Edit'

import {BrowserRouter,Routes,Route} from "react-router-dom";



function App() {
  return(
	  <BrowserRouter>
	    <Routes>
		  <Route exact path = "/" element = {<Login />} />
		  <Route exact path='/login' element={<Login />} />
		  <Route exact path='/main' element={<Main />} />
		  <Route exact path = "/CreateUser" element = {<CreateUser />} />
		  <Route exact path = "/User/Edit" element = {<Edit />} />
		</Routes>
	  </BrowserRouter>
  )
};
export default App;