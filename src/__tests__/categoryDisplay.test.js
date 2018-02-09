import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-16';
import CategoryDisplay from '../components/categoryDisplay';
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
    return shallow(<CategoryDisplay {...props} />);
};


describe('CategoryDisplay', () => {
    const props = {
        match
    };
    it('matches  snapshot', () => {
            const categoryDisplay = <CategoryDisplay/>;
           expect(shallowToJson(categoryDisplay)).toMatchSnapshot();
        });

        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <MuiThemeProvider>
            <CategoryDisplay {...props}/>
            </MuiThemeProvider>, div);
    });
    
})