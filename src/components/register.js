import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import axios from 'axios';
import style from './styling';
import Notifications, {notify} from 'react-notify-toast';
import baseUrl from './config';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';



class Register extends Component {
    constructor(props){
        super(props);

        //Set initial state  of username,email and password to empty strings
        this.state={
          username:'',
          email:'',
          password:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
      } 

    handleClick(e){
        //handleclick to to make API call by posting username,email and password in the state.
        e.preventDefault();
        const registerUrl= baseUrl+'register';
        axios.post(registerUrl, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            //If the API call is a success then notify user is registered
            if (response.status === 201){
                notify.show('You have been registered!','success');
                this.props.history.push('/login')       
            }

            //If the API is a fail,then check for the message and respond accordingly
            }).catch(error=> {
               
                if (error.response.data.message==='Please ensure you have not input special characters'){
                    notify.show('Please ensure you have not input special characters!','error');
                }
                if (error.response.data.message==='This email has already been used to register'){
                    notify.show('This email has already been used to register!','error');
                }
                notify.show('Your Registration was unsuccessful!','error');
                
            });
        }

        // handleChange set the state of values input in the text fields according to name of the 
        // textfield ie username,email and password 
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
        //Initial method that runs when the component is mounted.
    componentWillMount() {
        // custom rule will have name 'isText'
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
    <div className="Register" >
        <div className ="center">
            <Card >
                <div className ="inner">
                    <h1 className = "text" >Welcome To Yummy Recipes</h1>

                {/* Material UI component for form validation,useful 
                for validating  input in in text field */}
                    <ValidatorForm   onSubmit={this.handleClick}>
                    {/* Materail Ui component for a texfield. Textfield to handle Username input */}
                        <TextValidator
                            hintText="Enter your username"
                            floatingLabelText="Username"
                            name="username"
                            value={this.state.username}
                            onChange = {this.handleChange}
                            validators={[ 'required','isString']}
                            errorMessages={['this field is required','Username cannot only be numbers']}
                            /><br />

                        {/* Materail Ui component for a texfield. Textfield to handle Email input */}
                        <TextValidator
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            name="email"
                            value={this.state.email}
                            onChange = {this.handleChange}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                            /><br />
                            {/* Materail Ui component for a texfield. Textfield to handle Password input */}
                        <TextValidator
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange ={this.handleChange}
                            validators={[ 'required']}
                            errorMessages={['this field is required']}
                            /><br />
                        {/* Materail Ui component for a Button. Textfield to redirect to Register */}
                        <RaisedButton  type="submit"label="Submit" primary={true} style={style}
                        />
                    </ValidatorForm>
                    <br/>
                    <h2 className ="text"> Already registered?</h2>
                    {/* Materail Ui component for a Button. Textfield to redirect to Login */}
                    <RaisedButton label="Login" href="/login" primary={true} style={style}/>
                </div>
            </Card>    
        </div>
    </div>
    );
  }
}

export default Register;
