import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';
import App from './App';
import fire from './fire.js';
import registerServiceWorker from './registerServiceWorker';
import routes from './routes'
import User from "./userPage";

ReactDOM.render((
  <BrowserRouter>
    <Switch>
     <Route exact path='/' component={App}/>
     <Route path='/user/:id'component={User}/>
    </Switch>
  </BrowserRouter> 
), document.getElementById('root'));

registerServiceWorker();
