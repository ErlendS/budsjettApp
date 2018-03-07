import React, { Component } from 'react';
import { BrowserRouter as Switch, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import fire from './fire';
import User from "./userPage.js";


class App extends Component {
  state = {budget: {daily:100, weekly:700, monthly: 3000}, vacation: 12}   
  handleCalculator = event => {
    event.preventDefault()
    let daily = this.inputBudget.value / this.inputVacation.value
    let result = {
      daily: Math.floor(daily),
      weekly: Math.floor(daily*7),
      monthly: Math.floor(daily*30)
    }
    this.setState(
      this.state.budget = result
    )

    // SPØRSMÅL TIL SINDRE, hvorfor fungerer ikke this når jeg skirver
    // handleCalculator(event) = {
    //   console.log(this.inputNode.value)
    // }
  }
  handleLoginn = event => {
    event.preventDefault()

    // const user = () => (
    //   <Route path='/user' component={User}>
    //     <Redirect to='/user'/> 
    //   </Route>
    // )
    // console.log('well that didnt do shit')
    
  }
  render() {
    const {budget, vacation} = this.state    
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
          <form 
            className='loginn mb30' 
            onSubmit={this.handleLoginn.bind(this)}
            id="login" 
            action="/loginn" 
            method="get">
              <input 
                className="btn_style" 
                type="text" 
                placeholder="user name"
                ref={name => (this.inputName = name)}
                />
              <input 
                className="btn_style"
                type="password"   
                placeholder="password"
                ref={password => (this.inputPassword = password)}
                />
              <button 
                className="btn_style" 
                type="submit" 
                id="login_btn"> 
                Login 
              </button>
          </form>
          <div className='calculator mb30'>
            <p className="calc_txt"> Try our simplified calculator! </p> 
            <form onSubmit={this.handleCalculator}>
              <div className="budget mt15">
                <label> My Budget </label>
                <input 
                  className="btn_style" 
                  type="number" 
                  placeholder="2000$" 
                  min="0" 
                  max="10000000"
                  ref={budget => (this.inputBudget = budget)} /> 
              </div>
              <div className="vac_time mt15">
                <label> I'll be gone </label>
                <input 
                  className="btn_style" 
                  type="number"  
                  placeholder="10 days" 
                  min="0"
                  max="11000"
                  ref= {vacation => (this.inputVacation = vacation)} />
              </div>
              <button 
                className="btn_style calc_button" 
                type="submit" 
                id="button">
                Calculate! 
              </button>
              <label className="result">
                <li>
                <ul> Your daily budget is {budget.daily}$,</ul>
                <ul> your weekly budget is {budget.weekly}$,</ul>
                <ul> and your monthly budget is {budget.monthly}$.</ul> 
                </li>
              </label>
            </form>
          </div>
          <div className='users'>
            <button className='btn_style'> 
              <Link to='/user1'>  User 1 </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
