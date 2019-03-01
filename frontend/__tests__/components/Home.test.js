import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home/Home';

describe('Home', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    wrapper = shallow(<Home {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
