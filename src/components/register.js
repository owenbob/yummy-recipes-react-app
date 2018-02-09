import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import axios from 'axios';
import style from './styling';
import Notifications, {notify} from 'react-notify-toast';
import baseUrl from './config';



class Register extends Component {
    constructor(props){
        super(props);
        this.state={
          username:'',
          email:'',
          password:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
      } 

    handleClick(e){
        e.preventDefault();
        const registerUrl= baseUrl+'register';
        axios.post(registerUrl, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            console.log(response);
            if (response.status === 201){
                notify.show('You have been registered!','success');
                this.props.history.push('/login')
                
                  
            }
            }).catch(error=> {
                notify.show('Your Registration was unsuccessful!','error');
            });
        }

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
  render() {
    return (    
    <div className="Register" >
        <div className ="center">
            <Card >
                <div className ="inner">
                    <h1 className = "text" >Welcome To Yummy Recipes</h1>
                    <Notifications />
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
            </Card>    
        </div>
    </div>
    );
  }
}

export default Register;
