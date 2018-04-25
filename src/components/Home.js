import React, { Component } from 'react';
// import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import '../App.css';
import {firebaseAuth} from '../config/fire.js';
import Login from "./Login.jsx";
import Dashboard from "./Dashboard";
import SimpleCalculator from './Calculator.js'; 
import { logout } from '../helpers/auth.js';

class Home extends Component {
  render() {
    return (     
        <div className="App letSpace05 lh20">
          <div className="header">
            <div className="bg_img"  alt="bg_img">
              <div className="info">
                <h1> The Budget App </h1>
                <h3 id="intro"> The quick and simple way too keep track on your budget! </h3>
              </div>
            </div>
          </div>
          <div className="content"> 
            <p className="login_txt txtAlignC">
            The budget app let's you track your daily, weekly and monthly spending, with rollover, split and smudge functions!
            Login to get your own personalized budget plan or create a shared family budget.</p>
          <Login /> 
          <SimpleCalculator />
          </div>
          <div className='container'>

          </div>
        </div>
    );
  }
}

export default Home;
