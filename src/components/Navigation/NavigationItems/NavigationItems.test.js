import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
    //This function will automatically be executed before each of your test. 
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    //This function describes or allows you to write one individual test
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    }); 

    it('should render three <NavigationItem /> elements if authenticated', () => {
        //With setProps, we can set any props we want
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render two <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link='/logout' >Logout</NavigationItem>)).toEqual(true);
    });
});