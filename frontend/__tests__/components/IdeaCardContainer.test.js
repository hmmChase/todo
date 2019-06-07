import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line max-len
import IdeaCardContainer from '../../components/IdeaCardContainer/IdeaCardContainer';

describe('IdeaCardContainer', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<IdeaCardContainer {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
