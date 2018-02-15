import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import { withRouter } from 'react-router';


import axios from 'axios';
import baseUrl from './config';
import  {notify} from 'react-notify-toast';


class EditRecipes extends Component {
    constructor(props){
        super(props);
        //Set initial state  of open for the modal to false
        //recipe_title and recipe_description to props of the category to be edited.
        this.state={
          open: false,
          recipe_title:this.props.recipe_title,
          recipe_description:this.props.recipe_description
        };
        this.handleClick =this.handleClick.bind(this);
        this.handleOpen =this.handleOpen.bind(this);
        this.handleClose =this.handleClose.bind(this);
        this.handleChange =this.handleChange.bind(this);
        
       
      } 

      //handleClick to make an API call and post recipe_title and recipe_description
      handleClick(e){
        e.preventDefault();
        const EditrecipeUrl=baseUrl+'edit_recipe/'+this.props.id;
        axios.put(EditrecipeUrl,
            {
            recipe_title: this.state.recipe_title,
            recipe_description: this.state.recipe_description,   
        },
        {headers: {'x-access-token': localStorage.getItem('token')}} 
    )// If the API call is a success  then notify the user and that recipe has been edited
        .then(response => {
            if(response.status === 201){
                notify.show('Recipe Edited','success');
                this.setState({open: false});
                this.props.history.push(`/yummyrecipes/recipe/${this.props.id}`);
                
            }//If the API is a fail,then check for the message and respond accordingly
            }).catch(error=> {
                console.log(error)
            });
        } 
    //handleOpen method to cater opening of modal by setting state to open
      handleOpen(){
        this.setState({open: true});
        console.log(this.props.id)
      };
    //handleOpen method to cater closing of modal by setting state to false
      handleClose(){
        this.setState({open: false});
      };
      // handleLoginChange set the state of values input in the text fields according to name of the 
        // textfield ie recipe_title and recipe_description
      handleChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }

  render() {
    const actions = [
        //Material Ui component for button Modal
        //Cancel button  to close modal
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        //Material Ui component for button Modal
        //Submit button  to submit form
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
        {/* Material Ui component for button Modal,opens the modal */}
            <FloatingActionButton onClick={this.handleOpen}>
                <BorderColor />
            </FloatingActionButton>
            {/*  Material UI Dialog component to handle modal 
            */}
            <Dialog
            title="Please Enter recipe details"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
                <form   onSubmit={this.handleClick}>
                {/* Materail Ui component for a texfield. Textfield to handle recipe_title */}
                    <TextField
                        floatingLabelText="Enter recipe title"
                        errorText="This field is required."
                        name="recipe_title"
                        value={this.state.recipe_title}
                        onChange = {this.handleChange}
                        /><br />
                        {/* Materail Ui compnent for a texfield. Textfield to handle recipe_description */}
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

export default withRouter(EditRecipes);
