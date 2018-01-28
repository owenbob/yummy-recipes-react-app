import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


import axios from 'axios';
import './styling.css';

import style5 from './styling';
import style4 from './styling';
import style from './styling';




class DeleteCategory  extends Component {
    constructor(props){
        super(props);
        this.state={
          open: false,
        };
      } 

      handleClick = (e) =>{
        e.preventDefault();
        const DeleteCategoryUrl='http://127.0.0.1:5000/delete_category/'+this.props.id;
        axios.delete(DeleteCategoryUrl,
        {headers: {'x-access-token': localStorage.getItem('token')}} 
    )
        .then(response => {
            console.log(response);
            if(response.status === 200){
                window.location.reload()
                this.props.history.push('/yummyrecipes/dashboard');
            }
            }).catch(error=> {
                console.log(error)
            });
        } 
    
      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

  render() {
    const actions = [
        <FlatButton
          label="No"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Yes"
          primary={true}
          keyboardFocused={true}
          type = "Submit"
          onClick={this.handleClick}
        />,
      ];
    return ( 
        <div>
        <div className = "addbutton">
            <RaisedButton label=" Delete Category" onClick={this.handleOpen} />
            <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
                <form   onSubmit={this.handleClick}>
                 <h3> Are you sure you want to delete this category?</h3>    
                </form>
            </Dialog>
        </div>    
    </div>  
    
    );
  }
}

export default DeleteCategory ;
