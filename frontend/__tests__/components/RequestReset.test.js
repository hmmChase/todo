import React from 'react';
import { shallow } from 'enzyme';
import RequestReset from '../../components/RequestReset/RequestReset';

describe('RequestReset', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<RequestReset {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
