import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';


import axios from 'axios';
import baseUrl from './config';
import  {notify} from 'react-notify-toast';





class DeleteCategory  extends Component {
    constructor(props){
        super(props);
        this.state={
          open: false,
        };
        this.handleClick =this.handleClick.bind(this);
        this.handleOpen =this.handleOpen.bind(this);
        this.handleClose =this.handleClose.bind(this);
        

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
      
      //handleClick to make an API call and delete the recipe with a certain id
      handleClick(e){
        e.preventDefault();
        const DeleteCategoryUrl=baseUrl+'delete_recipe/'+this.props.id;
        axios.delete(DeleteCategoryUrl,
        {headers: {'x-access-token': localStorage.getItem('token')}} 
    )// If API call is successfull then notify user the recipe is deleted
        .then(response => {
            console.log(response);
            if(response.status === 200){
                notify.show('Recipe deleted','success');
                this.getRecipes()
                this.setState({open: false});
                
            }
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

  render() {
    const actions = [
         //Material Ui component for button Modal
        //Cancel button  to close modal
        <FlatButton
          label="No"
          primary={true}
          onClick={this.handleClose}
        />,
        //Material Ui component for button Modal
        //Submit button  to submit form
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
        {/* Form to to prompt user and then delete on click    */}
            <FloatingActionButton onClick={this.handleOpen}>
                <Delete />
            </FloatingActionButton>
            <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
                <form   onSubmit={this.handleClick}>
                 <h3> Are you sure you want to delete this Recipe?</h3>    
                </form>
            </Dialog>
        </div>    
    </div>  
    
    );
  }
}

export default DeleteCategory ;
