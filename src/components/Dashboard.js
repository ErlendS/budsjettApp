import React, { Component } from 'react'
import { logout } from '../helpers/auth.js';
import Chart from './Chart.js';
import { handleCreateBudget, getMyBudgets, addPurchases, getPurchases, getCurrencies } from '../helpers/budgetApi.js'
import FirestoreSubscribe, { FirebaseUserBudget } from './FirestoreSubscribe'
import PurchaseForm from './PurchaseForm'
import CreateBudgetForm from './CreateBudgetForm'
import Loading from './Loading'

export default class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      viewState: 'loading', // 'loading' | 'ready' | 'error'
      purchases: [
        // { name: 'name', price: 'price' }
      ],
      budgets: [],
      currencies: []
    }
  }

  componentDidMount(){
    Promise.all([
      getCurrencies()
      .then((currencies = []) => this.setState({currencies}))
    ])
    .then(() => this.setState({viewState: 'ready'}))
    .catch((err) => {
      this.setState({viewState: 'error', errorMessage: err.message })
    })
  }

  initBudget = data => {
    handleCreateBudget( data, this.props.user.uid)
  }

  handleSubmitItems = data => {
    addPurchases(data, this.state.selectedBudgetId, this.props.user.uid)
  }

  render () {
    if (this.state.viewState === 'loading'){
      return (
        <Loading/>
      )
    }
    if (this.state.viewState === 'error') {
      return (
        <h1>fuck you</h1>
      )
    }
  return (
      <div className='dashboard'>
        <div>
          <div>
            Dashboard. This is a protected route. You can only see this if you're authed.
          </div>
          <Chart/>
          <div className='container'>
            <CreateBudgetForm onSubmit={this.initBudget} currencies={this.state.currencies}/>
            <div className='addItemsForm'>
            <FirebaseUserBudget userId={this.props.user.uid}>
              {(budgets = []) => (
                <select
                  value={this.state.selectedBudgetId}
                  onChange={(event) => this.setState({ selectedBudgetId: event.target.value })}
                >
                  <option value="">Select budget</option>
                  {budgets.map((budget, i) => (
                    <option key={i} value={budget.id}> {budget.budgetName} </option>                    
                  ))}
                </select>
                )}
            </FirebaseUserBudget>
              {this.state.selectedBudgetId && (
                <React.Fragment>
                  <p> Add items </p>
                  <PurchaseForm onSubmit={this.handleSubmitItems} />

                  <FirestoreSubscribe
                    key={this.state.selectedBudgetId}
                    query={(db) => {
                      console.log('query')
                      return db
                      .collection('budgets')
                      .doc(`${this.state.selectedBudgetId}`)
                      .collection('purchases')
                    }
                    }>
                      {(purchases = []) => (
                        <div>
                          <p>subscibed purchases:</p>
                        <ul> 
                          {purchases.map((purchase, i) => (
                            <div key={i}>{purchase.itemName} - {purchase.price}</div>
                          ))}
                        </ul> 
                        </div>
                      )}
                  </FirestoreSubscribe>
                </React.Fragment>
              )}
            </div>
            <div>
              <p> My Budgets </p>
              <FirebaseUserBudget userId={this.props.user.uid}>
                {(budgets = []) => (
                  budgets.map((budget, i) => (
                    <ul key={i}>
                      <li key={i}>{budget.budgetName}</li>
                      <ul>
                        <li> Total: {budget.budget.total}$ </li>
                        <li> Duration: {budget.budget.duration} days </li>
                      </ul>
                    </ul>
                  ))
                )}
              </FirebaseUserBudget>
            </div>
            {/* <div>
              <p> My purchases </p>
              {this.state.purchases.map((purchase, i) => (
                <ul>
                    <li> {purchase.itemName} - {purchase.price} $</li>
                </ul>
              ))}
            </div> */}
          </div>
          <div className='logout'>
            <button 
              className= 'btn_style' 
              style= {{marginTop:30}}
              onClick={logout}>
              Logout 
            </button>
          </div>
          <div>
            <button onClick={this.testFuction} children='Click Me!'/>
            </div>
        </div>
      </div>
    )
  }
}

// class Loading extends Component {
//   render() {
//    return  <h1> Please wait, loading </h1>
//   }
// }