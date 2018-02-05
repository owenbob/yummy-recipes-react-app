import React, { Component } from 'react';
import axios from 'axios';

import Divider from 'material-ui/Divider/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Reorder from 'material-ui/svg-icons/action/reorder';
import LibraryBooks  from 'material-ui/svg-icons/av/library-books';
import {Tabs, Tab} from 'material-ui/Tabs';
import Reply from 'material-ui/svg-icons/content/reply';
import {Card,  
    CardTitle, 
    CardText} from 'material-ui/Card';

class RecipeDisplay extends Component {
    constructor(props){
        super(props)
        let recipeId = this.props.match.params.id
        console.log(recipeId)
        this.state = {
            recipe:[],
            recipeId:recipeId,
        }
    }

    getRecipe(){
        let viewARecipeUrl= 'http://127.0.0.1:5000/recipe/'+this.state.recipeId

        axios.get(viewARecipeUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => {
          console.log(response);
          this.setState({recipe:response.data})
          console.log(this.state.recipe);
        })
        .catch(error => {
          console.log(error)
        })
    }
    componentWillMount(){
        console.log('I got here')
        this.getRecipe();
    }
    handleChangeCat=(e) =>{
        this.props.history.push('/yummyrecipes/dashboard')
        
    }
    handleChangeRec=(e) =>{
        this.props.history.push('/yummyrecipes/recipes')
        }
    handleLogOut =(e) =>{
        localStorage.removeItem("token");
        this.props.history.push('/login')
    }


    render() {  
        return( 
                <div>
                   <div className = "center">
                <h1 className = "text">Welcome To Yummy Recipes</h1>          
                </div>
                <div id = "container">
                <div className = "left">
                <Menu >
                    <MenuItem   className = "menu_style"
                                onClick = {this.handleChangeCat}  
                                primaryText="Category"  
                                leftIcon={<Reorder />} 
                    />
                    <MenuItem   className = "menu_style"
                                onClick = {this.handleChangeRec} 
                                primaryText="Recipe" 
                                leftIcon={<LibraryBooks />} 
                    />
                    <Divider    className = "menu_style" 
                    />
                    <MenuItem   className = "menu_style" 
                                onClick = {this.handleLogOut} 
                                primaryText="Logout" 
                                leftIcon={<Reply />} 
                    />
                    <Divider    className = "menu_style" 
                    />
                </Menu>
                </div>
                <div className = "right">
                    <Tabs>
                    <Tab label="Category">
                    <Card>
                        <CardTitle title={this.state.recipe.recipe_title} 
                                  subtitle={this.state.recipe.recipe_date_stamp} />
                        <CardText>
                        {this.state.recipe.recipe_description}
                        </CardText>
                        
                    </Card>
                    </Tab>
                    </Tabs> 
                    </div>
                </div>             
                </div>
        );
    }
}

export default RecipeDisplay ;