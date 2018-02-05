import React from 'react';
import EditRecipes from './editRecipe';
import DeleteRecipe from './deleteRecipe';
import {
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

const Recipe = props => {
    return( 
        <TableRow>
            <TableRowColumn>
            <h3>
            {props.category_title}
            </h3>
            </TableRowColumn>
            <TableRowColumn>
            <h3>
            <a href={"recipe/"+props.recipe_id}>{props.recipe_title}</a>
             </h3>
            </TableRowColumn>
            <TableRowColumn>
            <h3>
            {props.recipe_description}
            </h3>
            </TableRowColumn>
            <TableRowColumn>
                <EditRecipes 
                id={props.recipe_id} 
                recipe_title={props.recipe_title} 
                recipe_description={props.recipe_description}
                />
            </TableRowColumn>
            <TableRowColumn>
                <DeleteRecipe id={props.recipe_id} />
            </TableRowColumn>
        </TableRow>
    )}

export default Recipe   ;