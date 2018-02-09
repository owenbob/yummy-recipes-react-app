import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-16';
import CreateRecipe from '../components/createRecipe';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<CreateRecipe {...props} />);
};


describe('CreateRecipe', () => {
    it('matches  snapshot', () => {
            const createRecipe = setUp;
           expect(shallowToJson(createRecipe)).toMatchSnapshot();
        });

    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <CreateRecipe />
            </MuiThemeProvider>, div);
    });
    
})