import React, { Component } from 'react';
import EditCategory from './editCategory';
import DeleteCategory from './deleteCategory';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
const Categories=props=>{
return(
    <TableRow>
        <TableRowColumn>{props.category_title}</TableRowColumn>
        <TableRowColumn>{props.category_description}</TableRowColumn>
        <TableRowColumn>
            <EditCategory 
            id={props.category_id} 
            category_title={props.category_title} 
            category_description={props.category_description}
            />
        </TableRowColumn>
        <TableRowColumn>
        <DeleteCategory id={props.category_id}/>
        </TableRowColumn>
    </TableRow>
)}

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

    render() {  
        return(
                <Table>
                    <TableHeader>
                    <TableRow>
                        
                        <TableHeaderColumn>CATEGORY TITLE</TableHeaderColumn>
                        <TableHeaderColumn>CATEGORY DESCRIPTION</TableHeaderColumn>
                        <TableHeaderColumn>EDIT</TableHeaderColumn>
                        <TableHeaderColumn>DELETE</TableHeaderColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.state.categories.map(category =>
                        <Categories key={category.category_id} {...category}/>

                        )}
                    </TableBody>
                </Table>
        )
    }
}

export default ViewCategory ;