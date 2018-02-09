import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';
import {notify} from 'react-notify-toast';


import axios from 'axios';




class DeleteCategory  extends Component {
    constructor(props){
        super(props);
        this.state={
          open: false,
        };
        this.handleClick= this.handleClick.bind(this);
        this.handleOpen= this.handleOpen.bind(this);
        this.handleClose= this.handleClose.bind(this);
      } 

      handleClick(e){
        e.preventDefault();
        const DeleteCategoryUrl='http://127.0.0.1:5000/delete_category/'+this.props.id;
        axios.delete(DeleteCategoryUrl,
        {headers: {'x-access-token': localStorage.getItem('token')}} 
    )
        .then(response => {
            console.log(response);
            if(response.status === 200){
                notify.show('Category deleted','success');
                window.location.reload()
                this.props.history.push('/yummyrecipes/dashboard');
            }
            }).catch(error=> {
                notify.show('Category Not created','error');
            });
        } 
    
      handleOpen(){
        this.setState({open: true});
      };
    
      handleClose(){
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
                 <h3> Are you sure you want to delete this category?</h3>    
                </form>
            </Dialog>
        </div>    
    </div>  
    
    );
  }
}

export default DeleteCategory ;
