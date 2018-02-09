import React from 'react';
import ReactDOM from 'react-dom';
import { render,  configure,shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import expect from "expect";
import Adapter from 'enzyme-adapter-react-16';
import Header from '../components/header';


 configure({ adapter: new Adapter() });


describe('Header', () => {
    it('matches  snapshot', () => {
            const header = shallow(<Header />);
           expect(shallowToJson(header)).toMatchSnapshot();
        });
    
})