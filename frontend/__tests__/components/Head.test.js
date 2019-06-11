import React from 'react';
import { shallow } from 'enzyme';
import Head from '../../components/Head/Head';

describe('Head', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { title: 'test' };
    wrapper = shallow(<Head {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    const wrapSnap = wrapper.find({ snapshot: 'Head' });

    expect(wrapSnap).toMatchSnapshot();
  });
});
