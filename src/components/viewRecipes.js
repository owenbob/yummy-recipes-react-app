import React, { Component } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn
  } from 'material-ui/Table';
import Recipe from './Recipe'
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import baseUrl from './config';




  class ViewRecipes extends Component {
    constructor(props){
        super(props);
        this.state = {
          recipes:[],
          
        }
        this.handleSearchRec = this.handleSearchRec.bind(this);
      }
    componentWillReceiveProps(props){
        console.log('now',props)
       
    }
    getRecipes(){
        let viewRecipesUrl= baseUrl+'recipes';

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

    handleSearchRec(e){
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
            <Card>
                <Table>
                    <TableBody>
                    <TableRow>
                    <TableRowColumn>
                    </TableRowColumn>
                    <TableRowColumn>
                    </TableRowColumn>
                    <TableRowColumn>
                    </TableRowColumn>
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
            </Card>
        )
    }
}

export default ViewRecipes ;