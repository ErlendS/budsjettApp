import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Home.js';
import Dashboard from './components/Dashboard.js';
import {firebaseAuth} from './config/fire.js';
import Loading from './components/Loading'


function PrivateRoute({component: Component, children, authed, ...rest}) {
  console.log('privateRoute function activated', rest)
  return (
    <Route
    {...rest}
    render = {props => {
      console.log('renderprop', props)
      return authed 
      ? children(props) 
      :  <Redirect to='/' />
    }} />
  )
}

function PublicRoute({component: Component, authed, ...rest}) {
  console.log('publicRoute function activated')
  return (
    <Route
      {...rest}
      render = {props => authed === false 
        ? <Component {...props} />
        : <Redirect to='dashboard'/>
      }
    />
  )
}

class App extends Component {
  state = {
    authed: true
  }

  componentDidMount() {
    this.removeListner = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user is authed', user)
        this.setState({
          authed: true,
          user
        })
      }
      else this.setState({
        authed: false,
        user: undefined
      })
    })
  }
  componentWillUnmount() {
    this.removeListner()
  }

  render(){
    return (
    <BrowserRouter>
      <Switch>
        <PublicRoute authed={this.state.authed} exact path='/' component={Home}/>
        
        <PrivateRoute authed={this.state.authed} path='/dashboard'>
          {(routeProps) => (
            this.state.user
              ? <Dashboard routeProps={routeProps} user={this.state.user} />
              : <Loading delay={300} />
          )}
        </PrivateRoute>

      </Switch>
    </BrowserRouter>
    )
  }
}

 export default App