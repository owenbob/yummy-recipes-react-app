import React, { Component } from 'react';
import CreateCategory from './createCategory';
import ViewCategory from './viewCategory';

// import './styling.css';
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


    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.history.push('/login')
        }
    }
    handleChangeCat(e){
        this.props.history.push('/yummyrecipes/dashboard')
        
    }
    handleChangeRec(e){
        this.props.history.push('/yummyrecipes/recipes')
        }

    handleLogOut(e){
        localStorage.removeItem("token");
        notify.show('Successful Logged out', 'success');
        this.props.history.push('/login')
        
    }
   
    
    render() {
        return (
        <div>
            <div className = "center">
                <h1 className = "text">Welcome To Yummy Recipes</h1>
                <Divider/>    
            </div>
            
        <div id = "container">
        <div className = "left">
        <Menu >
            <MenuItem   className = "menu_style"
                        onClick = {this.handleChangeCat}  
                        primaryText="Category"  
                        leftIcon={<Reorder />} 
            />
            <MenuItem   className = "menu_style"
                        onClick = {this.handleChangeRec} 
                        primaryText="Recipe" 
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
        <Tabs>
        <Tab label="Category">
          <div>
                <CreateCategory />
          </div>
                <Divider/>
            <div>
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



    