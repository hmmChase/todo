/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import { load } from '../../utils/load';
import IdeaCard from '../../components/IdeaCard/IdeaCard';
import {
  ME_IDEAS_QUERY,
  UPDATE_IDEA_MUTATION,
  DELETE_IDEA_MUTATION
} from '../../components/IdeaCard/IdeaCard.query';
import * as mock from '../../__mocks__/mocks';

describe('IdeaCard', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { id: mock.idea.id, content: mock.idea.content };
    mockQueries = [
      {
        request: {
          query: UPDATE_IDEA_MUTATION,
          variables: { id: mock.newIdea.id, content: mock.newIdea.newIdea }
        },
        result: {
          data: {
            updateIdea: {
              id: mock.newIdea.id,
              content: mock.newIdea.newIdea
            }
          }
        }
      },
      {
        request: {
          query: DELETE_IDEA_MUTATION,
          variables: { id: mock.idea.id }
        },
        result: {
          data: {
            deleteIdea: {
              id: mock.idea.id
            }
          }
        }
      },
      {
        request: { query: ME_IDEAS_QUERY },
        result: {
          data: {
            getUserIdeas: [{ id: mock.idea.id, content: mock.idea.content }]
          }
        }
      },
      {
        request: { query: ME_IDEAS_QUERY },
        result: {
          data: {
            getUserIdeas: [
              { id: mock.newIdea.id, content: mock.newIdea.content }
            ]
          }
        }
      }
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
    const wrapSnap = wrapper.find({ snapshot: 'IdeaCard' });

    // expect(wrapSnap.text()).toContain('mock content');

    expect(wrapSnap).toMatchSnapshot();
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
    console.log(': userIdeas1', userIdeas1.data.getUserIdeas);

    console.log('state: ', wrapper.find('IdeaCard').instance().state);

    wrapper
      .find('p')
      .simulate('input', { target: { innerText: 'new mock idea' } });

    console.log('state: ', wrapper.find('IdeaCard').instance().state);

    await load(wrapper);

    const userIdeas2 = await apolloClient.query({ query: ME_IDEAS_QUERY });
    console.log(': userIdeas2', userIdeas2.data.getUserIdeas);

    expect(wrapper.find('IdeaCard').instance().state.nextContent).toBe(
      'new mock idea'
    );
    expect(wrapSnap).toMatchSnapshot();
  });
});
