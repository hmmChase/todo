import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { load } from '../../utils/load';
// eslint-disable-next-line max-len
import IdeaCardContainer from '../../components/IdeaCardContainer/IdeaCardContainer';
// eslint-disable-next-line max-len
import {
  MOCK_ME_IDEAS_QUERY,
  MOCK_ERROR_ME_IDEAS_QUERY
} from '../../components/IdeaCardContainer/IdeaCardContainer.query';

describe('IdeaCardContainer', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [MOCK_ME_IDEAS_QUERY];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <IdeaCardContainer {...mockProps} />
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
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
      <MockedProvider mocks={[MOCK_ERROR_ME_IDEAS_QUERY]} addTypename={false}>
        <IdeaCardContainer {...mockProps} />
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );

    await load(wrapper);

    const snapWrap = wrapper.find('DisplayErrorstyle__divError');

    expect(snapWrap).toMatchSnapshot();
  });
});
