import React, { Component } from 'react'
// import { sendPasswordResetEmail } from '../helpers/auth.js'

class ForgotPasswordForm extends Component {
  state = {
    email: '',
  }
  handleForgotPassword = e => {
    e.preventDefault()
    console.log(e.target)
    console.log(e.target.email.value)
    this.props.resetPasswordEmail(this.state.email)
  }

  render() {
    return (
      <form
        className="loginn mb30"
        onSubmit={this.handleForgotPassword}
        id="login"
        action="/loginn"
        method="get"
      >
        <input
          className="btn_style"
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
          name="email"
        />

        <button className="btn_style" type="submit" id="login_btn">
          Get Password
        </button>
        <p
          onClick={this.props.showLoginForm}
          style={{
            color: 'blue',
            fontSize: '0.75rem',
            textAlign: 'right',
            marginTop: '5px',
          }}
        >
          Back To Login
        </p>
      </form>
    )
  }
}

export default ForgotPasswordForm
