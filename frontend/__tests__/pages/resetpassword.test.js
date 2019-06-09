import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordPage from '../../pages/resetpassword';

describe('ResetPasswordPage', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { children: [] };
    wrapper = shallow(<ResetPasswordPage {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
