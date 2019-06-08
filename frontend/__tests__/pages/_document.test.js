import React from 'react';
import { shallow } from 'enzyme';
import MyDocument from '../../pages/_document';

describe('_document', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<MyDocument {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('is defined', () => {
    expect(wrapper).toBeDefined();
  });
});
