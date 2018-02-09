import React, { Component } from 'react';
import EditCategory from './editCategory';
import DeleteCategory from './deleteCategory';
import Categories from './Category';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import {notify} from 'react-notify-toast';
import baseUrl from './config';



  class ViewCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
          categories:[],
          
        }
        this.handleSearchCat = this.handleSearchCat.bind(this);
      }
    
    getCategories(){
        let viewCategoryUrl= baseUrl+'categories'

        axios.get(viewCategoryUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => {
          console.log(response);
          console.log(response.data);
          this.setState({categories:response.data.Categories})
        })
        .catch(error => {
            notify.show('Unable to display your Categories','error');
        })

    }
    componentWillMount(){
        this.getCategories();   
      }
    handleSearchCat(e){
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
        const {categories} = this.state
        
        let renderCategories = categories.map(category => {
            return (
            <Categories id={category.id} {...category}/>
        )
    })
        return( <Card>
                <Table>
                    
                    <TableBody>
                        <TableRow>
                        <TableRowColumn>
                        </TableRowColumn>
                        <TableRowColumn>
                        </TableRowColumn>
                        <TableRowColumn>
                            <div className = "right1">
                                    <TextField
                                    hintText = "Search Categories"
                                    name = "q"
                                    onChange = {this.handleSearchCat}
                                    />
                            </div>
                        </TableRowColumn>
                    </TableRow>
                            {renderCategories}
                    </TableBody>
                </Table>
                </Card>
        )
    }
}

export default ViewCategory ;