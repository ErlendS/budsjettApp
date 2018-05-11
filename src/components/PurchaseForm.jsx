import React, { Component } from 'react'
import date, { compareAsc } from 'date-fns'
import { durationLeft } from '../helpers/budgetUtils'
import { DateRangePicker, SingleDatePicker } from 'react-dates'

class PurchaseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateAdded: date.format(new Date(), 'YYYY-MM-DD'),
      smear: false,
      // tripEnd: props.budget.tripEnd,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const purchase = this.state
    purchase.startDate = purchase.startDate.format('YYYY-MM-DD')
    if (purchase.endDate) {
      purchase.endDate = purchase.endDate.format('YYYY-MM-DD')
    }
    console.log('submitting', purchase)
    this.props.onSubmit(purchase)
    this.setState({
      itemName: '',
      price: '',
      smear: false,
      startDate: null,
      endDate: null,
    })
  }

  render() {
    const meta = this.props.budget.meta
    return (
      <form className="purchaseForm" onSubmit={this.handleSubmit}>
        <input
          type="string"
          name="itemName"
          placeholder="item name"
          value={this.state.itemName || ''}
          onChange={this.handleChange}
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          value={this.state.price || ''}
          onChange={this.handleChange}
        />

        <br />
        <label> Smear </label>
        <input
          type="checkbox"
          name="smear"
          checked={this.state.smear}
          onChange={e => {
            if (e.target.checked) {
              this.setState({ smear: true })
            } else this.setState({ smear: false })
          }}
        />

        {(this.state.smear === false && (
          <div>
            <SingleDatePicker
              date={this.state.startDate || null}
              onDateChange={startDate => this.setState({ startDate })}
              focused={this.state.focused}
              onFocusChange={({ focused }) => this.setState({ focused })}
              isOutsideRange={day => {
                const dayFormatted = day.format('YYYY-MM-DD')
                const isOutside =
                  compareAsc(meta.tripStart, dayFormatted) === 1 ||
                  compareAsc(dayFormatted, meta.tripEnd) === 1
                return isOutside
              }}
            />
          </div>
        )) ||
          (this.state.smear === true && (
            <div>
              <DateRangePicker
                startDate={this.state.startDate || null}
                startDateId="startDate"
                endDate={this.state.endDate || null}
                endDateId="endDate"
                onDatesChange={({ startDate, endDate }) => {
                  this.setState({ startDate, endDate })
                }}
                focusedInput={this.state.focusedInput || null}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                isOutsideRange={day => {
                  const dayFormatted = day.format('YYYY-MM-DD')

                  const isOutside =
                    compareAsc(meta.tripStart, dayFormatted) === 1 ||
                    compareAsc(dayFormatted, meta.tripEnd) === 1
                  // const isOutside2 =
                  // meta.tripStart > dayFormatted || dayFormatted > meta.tripEnd
                  // console.log('isOutside', dayFormatted, isOutside)
                  return isOutside
                }}
              />
            </div>
          ))}

        <br />
        {/* <label>When</label>
        <input
          type="date"
          name="tripStart"
          value={this.state.date}
          onChange={this.handleChange}
        /> */}
        <button type="submit" children="submit" />
      </form>
    )
  }
}

export default PurchaseForm
