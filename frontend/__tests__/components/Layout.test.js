import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../components/Layout/Layout';

describe('Layout', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = { children: [] };
    wrapper = shallow(<Layout {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
