import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Register from './register';
import CreateCategory from './createCategory';
import ViewCategory from './viewCategory';
import style2 from './styling';
import style3 from './styling';

import './styling.css';

import FlatButton from 'material-ui/FlatButton';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Reorder from 'material-ui/svg-icons/action/reorder';
import LibraryBooks  from 'material-ui/svg-icons/av/library-books';
import {Tabs, Tab} from 'material-ui/Tabs';

import Divider from 'material-ui/Divider';
import Reply from 'material-ui/svg-icons/content/reply';
import FontIcon from 'material-ui/FontIcon';


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'a',
        };
        
    }
    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.history.push('/login')
        }
    }
    handleLogOut =(e) =>{
        localStorage.removeItem("token");
        this.props.history.push('/login')

     function handleChange(e) {
        this.setState({
            value: e.target.value
        });
    };

    } 
    render() {
        return (
        <div>
            <div className = "center">
                <h1 className = "text">Welcome To Yummy Recipes</h1>
               
            </div>
        <div id = "container">
        <div class = "left">
        <Menu >
            <MenuItem   className = "menu_style"
                        onClick = {this.handleChange}  
                        primaryText="Category" 
                        value="a" 
                        leftIcon={<Reorder />} 
            />
            <MenuItem   className = "menu_style"
                        onClick = {this.handleChange} 
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
        <Tab label="Category" value="a">
          <div>
              <CreateCategory />
          </div>
          <br/>
          <br/>
          <div>
          <ViewCategory/>
          </div>
        </Tab>
        <Tab leftIcon={<LibraryBooks />} label="Recipe" value="b">
          <div>
            
            
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



    