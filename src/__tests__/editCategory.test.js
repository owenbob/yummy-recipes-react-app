import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-16';
import EditCategory from '../components/editCategory';
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
    return shallow(<EditCategory {...props} />);
};


describe('Createcategory', () => {
    it('matches  snapshot', () => {
            const editCategory = setUp;
           expect(shallowToJson(editCategory)).toMatchSnapshot();
        });

    it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <EditCategory />
            </MuiThemeProvider>, div);
    });
    
})