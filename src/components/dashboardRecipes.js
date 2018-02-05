import React, { Component } from 'react';
import CreateRecipe from './createRecipe';
import ViewRecipes from './viewRecipes';

import './styling.css';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Reorder from 'material-ui/svg-icons/action/reorder';
import LibraryBooks  from 'material-ui/svg-icons/av/library-books';
import {Tabs, Tab} from 'material-ui/Tabs';

import Divider from 'material-ui/Divider';
import Reply from 'material-ui/svg-icons/content/reply';


class DashboardRecipes extends Component {
    // constructor(props){
    //     super(props);
    // }
    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.history.push('/login')
        }
    }
    handleLogOut =(e) =>{
        localStorage.removeItem("token");
        this.props.history.push('/login') 
    };
    handleChangeCat=(e) =>{
        this.props.history.push('/yummyrecipes/dashboard')
        
    }
    handleChangeRec=(e) =>{
        this.props.history.push('/yummyrecipes/recipes')
        }
    render() {
        return (
        <div>
            <div className = "center">
                <h1 className = "text">Welcome to Recipes</h1>
               
            </div>
        <div id = "container">
        <div className = "left">
        <Menu >
            <MenuItem   className = "menu_style"
                        onClick = {this.handleChangeCat}  
                        primaryText="Category" 
                        value="a" 
                        leftIcon={<Reorder />} 
            />
            <MenuItem   className = "menu_style"
                        onClick = {this.handleChangeRec} 
                        primaryText="Recipe" 
                        value="b"
                        leftIcon={<LibraryBooks />} 
            />
            <Divider    className = "menu_style" 
            />
            <MenuItem   className = "menu_style" 
                        onClick = {this.handleLogOut} 
                        primaryText="Logout" 
                        leftIcon={<Reply />} 
            />
            <Divider    className = "menu_style" 
            />
        </Menu>
        </div>

        <div className = "right">
        <Tabs onChange={this.handleChange}>
    
        <Tab leftIcon={<LibraryBooks />} label="Recipes" value="b">
        <CreateRecipe/>
          <div>
          <Divider />
          </div>
          <div>
          <ViewRecipes />
          </div>
        </Tab>
      </Tabs> 
        </div>
        </div>
        </div>
        )
    }
}
export default DashboardRecipes ;



    