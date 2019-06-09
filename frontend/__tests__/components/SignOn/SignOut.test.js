import React from 'react';
import { shallow } from 'enzyme';
import SignOut from '../../../components/SignOn/SignOut/SignOut';

describe('SignOut', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<SignOut {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
