import React, { Component } from 'react'
import { login } from '../helpers/auth.js'

class Login extends Component {
  state = { message: null }
  handleLogin = e => {
    e.preventDefault()
    console.log(e)

    this.props
      .login(this.inputEmail.value, this.inputPassword.value)
      .catch(error => {
        this.setState({ message: 'Something went wrong here' })
      })
  }

  render() {
    return (
      <form
        className="loginn mb30"
        onSubmit={this.handleLogin}
        id="login"
        action="/loginn"
        method="get"
      >
        <input
          className="btn_style"
          type="text"
          placeholder="email"
          ref={email => (this.inputEmail = email)}
        />
        <input
          className="btn_style"
          type="password"
          placeholder="password"
          ref={password => (this.inputPassword = password)}
        />
        <button className="btn_style" type="submit" id="login_btn">
          Login
        </button>
        <p
          onClick={this.props.showRegisterForm}
          style={{
            color: 'blue',
            fontSize: '0.75rem',
            textAlign: 'right',
            marginTop: '5px',
          }}
        >
          Not a member? Sign up
        </p>
        <p
          onClick={this.props.showForgotPasswordForm}
          style={{
            color: 'blue',
            fontSize: '0.75rem',
            textAlign: 'right',
            marginTop: '-10px',
          }}
        >
          Forgot Password?
        </p>
      </form>
    )
  }
}

export default Login
