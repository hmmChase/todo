import React from 'react';
import { shallow } from 'enzyme';
import PopUpSignIn from '../../../components/SignOn/PopUpSignIn/PopUpSignIn';

describe('PopUpSignIn', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<PopUpSignIn {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
