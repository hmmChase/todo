import { shallow } from 'enzyme';
import Page from '../../components/Page/Page';

describe('Page', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {
      children: [React.createElement('div', { key: 1 }, 'mock component')]
    };
    wrapper = shallow(<Page {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  afterEach(() => jest.resetAllMocks());

  // TODO: test loading and error states
  xit('matches snapshot - loading', () => {
    const wrapperLoading = wrapper
      .renderProp('children')({ loading: true })
      .dive();

    expect(wrapperLoading).toMatchSnapshot();
  });

  it('matches snapshot - UnAuthenticated', () => {
    const UnAuthenticated = wrapper
      .renderProp('children')({ data: { isLoggedIn: false } })
      .dive();

    expect(UnAuthenticated).toMatchSnapshot();
  });

  it('matches snapshot - Authenticated', () => {
    const Authenticated = wrapper
      .renderProp('children')({ data: { isLoggedIn: true } })
      .dive();

    expect(Authenticated).toMatchSnapshot();
  });
});
