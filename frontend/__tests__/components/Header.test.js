import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header/Header';

describe('round', () => {
  let mockProps;
  let header;

  beforeEach(() => {
    mockProps = {};
    header = shallow(<Header {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(header).toMatchSnapshot();
  });
});
