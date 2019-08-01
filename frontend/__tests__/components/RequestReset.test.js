import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ThemeProvider } from 'styled-components';
import { load } from '../../utils/load';
import RequestReset from '../../components/RequestReset/RequestReset';
// eslint-disable-next-line max-len
import { MOCK_REQUEST_RESET_MUTATION } from '../../components/RequestReset/RequestReset.query';
import theme from '../../styles/theme.style';

describe('RequestReset', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [MOCK_REQUEST_RESET_MUTATION];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <RequestReset {...mockProps} />
        </ThemeProvider>
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('matches snapshot', () => {
    const wrapSnap = wrapper.find('formstyle__form');

    // console.log(wrapper.debug());

    expect(wrapSnap).toMatchSnapshot();
  });

  it('matches snapshot - loaded', async () => {
    const wrapSnap = wrapper.find('formstyle__form');

    await load(wrapper);

    // console.log(wrapper.debug());

    expect(wrapSnap).toMatchSnapshot();
  });
});