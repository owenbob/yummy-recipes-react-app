import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-16';
import DashboardRecipes from '../components/dashboardRecipes';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// configure({ adapter: new Adapter() });

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<DashboardRecipes {...props} />);
};


describe('DashboardRecipes', () => {
    const props ={
        history:{
            push: () => {}
        }
    }
    it('matches  snapshot', () => {
            const dashboardRecipes = setUp;
           expect(shallowToJson(dashboardRecipes)).toMatchSnapshot();
        });

    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <DashboardRecipes {...props} />
            </MuiThemeProvider>, div);
    });
    
})