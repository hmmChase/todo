import React from 'react';
import { shallow } from 'enzyme';
import IndexPage from '../../pages/index';

describe('IndexPage', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<IndexPage {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
