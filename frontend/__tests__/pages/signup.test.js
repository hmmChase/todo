import React from 'react';
import { shallow } from 'enzyme';
import SignUpPage from '../../pages/signup';

describe('SignUpPage', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { children: [] };
    wrapper = shallow(<SignUpPage {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
