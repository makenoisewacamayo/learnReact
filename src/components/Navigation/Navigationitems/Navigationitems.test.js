import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './Navigationitems';
import NavitagionItem from './Navigationitem/Navigationitem';

configure({ adapter: new Adapter()});

describe('<NavigationItems />',()=>{

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> if not authenticated', () =>{
    expect(wrapper.find(NavitagionItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> if is authenticated', () =>{
    wrapper.setProps({ isAuthenticated: true});
    expect(wrapper.find(NavitagionItem)).toHaveLength(3);
  });

  it('should have <NavigationItem>Logout</NavigationItem> if is authenticated', () =>{
    wrapper.setProps({ isAuthenticated: true});
    expect(wrapper.contains(<NavitagionItem link="/logout">Logout</NavitagionItem>)).toEqual(true);
  });

});