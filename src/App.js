import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch} from 'react-router-dom'

import CRoute from './CustomeRoute/CustomeRoute'
import Header from './Component/Header/Header'
import Login from './Container/Login'
import Registration from './Container/Registration'
import View_AllUser from './Container/View_AllUser'
import UserHomePage from './Component/UserHomePage'
import View_Selected_User from './Container/View_SelectUser'
import UnauthorizedAccess from './UnauthorizedAccess/UnAuthorized_Access'
import HomePage from './Component/HomePage'
import PageNotFound from './PageNotFound/PageNotFound'

function App() {
  return (
    <div className="App">
      <Router>
         <Header/>
        <Switch>
          <CRoute exact path="/" component={HomePage}></CRoute>
          <CRoute path="/Login" component={Login}></CRoute>
          <CRoute path="/Registration" component={Registration}></CRoute>
          <CRoute exact cprivate path="/View_All_User" component={View_AllUser}></CRoute>
          <CRoute exact cprivate path="/UserHomePage" component={UserHomePage}></CRoute>
          <CRoute exact path="/View_Selected_User" component={View_Selected_User}></CRoute>
          <CRoute exact cprivate path="/UnauthorizedAccess" component={UnauthorizedAccess}></CRoute>
          <CRoute component={PageNotFound}></CRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
