import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-16';
import ViewCategory from '../components/viewCategory';
import LocalStorageMock from '../setupTests';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



configure({ adapter: new Adapter() });

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<ViewCategory {...props} />);
};


describe('ViewCategory', () => {
    it('matches  snapshot', () => {
            const viewCategory = setUp;
           expect(shallowToJson(viewCategory)).toMatchSnapshot();
        });
    
    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <ViewCategory />
            </MuiThemeProvider>, div);
    });
    
})