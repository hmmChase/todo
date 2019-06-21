import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { load } from '../../utils/load';
// eslint-disable-next-line max-len
import IdeaCardContainer from '../../components/IdeaCardContainer/IdeaCardContainer';
// eslint-disable-next-line max-len
import { MOCK_ME_IDEAS_QUERY } from '../../components/IdeaCardContainer/IdeaCardContainer.query';

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

  it('matches snapshot', () => {
    const wrapSnap = wrapper.find('IdeaCardContainerstyle__IdeaContainer');

    // console.log(wrapper.debug());

    expect(wrapSnap).toMatchSnapshot();
  });

  it('matches snapshot - loaded', async () => {
    const wrapSnap = wrapper.find('IdeaCardContainerstyle__IdeaContainer');

    await load(wrapper);

    // console.log(wrapper.debug());

    expect(wrapSnap).toMatchSnapshot();
  });
});
