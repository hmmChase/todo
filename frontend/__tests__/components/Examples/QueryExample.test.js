import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import toJson from 'enzyme-to-json';
import QueryExample, { USERS_QUERY } from '../../../components/Examples/QueryExample';
import { load } from '../../../utils/tests';
import * as mock from '../../../__mocks__/mockData';

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
            users: [mock.user]
          }
        }
      }
    ];
    mockMutations = [];
    wrapper = mount(
      <MockedProvider mocks={[...mockQueries, ...mockMutations]}>
        <QueryExample {...mockProps} />
      </MockedProvider>
    );
  });

  it('matches snapshot while loading', async () => {
    expect(wrapper.text()).toContain('Loading...');

    const queryExample = toJson(wrapper.find('QueryExample'));
    expect(queryExample).toMatchSnapshot();
  });

  it('matches snapshot when loaded', async () => {
    await load(wrapper);

    expect(wrapper.text()).not.toContain('Loading...');
    const queryExample = toJson(wrapper.find('QueryExample'));
    expect(queryExample).toMatchSnapshot();
  });

  it('renders an li for each user', async () => {
    await load(wrapper);

    console.log(wrapper.debug());
    const li = wrapper.find('ul');

    expect(li).toHaveLength(1);
    expect(li.text()).toEqual(mock.user.name);
  });
});
