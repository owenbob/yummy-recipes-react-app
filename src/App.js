import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';

import Header  from './components/header';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import DashboardRecipes from './components/dashboardRecipes';
import CategoryDisplay from './components/categoryDisplay';
import RecipeDisplay from'./components/recipeDisplay';
import Notifications from 'react-notify-toast';
//import './mystyles.css';

import './App.css';



class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Notifications options={{zIndex: 5000}} />
        <Switch>
            <Route exact  path='/' component = {Register}/>
            <Route path='/login' component = {Login}/>
            <Route path='/yummyrecipes/dashboard' component = {Dashboard}/>
            <Route path='/yummyrecipes/recipes'component = {DashboardRecipes}/>
            <Route path ='/yummyrecipes/category/:id' component ={CategoryDisplay}/>
            <Route path ='/yummyrecipes/recipe/:id' component ={RecipeDisplay}/>
        </Switch>
      </div> 
    );
  }
} 

export default App;
