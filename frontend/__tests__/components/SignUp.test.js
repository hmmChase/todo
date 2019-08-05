import { shallow, mount } from 'enzyme';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import SignUp from '../../components/SignUp/SignUp';
import * as query from '../../__mocks__/queries/user';
import resolvers from '../../graphql/resolvers';
import { load } from '../../utils/testing';

describe('SignUp', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    mockQueries = [query.MOCK_SIGN_UP_MUTATION];
    wrapper = shallow(<SignUp {...mockProps} />, {
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
});
