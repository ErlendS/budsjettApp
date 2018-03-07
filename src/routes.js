import React from 'react';
import {Route} from 'react-router';
import App from './App';
import userPage from "./userPage";

export default (
  <Route path='/' component={App}>
    <Route path='userPage'component={userPage}/>
    <Route path='*' component={App}/>
  </Route>
)