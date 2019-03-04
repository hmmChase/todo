import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../../components/Nav/Nav';

describe('Nav', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<Nav {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
