import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../components/Layout/Layout';

describe('round', () => {
  let mockProps;
  let layout;

  beforeEach(() => {
    mockProps = { children: [] };
    layout = shallow(<Layout {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(layout).toMatchSnapshot();
  });
});
