import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

import Header  from './components/header';
import Register from './components/register';
import Login from './components/login';
//import './mystyles.css';

import './App.css';

const style = {
  height: 500,
  width: 1125,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
            <Route exact  path='/' component = {Register}/>
            <Route exact  path='/login' component = {Login}/>
        </Switch>
      </div> 
    );
  }
}

export default App;
