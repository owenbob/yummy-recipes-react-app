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




class CreateCategory extends Component {
    constructor(props){
        super(props);
        this.state={
          open: false,
          category_title:'',
          category_description:''
        };
      } 

      handleClick = (e) =>{
        e.preventDefault();
        const CreateCategoryUrl='http://127.0.0.1:5000/create_category';
        axios.post(CreateCategoryUrl,
            {
            category_title: this.state.category_title,
            category_description: this.state.category_description,   
        },
        {headers: {'x-access-token': localStorage.getItem('token')}} 
    )
        .then(response => {
            console.log(response);
            if(response.status === 201){
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
      handleChange=(e)=>{
        this.setState({ [e.target.name] : e.target.value });
    }

  render() {
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          type = "Submit"
          onClick={this.handleClick}
        />,
      ];
    return ( 
        <div>
        <div className = "addbutton">
            <RaisedButton label=" Create Category" onClick={this.handleOpen} />
            <Dialog
            title="Please Enter Category details"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
                <form   onSubmit={this.handleClick}>
                    <TextField
                        floatingLabelText="Enter category title"
                        errorText="This field is required."
                        underlineFocusStyle={style5.underlineStyle}
                        name="category_title"
                        value={this.state.category_title}
                        onChange = {this.handleChange}
                        /><br />
                    <TextField
                        floatingLabelText="Enter category description"
                        errorText="This field is required."
                        underlineFocusStyle={style5.underlineStyle}
                        name="category_description"
                        value={this.state.category_description}
                        onChange = {this.handleChange}
                        />
                </form>
            </Dialog>
        </div>    
    </div>  
    
    );
  }
}

export default CreateCategory;
