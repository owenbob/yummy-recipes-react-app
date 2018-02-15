import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import  {notify} from 'react-notify-toast';
import baseUrl from'./config';
import { withRouter } from 'react-router';


import axios from 'axios';


class CreateCategory extends Component {
    constructor(props){
        super(props);

        //Set initial state  of open for the modal to false
        //category_title and category_description to empty strings
        this.state={
          open: false,
          category_title:'',
          category_description:''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
      } 
      
      //Obtain all categories
      getCategories(){
        let viewCategoryUrl= baseUrl+'categories?limit='+this.state.limit+'&page='+this.state.page
        

        axios.get(viewCategoryUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => { 
          this.setState({categories:response.data.Categories})
        })
        .catch(error => {
            console.log(error.response.data.Message);
            if(error.response.data.Message ==='404-Page Not Found'){
                notify.show('This is the END!','success');
            }
            
        })

    }
     //handleClick to make an API call and post category_title and category_description 
      handleClick(e){
        e.preventDefault();
        const CreateCategoryUrl=baseUrl+'create_category';
        axios.post(CreateCategoryUrl,
            {
            category_title: this.state.category_title,
            category_description: this.state.category_description,   
        },
        {headers: {'x-access-token': localStorage.getItem('token')}} 
    )
      // If the API call is a success  then notify the user and that category has been created
        .then(response => {
            if(response.status === 201){
                notify.show('Category created!','success');
                this.getCategories();
                this.setState({open: false});   
            }
            //If the API is a fail,then check for the message and respond accordingly
            }).catch(error=> {
                if(error.response.data.message==="This category already exists"){
                    notify.show('This category already exists','error');
                }
                if(error.response.data.message==="Please ensure that you have input all the fields"){
                    notify.show('Please ensure that you have input all the fields','error');
                }
                notify.show('Category not created','error');
                
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
                <ContentAdd />
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
                        onChange = {this.handleChange}
                        /><br />
                        {/* Materail Ui compnent for a texfield. Textfield to handle category_description */}
                    <TextField
                        floatingLabelText="Enter category description"
                        errorText="This field is required."
                        name="category_description"
                        onChange = {this.handleChange}
                        />
                </form>
            </Dialog>
        </div>    
    </div>  
    
    );
  }
}

export default  CreateCategory;
