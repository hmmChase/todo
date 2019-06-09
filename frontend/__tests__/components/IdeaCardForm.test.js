import React from 'react';
import { shallow } from 'enzyme';
import IdeaCardForm from '../../components/IdeaCardForm/IdeaCardForm';

describe('IdeaCardForm', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<IdeaCardForm {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
