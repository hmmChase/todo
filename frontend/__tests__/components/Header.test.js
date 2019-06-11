import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import Home from '../../components/Home/Home';

describe('Home', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <Home {...mockProps} />
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('matches snapshot', () => {
    const wrapSnap = wrapper.find({ snapshot: 'Home' });

    expect(wrapSnap.text()).toContain('Loading...');
    expect(wrapSnap).toMatchSnapshot();
  });
});
