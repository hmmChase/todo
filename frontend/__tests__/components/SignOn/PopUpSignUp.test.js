import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';

import { load } from '../../../utils/testing';
import PopUpSignUp from '../../../components/SignOn/PopUpSignUp/PopUpSignUp';
import { MOCK_SIGN_UP_MUTATION } from '../../../__mocks__/queries';
import theme from '../../../styles/theme.style';

describe('PopUpSignUp', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { close: jest.fn() };
    mockQueries = [MOCK_SIGN_UP_MUTATION];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <PopUpSignUp {...mockProps} />
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
