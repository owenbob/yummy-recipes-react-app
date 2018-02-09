import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-16';
import EditRecipes from '../components/editRecipe';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<EditRecipes {...props} />);
};


describe('EditRecipe', () => {
    it('matches  snapshot', () => {
            const editRecipe = setUp;
           expect(shallowToJson(editRecipe)).toMatchSnapshot();
        });

        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <EditRecipes />
            </MuiThemeProvider>, div);
    });
        
    
})