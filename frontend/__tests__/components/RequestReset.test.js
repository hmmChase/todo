import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';

import { load } from '../../utils/testing';
import RequestReset from '../../components/RequestReset/RequestReset';
import { MOCK_REQUEST_RESET } from '../../__mocks__/queries';
import theme from '../../styles/theme.style';

describe('RequestReset', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [MOCK_REQUEST_RESET];
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
