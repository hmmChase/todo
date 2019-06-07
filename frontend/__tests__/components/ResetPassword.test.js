import React from 'react';
import { shallow } from 'enzyme';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

describe('ResetPassword', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<ResetPassword {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
