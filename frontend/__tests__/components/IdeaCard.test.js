/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import { load } from '../../utils/load';
import IdeaCard from '../../components/IdeaCard/IdeaCard';
import {
  MOCK_UPDATE_IDEA_MUTATION,
  MOCK_DELETE_IDEA_MUTATION
} from '../../components/IdeaCard/IdeaCard.query';
// eslint-disable-next-line max-len
import {
  ME_IDEAS_QUERY,
  MOCK_ME_IDEAS_QUERY
} from '../../components/IdeaCardContainer/IdeaCardContainer.query';
import * as mock from '../../__mocks__/mocks';

describe('IdeaCard', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { id: mock.idea.id, content: mock.idea.content };
    mockQueries = [
      MOCK_UPDATE_IDEA_MUTATION,
      MOCK_DELETE_IDEA_MUTATION,
      MOCK_ME_IDEAS_QUERY
    ];

    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <IdeaCard {...mockProps} />
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('matches snapshot', () => {
    const wrapSnap = wrapper.find('IdeaCard');

    expect(wrapSnap).toMatchSnapshot();
  });

  it('renders list item', () => {
    const ideaLi = wrapper.find('li');

    expect(ideaLi).toHaveLength(1);
    expect(ideaLi.text()).toContain('mock content');
  });

  it('matches snapshot - update idea', async () => {
    let apolloClient;

    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <IdeaCard {...mockProps} />;
          }}
        </ApolloConsumer>
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );

    const wrapSnap = wrapper.find({ snapshot: 'IdeaCard' });

    const userIdeas1 = await apolloClient.query({ query: ME_IDEAS_QUERY });
    // console.log(': userIdeas1', userIdeas1.data.getUserIdeas);

    // console.log('state: ', wrapper.find('IdeaCard').instance().state);

    const ideaP = wrapper.find('p');
    // console.log(': ideaP', ideaP.debug());

    ideaP.simulate('input', { target: { innerText: 'new mock idea' } });

    // console.log('state: ', wrapper.find('IdeaCard').instance().state);

    await load(wrapper);

    const userIdeas2 = await apolloClient.query({ query: ME_IDEAS_QUERY });
    // console.log(': userIdeas2', userIdeas2.data.getUserIdeas);

    await load(wrapper);

    // console.log(wrapper.debug());

    expect(wrapper.find('IdeaCard').instance().state.nextContent).toBe(
      'new mock idea'
    );
    expect(wrapSnap).toMatchSnapshot();
  });
});
