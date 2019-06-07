import React from 'react';
import { shallow } from 'enzyme';
import PopUps from '../../../components/SignOn/PopUps/PopUps';

describe('PopUps', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<PopUps {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
