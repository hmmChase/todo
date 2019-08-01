import React from 'react';
import { mount } from 'enzyme';
import SignOn from '../../../components/SignOn/SignOn';

describe('SignOn', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = mount(<SignOn {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});