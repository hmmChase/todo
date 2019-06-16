import React from 'react';
import { shallow } from 'enzyme';
import DisplayLoading from '../../components/DisplayLoading/DisplayLoading';

describe('DisplayLoading', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<DisplayLoading {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper.text()).toContain('Loading ...');
    expect(wrapper).toMatchSnapshot();
  });
});
