import React, { Component } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody
  } from 'material-ui/Table';
import Recipe from './Recipe'


  class ViewRecipes extends Component {
    constructor(props){
        super(props);
        this.state = {
          recipes:[],
          
        }
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

    render() {
        console.log(this.state.recipes)
        let renderRecipes = this.state.recipes.map(recipe => {
            return (
            <Recipe id={recipe.id} {...recipe}/>
        )
        })
        return( 
                <Table>
                    <TableBody>
                        {renderRecipes}
                    </TableBody>
                </Table>
        )
    }
}

export default ViewRecipes ;