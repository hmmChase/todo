import React from 'react';
import { shallow } from 'enzyme';
import SignInPage from '../../pages/signin';

describe('SignInPage', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { children: [] };
    wrapper = shallow(<SignInPage {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
