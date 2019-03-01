import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import MutationExample from '../../../components/Examples/MutationExample';

describe('MutationExample', () => {
  let mockProps;
  let mockQueries;
  let mockMutations;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    mockQueries = [];
    mockMutations = [];
    wrapper = shallow(
      <MockedProvider mocks={(mockQueries, mockMutations)}>
        <MutationExample {...mockProps} />
      </MockedProvider>
    );
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
