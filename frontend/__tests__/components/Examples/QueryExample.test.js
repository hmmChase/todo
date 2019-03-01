import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { load } from '../../../utils/tests';
import * as mock from '../../../__mocks__/mocks';
import QueryExample, { USERS_QUERY } from '../../../components/Examples/QueryExample';

describe('QueryExample', () => {
  let mockProps;
  let mockQueries;
  let mockMutations;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
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
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('matches snapshot while loading', async () => {
    expect(wrapper.text()).toContain('Loading...');

    const queryExample = wrapper.find('QueryExample');
    expect(toJson(queryExample)).toMatchSnapshot();
  });

  it('matches snapshot when loaded', async () => {
    await load(wrapper);

    expect(wrapper.text()).not.toContain('Loading...');

    const queryExample = wrapper.find('QueryExample');
    expect(toJson(queryExample)).toMatchSnapshot();
  });

  it('renders an li for each user', async () => {
    await load(wrapper);

    const li = wrapper.find('ul');

    expect(li).toHaveLength(1);
    expect(li.text()).toEqual(mock.user.name);
  });
});
