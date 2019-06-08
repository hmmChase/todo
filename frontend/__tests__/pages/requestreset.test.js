import React from 'react';
import { shallow } from 'enzyme';
import RequestResetPage from '../../pages/requestreset';

describe('RequestResetPage', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { children: [] };
    wrapper = shallow(<RequestResetPage {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
