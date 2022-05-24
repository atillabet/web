import React from 'react'
import { useState } from "react";
import CreateUser from './components/CreateUser'
import Login from './components/login'
import Main from './components/Main'
import Edit from './components/Edit'
import PurseDel from './components/PurseDel'
import Purse from './components/Purse'
import Logout from './components/logout'
import GetPurse from './components/GetPutse'
import CreateTransfer from './components/TransferCreate'

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
		  <Route exact path = "/User/Purse" element = {<Purse />} />
		  <Route exact path = "/User/Purse/del" element = {<PurseDel />} />
          <Route exact path = "/Logout" element = {<Logout />} />
		  <Route exact path = "/Purse/Get" element = {<GetPurse />} />
		  <Route exact path = "/Transfer" element = {<CreateTransfer />} />
		</Routes>
	  </BrowserRouter>
  )
};
export default App;