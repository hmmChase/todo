import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';

import { load } from '../../utils/testing';
import IdeaCardForm from '../../components/IdeaCardForm/IdeaCardForm';
import { MOCK_CREATE_IDEA } from '../../__mocks__/queries';
import theme from '../../styles/theme.style';

describe('IdeaCardForm', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [MOCK_CREATE_IDEA];
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
