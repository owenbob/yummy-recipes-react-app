import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';

import Header  from './components/header';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
//import './mystyles.css';

import './App.css';



class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
            <Route exact  path='/' component = {Register}/>
            <Route path='/login' component = {Login}/>
            <Route path='/yummyrecipes/dashboard' component = {Dashboard}/>
        </Switch>
      </div> 
    );
  }
} 

export default App;
