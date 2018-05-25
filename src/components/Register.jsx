import React, { Component } from 'react'

class Register extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  }
  handleRegister = e => {
    e.preventDefault()
    console.log(this.state)
    if (this.state.password === this.state.confirmPassword) {
      this.props
        .createUser(this.state.email, this.state.password)
        .catch(error => {
          this.setState({ message: 'Something went wrong here' })
        })
    } else window.alert('The confirm password did not match')
  }

  render() {
    return (
      <form
        className="loginn mb30"
        onSubmit={this.handleRegister}
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
        <input
          className="btn_style"
          type="password"
          placeholder="password"
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
          name="password1"
        />
        <input
          className="btn_style"
          type="password"
          placeholder="confirm password"
          value={this.state.confirmPassword}
          onChange={event =>
            this.setState({ confirmPassword: event.target.value })
          }
          name="password2"
        />
        <button className="btn_style" type="submit" id="login_btn">
          Register
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
          Already a member?
        </p>
      </form>
    )
  }
}

export default Register
