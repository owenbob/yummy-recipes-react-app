import React, { Component }  from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';

import style from './styling';
import {notify} from 'react-notify-toast';
import baseUrl from'./config';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


class Login extends Component { 
  constructor(props){
    super(props);

    //Set initial state  of username and password to empty strings
    this.state={
      username:'',
      password:''
    };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  } 
  //handleLoginClick to to make API call by posting username and password in the state.
  handleLoginClick(e){
    e.preventDefault();
    const LoginUrl='login';
    axios.post(baseUrl+LoginUrl, {
        username: this.state.username,
        password: this.state.password
    })
      //If the API call is a success then obtain a token and store it in local storage
      //notify user is loggedin and redirect to dashboard
    .then(response => {
        if (response.data.token){
            localStorage.setItem("token",response.data.token);
            notify.show('You have logged in!','success');
            this.props.history.push('/yummyrecipes/dashboard');
        }
        //If the API is a fail,then check for the message and respond accordingly
        }).catch(error => {
          if(error.response.data ==='2.Could not verify because provided details are not for user'){
            notify.show('Oops,this User does not exist', 'error');
          }
          if(error.response.data==='1.Could not verify'){
            notify.show('Invalid password or  username', 'error');
          }  
        });
    }

    // handleLoginChange set the state of values input in the text fields according to name of the 
        // textfield ie username,email and password 
  handleLoginChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

 //Initail method that runs when the component is mounted.
  componentWillMount() {
    // custom rule will have name 'isString'
    ValidatorForm.addValidationRule('isString', (value) => {
        let newValue = Number(value);
        if (typeof value === 'string' && newValue != value) {
            return true;
        }
        return false;
    });

  }

//Render method that render items on UI
  render() { 
    return (
      <div className="Login">
        <div className = "center">
          <Card>
            <div className = "inner">

                    <h1 className = "text">Welcome To Yummy Recipes</h1>

                    {/* Material UI component for form validation,useful 
                for validating  input in in text field */}
                <ValidatorForm onSubmit={this.handleLoginClick}>

                {/* Materail Ui compnent for a texfield. Textfield to handle Username */}
                <TextValidator
                    hintText=" Enter your Username"
                    floatingLabelText="Username"
                    name="username"
                    value={this.state.username}
                    onChange = {this.handleLoginChange}
                    validators={[ 'required','isString']}
                    errorMessages={['this field is required','Username cannot only be numbers',]}
                    /><br />
                  {/* Materail Ui component for a texfield. Textfield to handle Password */}
                <TextValidator
                    hintText=" Enter your Password"
                    floatingLabelText="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange = {this.handleLoginChange}
                    validators={[ 'required']}
                    errorMessages={['this field is required']}
                    /><br />

                    {/* Materail UI component for a Button. Textfield to handle Login */}
                <RaisedButton type ="submit" label ="Login" primary={true} style={style} />
                    <h2 className = "text">Not yet Registed?</h2>

                    {/* Materail UI component for a Button. Textfield to redirect to Register */}
                <RaisedButton label="Register" href="/" primary={true} style={style} /> 
                </ValidatorForm>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
