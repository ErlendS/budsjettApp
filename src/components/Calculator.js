import React, { Component } from "react";

class SimpleCalculator extends Component {
  state = { 
    budget: {daily:100, weekly:700, monthly: 3000}, 
    vacation: 12
  }   

  handleCalculator = event => {
    event.preventDefault()
    let result = budgetCalculator(this.inputBudget.value, this.inputVacation.value )
    this.setState({
      budget: result
    })
  }

  render() {
   const {budget} = this.state    

    return(
      <div className='calculator mb30'>
            <p className="calc_txt"> Try our simplified calculator! </p> 
            <form onSubmit={this.handleCalculator}>
              <div className="budget mt15">
                <label> My Budget </label>
                <input 
                  className="btn_style" 
                  type="number" 
                  placeholder="1000$" 
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
    )
  }
}

export function budgetCalculator(budget, time) {
  let daily = budget / time
  return {
    daily: Math.floor(daily),
    weekly: Math.floor(daily*7),
    monthly: Math.floor(daily*30)
  }
}

export default SimpleCalculator
