import React, { Component } from 'react';
import axios from 'axios';
import {
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
  } from 'material-ui/Table';
import Recipe from './Recipe'
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import baseUrl from './config';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';




  class ViewRecipes extends Component {
    constructor(props){
        super(props);
        this.state = {
          recipes:[],
          limit:5,
          page:1,
          count:0,
          lastPage:1,
          q:''
          
        }
        this.handleSearchRec = this.handleSearchRec.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    
      }


    handleNext(){
        console.log(this.state.page)
        console.log(this.state.count)
        let calc = (this.state.count/this.state.limit)
        let lastPage=Math.ceil(calc)
        console.log(lastPage)
        this.setState({lastPage:lastPage});
        let PageNum=this.state.page + 1
        if (PageNum<=lastPage){
            this.setState({page:PageNum})
            this.getRecipes(this.state.page)
        }else{
            this.setState({page:lastPage});
            this.getRecipes(this.state.page)
        }
        
        }
    handlePrev(){
        console.log(this.state.page)
        console.log(this.state.count)
        let calc = (this.state.count/this.state.limit)
        let lastPage=Math.ceil(calc)
        console.log(lastPage)
        this.setState({lastPage:lastPage});
        let PageNum = this.state.page - 1
        if (PageNum <= 0){
            let PageNum =1
            this.setState({page:PageNum})
            this.getRecipes(this.state.page)
        }else{
           this.setState({page:PageNum})
           this.getRecipes(this.state.page)
        }
    }
    
    getRecipes(){
        let viewRecipesUrl= baseUrl+'recipes?limit='+this.state.limit+'&page='+this.state.page+'&q='+this.state.q

        axios.get(viewRecipesUrl,
            {headers: {'x-access-token': localStorage.getItem('token')}} 
        ).then(response => {
          this.setState({count:response.data.recipes[0].count});
          let calc = (this.state.count/this.state.limit)
          let lastPage=Math.ceil(calc)
          this.setState({lastPage:lastPage});
            console.log(response.data)
          this.setState({recipes:response.data.recipes})
        })
        .catch(error => {
          console.log(error.response)
        })

    }
    componentDidMount(){
        this.getRecipes();   
      }

    handleSearchRec(e){
        if (e.target.value) {
            let SearchRecUrl = baseUrl+'recipes?q='+e.target.value+'&limit='+this.state.limit+'&page='+this.state.page
            this.setState({page:1,q:e.target.value})
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
                this.setState({categories:[]})
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
                <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Category Title</TableHeaderColumn>
                            <TableHeaderColumn>Recipe Title</TableHeaderColumn>
                            <TableHeaderColumn>Recipe Description</TableHeaderColumn>
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
                        <p className="pad1">{this.state.page} of {this.state.lastPage}</p>
                        </Card>
                    </div>
                    :<div></div>}
            </Card>
        )
    }
}

export default ViewRecipes ;