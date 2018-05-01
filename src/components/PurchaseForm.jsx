import React, { Component } from 'react'
import date from 'date-fns'



class PurchaseForm extends Component {
  constructor() {
    super()
    this.state = {
      date: date.format(
        new Date(), 'DD.MM.YYYY'
        )
    }  
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const purchase = this.state
    this.props.onSubmit(purchase)
    this.setState({
      itemName:'',
      price: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type='string' 
          name='itemName'
          placeholder='item name' 
          value={this.state.itemName || ''} 
          onChange={this.handleChange}
        /> 
        <input 
          type='number' 
          placeholder='price'
          name='price'
          value={this.state.price || ''}
          onChange={this.handleChange}
        />
        <button type='submit' children='submit'/>
      </form>
    )
  }
}

export default PurchaseForm