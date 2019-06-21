import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { load } from '../../utils/load';
import Home from '../../components/Home/Home';
// eslint-disable-next-line max-len
import { MOCK_ME_QUERY } from '../../components/wrappers/WithUser/WithUser.query';

describe('Home', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [MOCK_ME_QUERY];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <Home {...mockProps} />
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('matches snapshot - loading', () => {
    const wrapSnap = wrapper.find('Homestyle__main');

    expect(wrapSnap.find('p').text()).toContain('Loading ...');
    expect(wrapSnap).toMatchSnapshot();
  });

  it('matches snapshot - loaded', async () => {
    const wrapSnap = wrapper.find('Homestyle__main');
    await load(wrapper);
    // console.log(wrapper.debug());
    expect(wrapSnap).toMatchSnapshot();
  });
});
