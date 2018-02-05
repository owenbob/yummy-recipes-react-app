import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import BorderColor from 'material-ui/svg-icons/editor/border-color';


import axios from 'axios';
import './styling.css';






class EditRecipes extends Component {
    constructor(props){
        super(props);
        this.state={
          open: false,
          recipe_title:this.props.recipe_title,
          recipe_description:this.props.recipe_description
        };
       
      } 

      handleClick = (e) =>{
        e.preventDefault();
        const EditrecipeUrl='http://127.0.0.1:5000/edit_recipe/'+this.props.id;
        axios.put(EditrecipeUrl,
            {
            recipe_title: this.state.recipe_title,
            recipe_description: this.state.recipe_description,   
        },
        {headers: {'x-access-token': localStorage.getItem('token')}} 
    )
        .then(response => {
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
        console.log(this.props.id)
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
            <FloatingActionButton onClick={this.handleOpen}>
                <BorderColor />
            </FloatingActionButton>
            <Dialog
            title="Please Enter recipe details"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
                <form   onSubmit={this.handleClick}>
                    <TextField
                        floatingLabelText="Enter recipe title"
                        errorText="This field is required."
                        name="recipe_title"
                        value={this.state.recipe_title}
                        onChange = {this.handleChange}
                        /><br />
                    <TextField
                        floatingLabelText="Enter recipe description"
                        errorText="This field is required."
                        name="recipe_description"
                        value={this.state.recipe_description}
                        onChange = {this.handleChange}
                        />
                </form>
            </Dialog>
        </div>    
    </div>  
    
    );
  }
}

export default EditRecipes;
