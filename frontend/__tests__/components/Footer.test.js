import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer/Footer';

describe('Footer', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<Footer {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    const wrapSnap = wrapper.find({ snapshot: 'Footer' });

    expect(wrapSnap.text()).toContain('Footer');
    expect(wrapSnap).toMatchSnapshot();
  });
});
