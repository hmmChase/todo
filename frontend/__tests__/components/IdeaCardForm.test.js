import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ThemeProvider } from 'styled-components';
import { load } from '../../utils/load';
import theme from '../../styles/theme.style';
import IdeaCardForm from '../../components/IdeaCardForm/IdeaCardForm';
// eslint-disable-next-line max-len
import { MOCK_CREATE_IDEA_MUTATION } from '../../components/IdeaCardForm/IdeaCardForm.query';

describe('IdeaCardForm', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [MOCK_CREATE_IDEA_MUTATION];
    wrapper = mount(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <ThemeProvider theme={theme}>
          <IdeaCardForm {...mockProps} />
        </ThemeProvider>
      </MockedProvider>,
      {
        disableLifecycleMethods: true
      }
    );
  });

  it('matches snapshot', () => {
    const wrapSnap = wrapper.find('IdeaCardFormstyle__form');

    // console.log(wrapper.debug());

    expect(wrapSnap).toMatchSnapshot();
  });

  it('matches snapshot - loaded', async () => {
    const wrapSnap = wrapper.find('IdeaCardFormstyle__form');

    await load(wrapper);

    // console.log(wrapper.debug());

    expect(wrapSnap).toMatchSnapshot();
  });
});
