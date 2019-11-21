import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import { load } from '../../utils/testing';
import Home from '../../components/Home/Home';
import { MOCK_CURRENT_USER } from '../../__mocks__/queries';

describe('Home', () => {
  let mockProps;
  let mockQueries;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    mockQueries = [MOCK_CURRENT_USER];
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
