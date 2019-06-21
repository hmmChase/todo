import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ThemeProvider } from 'styled-components';
import PopUps from '../../../components/SignOn/PopUps/PopUps';
import theme from '../../../styles/theme.style';

describe('PopUps', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { popUp: '', setPopUp: jest.fn() };
    mockQueries = [];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <PopUps {...mockProps} />
        </ThemeProvider>
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('matches snapshot', () => {
    const wrapSnap = wrapper.find('PopUpsstyle__divPopup');

    // console.log(wrapper.debug());

    expect(wrapSnap).toMatchSnapshot();
  });
});
