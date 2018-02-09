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



class CategoryDisplay extends Component {
    constructor(props){
        super(props)
        let categoryId = this.props.match.params.id
        console.log(categoryId)
        this.state = {
            category:[],
            categoryId:categoryId,
        }
        this.handleChangeCat = this.handleChangeCat.bind(this);
        this.handleChangeRec = this.handleChangeRec.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    getCategory(){
        let viewACategoryUrl= 'http://127.0.0.1:5000/category/'+this.state.categoryId

        axios.get(viewACategoryUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => {
          console.log(response);
          this.setState({category:response.data})
          console.log(this.state.category);
        })
        .catch(error => {
          console.log(error)
        })
    }
    componentWillMount(){
        console.log('I got here')
        this.getCategory();
    }
    handleChangeCat(e){
        this.props.history.push('/yummyrecipes/dashboard')
        
    }
    handleChangeRec(e){
        this.props.history.push('/yummyrecipes/recipes')
        }
    handleLogOut(e){
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
                        <CardTitle title={this.state.category.category_title} subtitle={this.state.category.Category_date_stamp} />
                        <CardText>
                        {this.state.category.category_description}
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

export default CategoryDisplay ;