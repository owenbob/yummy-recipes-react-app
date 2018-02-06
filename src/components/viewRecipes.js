import React, { Component } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableRow,
  } from 'material-ui/Table';
import Recipe from './Recipe'
import TextField from 'material-ui/TextField';
import './styling.css';



  class ViewRecipes extends Component {
    constructor(props){
        super(props);
        this.state = {
          recipes:[],
          
        }
      }
    componentWillReceiveProps(props){
        console.log('now',props)
       
    }
    getRecipes(){
        let viewRecipesUrl= 'http://127.0.0.1:5000/recipes';

        axios.get(viewRecipesUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => {

          this.setState(() => ({recipes: response.data.recipes}))
        })
        .catch(error => {
          console.log(error)
        })

    }
    componentDidMount(){
        this.getRecipes();   
      }

    handleSearchRec=(e)=>{
        if (e.target.value) {
            let SearchRecUrl = 'http://127.0.0.1:5000/recipes?q=' + e.target.value

            axios.get(SearchRecUrl,
                {headers: {'x-access-token': localStorage.getItem('token')}} 
            ).then(response => {
                console.log('here',response.data);
                this.recipes=response.data.recipes
                console.log('there',this.recipes)
                let recipes = this.state.recipes
                recipes = this.recipes
                this.setState({recipes})
            })
            .catch(error => {
                console.log(error)
            })
        } this.getRecipes();

    }

    render() {
        
        
        let renderRecipes = this.state.recipes.map(recipe => {
            return (
            <Recipe id={recipe.id} {...recipe}/>
        )
        })
        return( 
                <Table>
                    <TableBody>
                    <TableRow>
                   
                    <div className = "right1">
                    <TextField
                    hintText = "Search Recipes"
                    name = "q"
                    onChange = {this.handleSearchRec}
                    />
               
                    </div>

                    </TableRow>
                        {renderRecipes}
                    </TableBody>
                </Table>
        )
    }
}

export default ViewRecipes ;