import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import  {notify} from 'react-notify-toast';
import { withRouter } from 'react-router';



import axios from 'axios';
import baseUrl from'./config';



class EditCategory extends Component {
    constructor(props){
        super(props);
        //Set initial state  of open for the modal to false
        //category_title and category_description to props of the recipe to be edited
        this.state={
          open: false,
          category_title:this.props.category_title,
          category_description:this.props.category_description
        };
        this.handleClick= this.handleClick.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this); 
     }

    //handleClick to make an API call and post category_title and category_description
      handleClick(e){
        e.preventDefault();
        const EditCategoryUrl=baseUrl+'edit_category/'+this.props.id;
        axios.put(EditCategoryUrl,
            {
            category_title: this.state.category_title,
            category_description: this.state.category_description,   
        },
        {headers: {'x-access-token': localStorage.getItem('token')}} 
    )
        // If the API call is a success  then notify the user and that category has been edited
        .then(response => {
            if(response.status === 201){
                notify.show('Category  Edited','success');
                this.setState({open: false});
                this.props.history.push(`/yummyrecipes/category/${this.props.id}`);
                
            }
            //If the API is a fail,then check for the message and respond accordingly
            }).catch(error=> {
                notify.show('Category Not edited','error');
            });
        } 
     //handleOpen method to cater opening of modal by setting state to open
      handleOpen(){
        this.setState({open: true});
      };
     //handleOpen method to cater closing of modal by setting state to false
      handleClose(){
        this.setState({open: false});
      };
      // handleLoginChange set the state of values input in the text fields according to name of the 
        // textfield ie category_title and category_description
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
            title="Please Enter Category details"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
                <form   onSubmit={this.handleClick}>
                {/* Materail Ui component for a texfield. Textfield to handle Category_title */}
                    <TextField
                        floatingLabelText="Enter category title"
                        errorText="This field is required."
                        name="category_title"
                        value={this.state.category_title}
                        onChange = {this.handleChange}
                        /><br />
                    {/* Materail Ui compnent for a texfield. Textfield to handle category_description */}
                    <TextField
                        floatingLabelText="Enter category description"
                        errorText="This field is required."
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

export default withRouter (EditCategory);
