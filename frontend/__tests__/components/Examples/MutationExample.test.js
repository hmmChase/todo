import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import MutationExample from '../../../components/Examples/MutationExample';

describe('MutationExample', () => {
  let mockProps;
  let mockQueries;
  let mockMutations;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [];
    mockMutations = [];
    wrapper = shallow(
      <MockedProvider mocks={(mockQueries, mockMutations)}>
        <MutationExample {...mockProps} />
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
