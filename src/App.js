import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DefaultUI  from './components/materialUI';
import Register from './components/register';
import Login from './components/login';
import Paper from 'material-ui/Paper';
//import './mystyles.css';

import './App.css';

const style = {
  height: 500,
  width: 1125,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class App extends Component {
  render() {
    return (
      <div class="center">
      <MuiThemeProvider>
        <DefaultUI />
        <div class="center">
          <Paper style={style} zDepth={3} >< Register/>  </Paper>
        </div> 
        {/* <div class="center">
          <Paper style={style} zDepth={3} >< Login/>  </Paper>
        </div> */}
          
      </MuiThemeProvider>
      </div>
      
    );
  }
}

export default App;
