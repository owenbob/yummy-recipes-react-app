import React, { Component }  from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import './styling.css';
import style from './styling';


class Login extends Component { 
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    };
  } 

  handleLoginClick = (e) =>{
    e.preventDefault();
    const LoginUrl='http://127.0.0.1:5000/login';
    axios.post(LoginUrl, {
        username: this.state.username,
        password: this.state.password
    })
    .then(response => {
        console.log(response);
        if (response.data.token){
            localStorage.setItem("token",response.data.token);
            this.props.history.push('/yummyrecipes/dashboard');
        }
        }).catch(error => {
            console.log(error)
        });
    }
  handleLoginChange=(e) => {
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
