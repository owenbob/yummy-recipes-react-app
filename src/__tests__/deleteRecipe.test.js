import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-16';
import DeleteRecipe from '../components/deleteRecipe';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<DeleteRecipe {...props} />);
};


describe('Createcategory', () => {
    it('matches  snapshot', () => {
            const deleteRecipe = setUp;
           expect(shallowToJson(deleteRecipe)).toMatchSnapshot();
        });

    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <DeleteRecipe />
            </MuiThemeProvider>, div);
    });
    
})