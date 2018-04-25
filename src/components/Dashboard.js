import React, { Component } from 'react'
import { logout, setData, getUser, addData, currentUser } from '../helpers/auth.js';
import Chart from './Chart.js';
import { budgetCalculator } from './Calculator.js'
import { handleCreateBudget } from '../helpers/budgetApi.js'



//TODO:
// RESTRUCTURE DATA , split into purchases(all purchaeses), budgetInfo(contaning budgets name, id and periods and totbudget, members(for family budgets))
// send data using budgetId,
// restructure -- 
// budsjettapp-3c23e {
//   purchases: ...,
//   users: ...
// }

export default class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      purchases: [
        // { name: 'name', price: 'price' }
      ]
    }
  }
  initBudget = e => {
    e.preventDefault()
    handleCreateBudget( this.inputBudget.value, this.inputTime.value, this.props.user.uid, this.inputBudgetName.value)
  }

  handleAddItems = e => {
    e.preventDefault()
    const data = this.state.purchases
    addData(data, getUser().uid, 
    //getBudgetId
    )
  }


  addListing = (e) => {
    e.preventDefault()
    const inputs = {
      name: this.inputName.value,
      price: this.inputPrice.value
    }
    const newState = {
      ...this.state,
      purchases: this.state.purchases.concat(inputs)
    }
    this.setState(newState)
    this.inputName.value=''
    this.inputPrice.value=''
  }

  render () {
  return !this.props.user
  ? <Loading/>
  :  (
      <div className='dashboard'>
        <div>
          <div>
            Dashboard. This is a protected route. You can only see this if you're authed.
          </div>
          <Chart/>
          {/* If no user budget render createBudget, if user data, render add items to budget form */}
          <div className='container'>
            <div className='calculator budgetForm mb30'>
              <form onSubmit={this.initBudget}>
                <div className='budgetName mt15'>
                  <input 
                    ref={budgetName => (this.inputBudgetName = budgetName)}
                    placeholder='Budget Name'
                    type='string'
                    /* value='Afrika' */
                    className='btn_style'
                    />
                  </div>
                  <div className='period mt15'>
                    <input 
                      ref={time => (this.inputTime = time)}
                      placeholder='Days Gone'
                      type='number'
                      /* value='7' */
                      className='btn_style'
                    />
                  </div>
                  <div className='budget mt15'>
                    <input 
                      ref={budget => this.inputBudget = budget}
                      placeholder='Budget'
                      type='number'
                      /* value='10000' */
                      className='btn_style'
                    />
                  </div>
                  <div className='sButton mt15'>
                    <button
                      type='submit'
                      id='submitBudget'
                      className='btn_style'>
                      Send
                    </button>
                  </div>
              </form>
            </div>  
            <div className='addItemsForm'>
              <p> Add items </p>
              <form >
                <div className='itemList' id='itemList'>
                  <input
                  placeholder='Item Name'
                  type='string'
                  ref={name => (this.inputName = name)}
                  /> 
                  <input
                  placeholder='price'
                  type='number'
                  ref={price => (this.inputPrice = price)}
                  />
                <button
                type='submit'
                onClick={this.addListing}
                > Add 
                </button>
              <button onClick={this.handleAddItems}>
                Submit
              </button>
                </div>
              </form>
              {this.state.purchases.map((purchase, i) => (
                <div key={i}>{purchase.name} - {purchase.price}</div>
              ))}
            </div>
          </div>
          <div className='logout'>
            <button 
              className= 'btn_style' 
              style= {{marginTop:30}}
              onClick={logout}>
              Logout 
            </button>
          </div>
          <button onClick={this.showUser}> click me </button>
        </div>
      </div>
    )
  }
}

class Loading extends Component {
  render() {
   return  <h1> Please wait, loading </h1>
  }
}