import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import './styling.css';
import style from './styling';




class Register extends Component {
    constructor(props){
        super(props);
        this.state={
          username:'',
          email:'',
          password:''
        };
        this.handleChange = this.handleChange.bind(this);
      } 

    handleClick = (e) =>{
        e.preventDefault();
        const registerUrl='http://127.0.0.1:5000/register';
        axios.post(registerUrl, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            console.log(response);
            if (response.status === 201){
                this.props.history.push('/login')   
            }
            }).catch(error=> {
                console.log(error)
            });
        }

    handleChange=(e)=>{
        this.setState({ [e.target.name] : e.target.value });
    }
  render() {
    return (    
    <div className="Register" >
        <div className ="center">
            <Paper style={style} zDepth={3} >
                <div className ="inner">
                    <h1 className = "text" >Welcome To Yummy Recipes</h1>
                    <form   onSubmit={this.handleClick}>
                        <TextField
                            hintText="Enter your username"
                            floatingLabelText="Username"
                            name="username"
                            value={this.state.username}
                            onChange = {this.handleChange}
                            /><br />
                        <TextField
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            name="email"
                            value={this.state.email}
                            onChange = {this.handleChange}
                            /><br />
                        <TextField
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange ={this.handleChange}
                            /><br />
                        <RaisedButton  type="submit"label="Submit" primary={true} style={style}
                        />
                    </form>
                    <br/>
                    <h2 className ="text"> Already registered?</h2>
                    <RaisedButton label="Login" href="/login" primary={true} style={style}/>
                </div>
            </Paper>    
        </div>
    </div>
    );
  }
}

export default Register;
