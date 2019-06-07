import React from 'react';
import { shallow } from 'enzyme';
import IdeaCard from '../../components/IdeaCard/IdeaCard';

describe('IdeaCard', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<IdeaCard {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
