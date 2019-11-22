import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';

import { load } from '../../../utils/testing';
import PopUpSignIn from '../../../components/SignOn/PopUpSignIn/PopUpSignIn';
import { MOCK_SIGN_IN } from '../../../__mocks__/queries';
import theme from '../../../styles/theme.style';

describe('PopUpSignIn', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { close: jest.fn(), requestReset: jest.fn() };
    mockQueries = [MOCK_SIGN_IN];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <PopUpSignIn {...mockProps} />
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
