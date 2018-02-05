import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';



import axios from 'axios';
import './styling.css';

import style5 from './styling';



const Options = (props) =>{
    console.log('here'+props.category_id)
    return(
        <option value={props.category_id}>{props.category_title}</option>
    )
}
class CreateRecipe extends Component {
    constructor(props){
        super(props);
        this.state={
          open: false,
          category_id:'',
          recipe_title:'',
          recipe_description:'',
          categories:[]
        };
      } 
      componentDidMount(){
        let viewCategoryUrl= 'http://127.0.0.1:5000/categories'

        axios.get(viewCategoryUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => {
          this.setState({categories:response.data.Categories})
          
        })
        .catch(error => {
          console.log(error)
        })

      }

      handleClick = (e) =>{
        e.preventDefault();
        const CreateRecipeUrl='http://127.0.0.1:5000/create_recipe/' +this.state.category_id;
        axios.post(CreateRecipeUrl,
            {
            recipe_title: this.state.recipe_title,
            recipe_description: this.state.recipe_description,   
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
     handleSelectChange = (event) => {
         this.setState({
             category_id:event.target.value
            });
        console.log('here--'+this.state.category_id)
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
                <ContentAdd />
            </FloatingActionButton>
            <Dialog
            title="Please Enter Recipe details"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
                <form  onSubmit={this.handleClick}>
                   <div className="diva">
                    <Paper>
                    <select className="select"
                        name="category_id"
                        onChange={this.handleSelectChange}
                        >
                        <option className="text2" disabled>Select Category</option>,
                        {this.state.categories.map(category =>
                             <Options key={category.category_id} {...category}/> 
                        )}
                        
                        </select>
                    </Paper>
                    </div>
                        <br />
                    <TextField
                        floatingLabelText="Enter recipe title"
                        errorText="This field is required."
                        underlineFocusStyle={style5.underlineStyle}
                        name="recipe_title"
                        value={this.state.recipe_title}
                        onChange = {this.handleChange}
                        /><br />
                    <TextField
                        floatingLabelText="Enter recipe description"
                        errorText="This field is required."
                        underlineFocusStyle={style5.underlineStyle}
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

export default CreateRecipe;
