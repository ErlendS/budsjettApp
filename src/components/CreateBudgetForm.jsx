import React, { Component } from 'react'
import PropTypes from 'prop-types';
import date, { differenceInCalendarDays } from 'date-fns'


class CreateBudgetForm extends Component {
  constructor(){
    super()
    this.state = {}
    this.handleCreateBudget = this.handleCreateBudget.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = this.initBudgetState();
  }

handleChange(e) {
  const name = e.target.name
  const value = e.target.value
  this.setState({
    [name]:value
  })
}
setDuration(end, start) {
  let duration = differenceInCalendarDays(end, start)
  return Promise.resolve(duration)
}

handleCreateBudget(e) {
  e.preventDefault()
  this.setDuration(this.state.tripEnd, this.state.tripStart)
  .then((duration) => this.setState({duration}))
  .then(() => this.props.onSubmit(this.state))
  .catch((err) => console.error(err, 'something went wrong trying to create the budget'))
  // const budget = this.state

  // this.props.onSubmit(budget)
  // TODO: onSubmit can fail...
  // this.setState(this.initBudgetState());
}

initBudgetState() {
  return {
    budgetName:'',
    duration: '',
    budget: '',
    tripStart: '',
    tripEnd: '',
    currency: 'NOK',
  }
}

 render() { 
  return (
    <div className='calculator budgetForm mb30'>
      <form onSubmit={this.handleCreateBudget}>
      <p> Create Budget </p>
        <div className='budgetName mt15'>
          <input 
            placeholder='Budget Name'
            name='budgetName'
            type='string'
            value={this.state.budgetName || ''}
            className='btn_style'
            onChange={this.handleChange}
            />
          </div>

          {/* <div className='period mt15'>
            <input 
              placeholder='Days Gone'
              type='number'
              name='duration'
              value={this.state.duration || ''}
              className='btn_style'
              onChange={this.handleChange}
            />
          </div> */}

          <div className='period mt15'>
            <label>Start</label> 
            <input 
            type='date'
            name='tripStart'
            value={this.state.tripStart}
            onChange={this.handleChange}
            />
          </div>
          <div className='period mt15'>
            <label>End</label> 
            <input 
            type='date'
            name='tripEnd'
            value={this.state.tripEnd}
            onChange={this.handleChange}
            />
          </div>


          <div className='budget mt15'>
            <input 
              placeholder='Budget'
              type='number'
              name='budget'
              value={this.state.budget || ''}
              className='btn_style'
              onChange={this.handleChange}
            />
          </div>

          <div className='budget mt15'>
            <select
            type='string'
            name='currency'
            className='btn_style'
            value={this.state.currency || 'NOK'}
            onChange={this.handleChange}
            >
            {this.props.currencies.map(currency => (
              <option key={currency.id} value={currency.id} >{currency.id}</option>
            ))}
            </select>
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
    )
  }
}

CreateBudgetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CreateBudgetForm