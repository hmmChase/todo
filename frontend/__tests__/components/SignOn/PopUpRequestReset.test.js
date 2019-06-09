import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line max-len
import PopUpRequestReset from '../../../components/SignOn/PopUpRequestReset/PopUpRequestReset';

describe('PopUpRequestReset', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<PopUpRequestReset {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
