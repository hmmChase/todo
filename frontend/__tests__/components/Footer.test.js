import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer/Footer';

describe('round', () => {
  let mockProps;
  let footer;

  beforeEach(() => {
    mockProps = {};
    footer = shallow(<Footer {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(footer).toMatchSnapshot();
  });
});
