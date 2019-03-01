import React from 'react';
import { shallow } from 'enzyme';
import Examples from '../../../components/Examples/Examples';

describe('Examples', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    wrapper = shallow(<Examples {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
