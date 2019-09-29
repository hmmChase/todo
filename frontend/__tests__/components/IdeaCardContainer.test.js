import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import { load } from '../../utils/testing';
import IdeaCardContainer from '../../components/IdeaCardContainer/IdeaCardContainer';
import {
  MOCK_CURRENT_USER_QUERY,
  MOCK_ERROR_CURRENT_USER_QUERY
} from '../../__mocks__/queries';

describe('IdeaCardContainer', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [MOCK_CURRENT_USER_QUERY];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <IdeaCardContainer {...mockProps} />
      </MockedProvider>,
      { disableLifecycleMethods: true }
    );
  });

  it('matches snapshot - loading', () => {
    const snapWrap = wrapper.find('Memo()');

    expect(snapWrap).toMatchSnapshot();
  });

  it('matches snapshot - loaded', async () => {
    await load(wrapper);

    const snapWrap = wrapper.find('IdeaCardContainerstyle__IdeaContainer');

    expect(snapWrap).toMatchSnapshot();
  });

  it('matches snapshot - error', async () => {
    wrapper = mount(
      <MockedProvider
        mocks={[MOCK_ERROR_CURRENT_USER_QUERY]}
        addTypename={false}
      >
        <IdeaCardContainer {...mockProps} />
      </MockedProvider>,
      { disableLifecycleMethods: true }
    );

    await load(wrapper);

    const snapWrap = wrapper.find('DisplayErrorstyle__divError');

    expect(snapWrap).toMatchSnapshot();
  });
});
