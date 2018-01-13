import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './styling.css';

const style = {
    margin: 12,
  };

class Login extends Component { 
  render() {
    return (
      <div className="Login">
        <div>
            <h1 class = "text">Welcome To Yummy Recipes</h1>
            
            <TextField
                hintText="Username"
                floatingLabelText="Username"
                type="username"
                /><br />
            <TextField
                hintText="Password Field"
                floatingLabelText="Password"
                type="password"
                /><br />
            <RaisedButton label="Submit" primary={true} style={style} />
        </div>

      </div>
    );
  }
}

export default Login;
