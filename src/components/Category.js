import React from 'react';
import EditCategory from './editCategory';
import DeleteCategory from './deleteCategory';
import {
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

const Categories=props=>{
    return(
        <TableRow>
            <TableRowColumn>
            <h3>
            <a href={"category/"+props.category_id}>{props.category_title}</a>
             </h3>
            </TableRowColumn>
            <TableRowColumn>
            <h3>
            {props.category_description}
            </h3>
            </TableRowColumn>
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

export default Categories   ;