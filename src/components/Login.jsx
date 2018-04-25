import React, {Component} from "react";
import {login} from '../helpers/auth.js'



class Login extends Component {
  state = {message: null}
  handleLogin = e => {
    e.preventDefault()
    login(this.inputEmail.value, this.inputPassword.value)
    .catch((error) => {
      this.setState({message: 'Something went wrong here'})
    })
  }

  render() {
    return (
      <form 
        className='loginn mb30' 
        onSubmit={this.handleLogin}
        id="login" 
        action="/loginn" 
        method="get">
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
          <button 
            className="btn_style" 
            type="submit" 
            id="login_btn"> 
            Login 
          </button>
      </form>
    )}
}

export default Login