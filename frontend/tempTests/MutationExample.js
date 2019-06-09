/* eslint-disable */

import React from 'react';
import { mount } from 'enzyme';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import { load } from '../utils/load';
import * as mock from '../__mocks__/mocks';
import MutationExample, {
  CREATE_USER_MUTATION
} from '../../../components/Examples/MutationExample';
import { USERS_QUERY } from '../../../components/Examples/QueryExample';

describe('MutationExample', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [
      {
        request: {
          query: CREATE_USER_MUTATION,
          variables: { name: mock.user.name }
        },
        result: {
          data: {
            createUser: {
              id: mock.user.id,
              name: mock.user.name
            }
          }
        }
      },
      {
        request: { query: USERS_QUERY },
        result: {
          data: {
            users: mock.users
          }
        }
      }
    ];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <MutationExample {...mockProps} />
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('matches snapshot', () => {
    const mutationExample = wrapper.find('MutationExample');
    expect(mutationExample).toMatchSnapshot();
  });

  it('matches snapshot while mutation loading', async () => {
    wrapper
      .find('input')
      .simulate('change', { target: { value: mock.user.name } });
    wrapper.find('form').simulate('submit');

    expect(wrapper.text()).toContain('Loading...');

    const mutationExample = wrapper.find('MutationExample');
    expect(mutationExample).toMatchSnapshot();
  });

  fit('matches snapshot after mutation completes', async () => {
    wrapper
      .find('input')
      .simulate('change', { target: { value: mock.user.name } });
    wrapper.find('form').simulate('submit');

    await load(wrapper);

    expect(wrapper.text()).not.toContain('Loading...');

    const mutationExample = wrapper.find('MutationExample');
    expect(mutationExample).toMatchSnapshot();
  });

  it('updates state on form submit', async () => {
    const component = wrapper.find('MutationExample').instance();

    expect(component.state.name).toEqual('');

    wrapper
      .find('input')
      .simulate('change', { target: { value: mock.user.name } });
    wrapper.find('form').simulate('submit');

    expect(component.state.name).toEqual(mock.user.name);
  });

  xit('refetches updated data', async () => {
    let apolloClient;

    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <MutationExample {...mockProps} />;
          }}
        </ApolloConsumer>
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );

    const users = await apolloClient.query({ query: USERS_QUERY });

    expect(users.data.users).toEqual(mock.users);
  });

  xit('matches snapshot on error', async () => {
    mockQueries = [
      {
        request: {
          query: CREATE_USER_MUTATION,
          variables: { name: mock.user.name }
        },
        result: {
          data: {
            createUser: {
              id: mock.user.id,
              name: mock.user.name
            }
          }
          // GraphQL error
          // errors: [{ message: 'Error!' }]
        }
        // Network error
        // error: Error('aw shucks')
      },
      {
        request: { query: USERS_QUERY },
        result: {
          data: {
            users: [mock.user]
          }
        }
      }
    ];

    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <MutationExample {...mockProps} />
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );

    // console.log('debug1: ', wrapper.debug());

    wrapper
      .find('input')
      .simulate('change', { target: { value: mock.user.name } });
    wrapper.find('form').simulate('submit');

    // console.log('debug2: ', wrapper.debug());

    // await new Promise(resolve => setTimeout(resolve, 1000));
    // wrapper.update();

    // console.log('debug3: ', wrapper.debug());

    // expect(wrapper.text()).toContain('Error');

    // const mutationExample = wrapper.find('MutationExample');
    // expect((mutationExample)).toMatchSnapshot();
  });
});
