import React, { Component } from 'react';
import EditCategory from './editCategory';
import DeleteCategory from './deleteCategory';
import Categories from './Category';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';



  class ViewCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
          categories:[],
          
        }
      }
    
    getCategories(){
        let viewCategoryUrl= 'http://127.0.0.1:5000/categories'

        axios.get(viewCategoryUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => {
          console.log(response);
          console.log(response.data);
          this.setState({categories:response.data.Categories})
        })
        .catch(error => {
          console.log(error)
        })

    }
    componentWillMount(){
        this.getCategories();   
      }
    handleSearchCat=(e)=>{
        if (e.target.value) {
            let SearchCatUrl = 'http://127.0.0.1:5000/categories?q=' + e.target.value

            axios.get(SearchCatUrl,
                {headers: {'x-access-token': localStorage.getItem('token')}} 
            ).then(response => {
                this.categories=response.data.Categories
                let categories= this.state.categories
                categories = this.categories
                this.setState({categories})
            })
            .catch(error => {
                console.log(error)
            })
        } this.getCategories();

    }

    render() {
        
        let renderCategories = this.state.categories.map(category => {
            return (
            <Categories id={category.id} {...category}/>
        )
    })
        return( 
                <Table>
                    
                    <TableBody>
                        <TableRow>
                            <div className = "right1">
                                    <TextField
                                    hintText = "Search Categories"
                                    name = "q"
                                    onChange = {this.handleSearchCat}
                                    />
                            </div>
                    </TableRow>
                            {renderCategories}
                    </TableBody>
                </Table>
        )
    }
}

export default ViewCategory ;