import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../../components/Nav/Nav';

describe('Nav', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    wrapper = shallow(<Nav {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
