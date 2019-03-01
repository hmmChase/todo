import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header/Header';

describe('Header', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = { children: [] };
    wrapper = shallow(<Header {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
