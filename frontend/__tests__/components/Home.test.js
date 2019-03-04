import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home/Home';

describe('Home', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<Home {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
