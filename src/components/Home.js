import React, { Component } from 'react'
// import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import '../App.css'
import { firebaseAuth } from '../config/fire.js'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard'
import SimpleCalculator from './Calculator.js'
import ForgotPasswordForm from './ForgotPasswordForm'
import {
  logout,
  login,
  createUser,
  sendPasswordResetEmail,
} from '../helpers/auth.js'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      currentForm: 'login',
    }
  }
  render() {
    return (
      <div className="App letSpace05 lh20">
        <div className="header">
          <div className="bg_img" alt="bg_img">
            <div className="info">
              <h1> The Budget App </h1>
              <h3 id="intro">
                The quick and simple way too keep track of your budget!
              </h3>
            </div>
          </div>
        </div>
        <div className="content">
          <p className="login_txt txtAlignC">
            The budget app let's you track your daily, weekly and monthly
            spending, with rollover, split and smudge functions! Login to get
            your own personalized budget plan or create a shared family budget.
          </p>

          {this.state.currentForm === 'login' && (
            <Login
              showRegisterForm={() =>
                this.setState({ currentForm: 'register' })
              }
              showForgotPasswordForm={() =>
                this.setState({ currentForm: 'forgotPassword' })
              }
              login={login}
            />
          )}

          {this.state.currentForm === 'register' && (
            <Register
              showLoginForm={() => this.setState({ currentForm: 'login' })}
              createUser={createUser}
            />
          )}

          {this.state.currentForm === 'forgotPassword' && (
            <ForgotPasswordForm
              showLoginForm={() => this.setState({ currentForm: 'login' })}
              resetPasswordEmail={sendPasswordResetEmail}
            />
          )}
          <SimpleCalculator />
        </div>
        <div className="container" />
      </div>
    )
  }
}

export default Home
