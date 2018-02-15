import React, { Component } from 'react';
import CreateCategory from './createCategory';
import ViewCategory from './viewCategory';
import axios from 'axios';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Reorder from 'material-ui/svg-icons/action/reorder';
import LibraryBooks  from 'material-ui/svg-icons/av/library-books';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import Reply from 'material-ui/svg-icons/content/reply';
import  {notify} from 'react-notify-toast';



class Dashboard extends Component {
    constructor (props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleChangeCat = this.handleChangeCat.bind(this);
        this.handleChangeRec = this.handleChangeRec.bind(this);     
    }

  // On mounting check if there is a token in localstorage if not then redirect to login 
    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.history.push('/login')
        }
    }

    //handleChangeCat to redirect to /yummyrecipes/dashboard route on click
    //This acts as a menu item
    handleChangeCat(e){
        this.props.history.push('/yummyrecipes/dashboard')
        
    }
    //handleChangeRec to redirect to /yummyrecipes/recipes route on click
    //This acts as a menu item
    handleChangeRec(e){
        this.props.history.push('/yummyrecipes/recipes')
        }
    //handleLogOut removes the token from storage and redirects user to /login route
    // This succesfully logs out the user and notifies him so
    //this acts menu item
    handleLogOut(e){
        localStorage.removeItem("token");
        notify.show('Successful Logged out', 'success');
        this.props.history.push('/login')
        
    }
   
    //Render method that render items on UI
    render() {
        return (
        <div>
            <div className = "center">
                <h1 className = "text">Welcome To Yummy Recipes</h1>
                <Divider/>    
            </div>
            
        <div id = "container">
        <div className = "left">
        {/* Menuitems for category,recipe and logout */}

        <Menu >
            {/* Category menuitem */}
            <MenuItem   className = "menu_style"
                        onClick = {this.handleChangeCat}  
                        primaryText="Category"  
                        leftIcon={<Reorder />} 
            />
            {/* Recipes menuitem */}
            <MenuItem   className = "menu_style"
                        onClick = {this.handleChangeRec} 
                        primaryText="Recipe" 
                        leftIcon={<LibraryBooks />} 
            />
            <Divider    className = "menu_style" 
            />
            {/* Logout menuitem */}
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
        <Tabs>
        <Tab label="Category">
          <div>
              {/* Calling createCategory component */}
                <CreateCategory />
          </div>
                <Divider/>
            <div>
                {/* Calling Viewcategory component */}
                <ViewCategory/>
            </div>
        </Tab>
      </Tabs> 
        </div>
        </div>
        </div>
        )
    }
}
export default Dashboard ;



    