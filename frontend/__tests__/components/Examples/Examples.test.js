import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Examples from '../../../components/Examples/Examples';

describe('Examples', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<Examples {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
