import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter()});

jest.mock('react-redux');

describe("<BurgerBuilder without ingredient />",() => {
  
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder/>);
  });

  it('should render <Spinner /> if no ingredient are provided', () => {
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});
