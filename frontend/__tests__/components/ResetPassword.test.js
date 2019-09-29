import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';

import { load } from '../../utils/testing';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import { MOCK_RESET_PASSWORD_MUTATION } from '../../__mocks__/queries';
import theme from '../../styles/theme.style';

describe('ResetPassword', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [MOCK_RESET_PASSWORD_MUTATION];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <ResetPassword {...mockProps} />
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
