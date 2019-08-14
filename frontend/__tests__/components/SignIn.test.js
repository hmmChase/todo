import { shallow, mount } from 'enzyme';
import { ApolloConsumer } from '@apollo/react-components';
import { MockedProvider } from '@apollo/react-testing';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import SignIn from '../../components/SignIn/SignIn';
import * as query from '../../__mocks__/queries/user';
import resolvers from '../../graphql/resolvers';
import { load } from '../../utils/testing';

describe('SignIn', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    mockQueries = [query.MOCK_SIGN_IN_MUTATION];
    wrapper = shallow(<SignIn {...mockProps} />, {
      disableLifecycleMethods: true,
      wrappingComponent: MockedProvider,
      wrappingComponentProps: { mocks: mockQueries, addTypename: false }
    });
  });

  afterEach(() => jest.resetAllMocks());

  it('renders correctly', () => {
    const wrapperDive = wrapper
      .dive()
      .dive()
      .dive();

    expect(wrapperDive).toMatchSnapshot();
  });

  xit('fires signIn and updates cache after done', async () => {
    let apolloClient;

    const cache = new InMemoryCache();

    wrapper = mount(
      <ApolloConsumer>
        {client => {
          apolloClient = client;
          return <SignIn {...mockProps} />;
        }}
      </ApolloConsumer>,
      {
        disableLifecycleMethods: true,
        wrappingComponent: MockedProvider,
        wrappingComponentProps: {
          addTypename: false,
          mocks: mockQueries,
          cache,
          resolvers
        }
      }
    );

    load(wrapper);

    const email = wrapper.find('input[name="email"]');
    email.simulate('change', {
      target: { name: 'email', value: 'mock@email.com' }
    });

    const password = wrapper.find('input[name="password"]');
    password.simulate('change', {
      target: { name: 'password', value: 'mockpass' }
    });

    load(wrapper);

    console.log(wrapper.debug());

    console.log(wrapper.find('SignIn').state());

    cache.writeData({ data: { isLoggedIn: false } });

    const form = wrapper.find('form');
    console.log(': form', form.debug());

    await form.prop('onSubmit')({ preventDefault: jest.fn() });

    // await load(wrapper, 100);

    // console.log('cache: ', cache.extract());
    console.log('cache: ', apolloClient.cache.extract());

    // check to make sure the cache's contents have been updated
    const response = await cache.readQuery({
      query: gql`
        query IS_LOGGED_IN {
          isLoggedIn @client
        }
      `
    });

    // const response = await cache.readQuery({ query: query.MOCK_IS_LOGGED_IN });

    console.log(': response', response);

    // expect(isLoggedIn).toBeTruthy();
  });
});
