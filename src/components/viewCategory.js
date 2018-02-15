import React, { Component } from 'react';
import EditCategory from './editCategory';
import DeleteCategory from './deleteCategory';
import Categories from './Category';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import {notify} from 'react-notify-toast';
import baseUrl from './config';



  class ViewCategory extends Component {
    constructor(props){
        super(props);
        // declare state for ,categories,page,limit,count and last page
        this.state = {
          categories:[],
          page:1,
          limit:5,
          count:0,
          lastPage:null,
          q:''

        }
        this.handleSearchCat = this.handleSearchCat.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
      }

    //handleNext method to cater for next page of paginated recipes
    handleNext(){
        
        let calc = (this.state.count/this.state.limit)
        let lastPage=Math.ceil(calc)
        this.setState({lastPage:lastPage});
        let PageNum=this.state.page + 1
        if (PageNum<=lastPage){
            this.setState({page:PageNum})
            this.getCategories(this.state.page)
        }else{
            this.setState({page:lastPage});
            this.getCategories(this.state.page)
        }
        
        
        }
    //handlePrev method to handle previous page
    handlePrev(){
        
        let calc = (this.state.count/this.state.limit)
        let lastPage=Math.ceil(calc)
        this.setState({lastPage:lastPage});
        let PageNum = this.state.page - 1
        if (PageNum <= 0){
            let PageNum =1
            this.setState({page:PageNum})
            this.getCategories(this.state.page)
        }else{
           this.setState({page:PageNum})
        this.getCategories(this.state.page)
        }
        
    }
    
    getCategories(){

        let viewCategoryUrl= baseUrl+'categories?limit='+this.state.limit+'&page='+this.state.page+'&q='+this.state.q
        

        axios.get(viewCategoryUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => { 
        this.setState({count:response.data.Categories[0].count});  
          let calc = (this.state.count/this.state.limit)
          let lastPage=Math.ceil(calc)
          this.setState({lastPage:lastPage});

          this.setState({categories:response.data.Categories})
        })
        .catch(error => {
            console.log(error.response.data.Message);
            if(error.response.data.Message ==='404-Page Not Found'){
                notify.show('This is the END!','success');
            }
            
        })
    }
    componentWillMount(){
        this.getCategories();   
      }
    handleSearchCat(e){
        if (e.target.value) {

            let SearchCatUrl = baseUrl+'categories?q='+e.target.value+'&limit='+this.state.limit+'&page='+this.state.page
            this.setState({page:1,q:e.target.value})
            axios.get(SearchCatUrl,
                {headers: {'x-access-token': localStorage.getItem('token')}} 
            ).then(response => {
                
                this.setState({count:response.data.Categories[0].count});
                let calc = (this.state.count/this.state.limit)
                let lastPage=Math.ceil(calc)
                this.setState({lastPage:lastPage});
                this.categories=response.data.Categories
                let categories= this.state.categories
                categories = this.categories
                this.setState({categories})

            })
            .catch(error => {
                console.log(error)
                this.setState({categories:[]})
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
                <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Category Title</TableHeaderColumn>
                            <TableHeaderColumn>Category Description</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
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
                {this.state.count>this.state.limit?
                    <div>
                        <Card className="center1">
                            <FloatingActionButton className="pad" 
                                                mini={true} 
                                                secondary={true}
                                                onClick ={this.handlePrev}

                            >
                                    <ArrowBack />
                                </FloatingActionButton>
                                <FloatingActionButton className="pad" 
                                                    mini={true} 
                                                    secondary={true}
                                                    onClick ={this.handleNext} 
                                >
                                    <ArrowForward />
                            </FloatingActionButton>
                        <p className="pad1">{this.state.page} of {this.state.lastPage+1}</p>
                        </Card>
                    </div>
                    :<div></div>}
                </Card>
                
        )
    }
}

export default ViewCategory ;