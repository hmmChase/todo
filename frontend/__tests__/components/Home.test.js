import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home/Home';

describe('Home', () => {
  let mockProps;
  let home;

  beforeEach(() => {
    mockProps = {};
    home = shallow(<Home {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(home).toMatchSnapshot();
  });
});
