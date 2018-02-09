import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-16';
import Login from '../components/login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


 configure({ adapter: new Adapter() });


describe('Login', () => {
    it('matches  snapshot', () => {
            const header = shallow(<Login />);
           expect(shallowToJson(header)).toMatchSnapshot();
        });

    it('renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(
                <MuiThemeProvider>
                <Login />
                </MuiThemeProvider>, div);
        });
    
})