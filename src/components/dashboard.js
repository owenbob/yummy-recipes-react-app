import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Register from './register';
import style2 from './styling';
import './styling.css';

import FlatButton from 'material-ui/FlatButton';


import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Reorder from 'material-ui/svg-icons/action/reorder';
import LibraryBooks  from 'material-ui/svg-icons/av/library-books';

import Divider from 'material-ui/Divider';
import Reply from 'material-ui/svg-icons/content/reply';
import FontIcon from 'material-ui/FontIcon';


class Dashboard extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.history.push('/login')
        }
    }
    handleLogOut =(e) =>{
        localStorage.removeItem("token");
        window.location.reload()
        this.props.history.push('/login')

    } 
    render() {
        return (
        <div>
            <div className = "center">
                <h1 class = "text">Welcome To Yummy Recipes</h1> 
            </div>
        <div>
        <Menu >
            <MenuItem className = "menu_style" primaryText="Category" leftIcon={<Reorder />} />
            <MenuItem className = "menu_style" primaryText="Recipe" leftIcon={<LibraryBooks />} />
            <Divider  className = "menu_style" />
            <MenuItem className = "menu_style" onClick = {this.handleLogOut}primaryText="Logout" leftIcon={<Reply />} />
        </Menu>
        </div>
        </div>
        )
    }
}
 
export default Dashboard ;



/*


import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

const MenuExampleIcons = () => (
  <div>
    <Paper style={style.paper}>
      <Menu>
        <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
        <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
        <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
        <Divider />
        <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
        <MenuItem primaryText="Download" leftIcon={<Download />} />
        <Divider />
        <MenuItem primaryText="Remove" leftIcon={<Delete />} />
      </Menu>
    </Paper>
    <Paper style={style.paper}>
      <Menu>
        <MenuItem primaryText="Clear Config" />
        <MenuItem primaryText="New Config" rightIcon={<PersonAdd />} />
        <MenuItem primaryText="Project" rightIcon={<FontIcon className="material-icons">settings</FontIcon>} />
        <MenuItem
          primaryText="Workspace"
          rightIcon={
            <FontIcon className="material-icons" style={{color: '#559'}}>settings</FontIcon>
          }
        />
        <MenuItem primaryText="Paragraph" rightIcon={<b style={style.rightIcon}>¶</b>} />
        <MenuItem primaryText="Section" rightIcon={<b style={style.rightIcon}>§</b>} />
      </Menu>
    </Paper>
  </div>
);

export default MenuExampleIcons;
*/