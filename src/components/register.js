import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import './styling.css';


const style = {
    margin: 12,
  };

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
        
        // console.log("values",this.state.username,this.state.email,this.state.password);
        console.log("Reguster \\")
         const registerUrl='http://127.0.0.1:5000/register';
        // let self = this;
        // let payload={
        // "username": this.state.username,
        // "email":this.state.email,
        // "password":this.state.password
        // };
        console.log("here")
        // console.log(this.state.username)
        axios.post(registerUrl, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            console.log(response);
            }).catch(error=> {
                console.log(error)
            });
        }

    handleChange=(e)=>{
        this.setState({ [e.target.name] : e.target.value });
    }
      

  render() {
    return (
      <div className="Register">
        <div>
            <h1 class = "text">Welcome To Yummy Recipes</h1>
            <form onSubmit={this.handleClick}>
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
                <RaisedButton type="submit"label="Submit" primary={true} style={style}
                 />
            </form>
            <br/>
            
            <h2 class ="text"> Already registered?</h2>
            <RaisedButton label="Login" primary={true} style={style} 
            
            />
        </div>

      </div>
    );
  }
}

export default Register;
