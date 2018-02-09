import React, { Component }  from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
// import './styling.css';
import style from './styling';
import {notify} from 'react-notify-toast';
import baseUrl from'./config';


class Login extends Component { 
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  } 

  handleLoginClick(e){
    e.preventDefault();
    const LoginUrl='login';
    axios.post(baseUrl+LoginUrl, {
        username: this.state.username,
        password: this.state.password
    })
    .then(response => {
        if (response.data.token){
            localStorage.setItem("token",response.data.token);
            notify.show('You have logged in!','success');
            this.props.history.push('/yummyrecipes/dashboard');
        }
        }).catch(error => {
          notify.show('Unsuccessful Login', 'error');
         
        });
    }
  handleLoginChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }
  render() { 
    return (
      <div className="Login">
        <div className = "center">
          <Paper style={style} zDepth={3} >
            <div className = "inner">
                    <h1 className = "text">Welcome To Yummy Recipes</h1>
                <form onSubmit={this.handleLoginClick}>
                <TextField
                    hintText=" Enter your Username"
                    floatingLabelText="Username"
                    name="username"
                    value={this.state.username}
                    onChange = {this.handleLoginChange}
                    /><br />
                <TextField
                    hintText=" Enter your Password"
                    floatingLabelText="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange = {this.handleLoginChange}
                    /><br />
                <RaisedButton type ="submit" label ="Login" primary={true} style={style} />
                    <h2 className = "text">Not yet Registed?</h2>
                <RaisedButton label="Register" href="/" primary={true} style={style} /> 
                </form>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Login;
