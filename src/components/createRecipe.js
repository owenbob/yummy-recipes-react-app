import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import baseUrl from './config';
import  {notify} from 'react-notify-toast';



import axios from 'axios';


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
        //Set initial state  of open for the modal to false
        //category_id,recipe_title and recipe_description to empty strings
        this.state={
          open: false,
          category_id:'',
          recipe_title:'',
          recipe_description:'',
          categories:[]
        };
        this.handleClick =this.handleClick.bind(this);
        this.handleOpen =this.handleOpen.bind(this);
        this.handleClose =this.handleClose.bind(this);
        this.handleChange =this.handleChange.bind(this);
        this.handleSelectChange=this.handleSelectChange.bind(this);
      } 

      //On mount obtain props for a category
      componentDidMount(){
        let viewCategoryUrl= baseUrl+'categories'

        axios.get(viewCategoryUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => {
          this.setState({categories:response.data.Categories})
          
        })
        .catch(error => {
          console.log(error)
        })

      }

      getRecipes(){
        let viewRecipesUrl= baseUrl+'recipes?limit='+this.state.limit+'&page='+this.state.page

        axios.get(viewRecipesUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => {
          this.setState({recipes:response.data.recipes})
        })
        .catch(error => {
          console.log(error.response)
        })

    } 
      //handleClick to make an API call and post recipe_title and recipe_description
      handleClick(e){
        e.preventDefault();
        const CreateRecipeUrl = baseUrl+'create_recipe/' +this.state.category_id;
        axios.post(CreateRecipeUrl,
            {
            recipe_title: this.state.recipe_title,
            recipe_description: this.state.recipe_description,   
        },
        {headers: {'x-access-token': localStorage.getItem('token')}} 
    )// If the API call is a success  then notify the user and that recipe has been created
        .then(response => {
            console.log(response);
            if(response.status === 201){
                notify.show('Recipe created!','success');
                this.getRecipes()
                this.setState({open: false});
           
                
            }
            //If the API is a fail,catch the error
            }).catch(error=> {
                console.log(error)
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
      // handleChange set the state of values input in the text fields according to name of the 
        // textfield ie recipe_title and recipe_description
      handleChange(e){
        this.setState({ [e.target.name] : e.target.value });
     }
     // handleSelectChange set the state of values input in the text fields according to name of the 
        // textfield ie category_id 
     handleSelectChange(e){
         this.setState({
             category_id:e.target.value
            });
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
                        <option className="text2" disabled>You cannot create Recipe without category</option>,
                        {this.state.categories.map(category =>
                             <Options key={category.category_id} {...category}/> 
                        )}
                        
                        </select>
                    </Paper>
                    </div>
                        <br />
                        {/* Materail Ui compnent for a texfield. Textfield to handle recipe_title */} 
                    <TextField
                        floatingLabelText="Enter recipe title"
                        errorText="This field is required."
                        underlineFocusStyle={style5.underlineStyle}
                        name="recipe_title"
                        value={this.state.recipe_title}
                        onChange = {this.handleChange}
                        /><br />
                        {/* Materail Ui compnent for a texfield. Textfield to handle recipe_description */}
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
