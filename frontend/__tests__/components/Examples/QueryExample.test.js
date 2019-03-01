import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import QueryExample, { USERS_QUERY } from '../../../components/Examples/QueryExample';

describe('QueryExample', () => {
  let mockProps;
  let mockQueries;
  let mockMutations;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    mockQueries = [
      {
        request: { query: USERS_QUERY },
        result: {
          data: {
            users: [{ id: '1', item: 'mock item' }]
          }
        }
      }
    ];
    mockMutations = [];
    wrapper = shallow(
      <MockedProvider mocks={[...mockQueries, ...mockMutations]}>
        <QueryExample {...mockProps} />
      </MockedProvider>
    );
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
