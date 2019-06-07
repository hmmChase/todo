import React from 'react';
import { shallow } from 'enzyme';
import PopUpSignUp from '../../../components/SignOn/PopUpSignUp/PopUpSignUp';

describe('PopUpSignUp', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<PopUpSignUp {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
