import { shallow } from 'enzyme';
import Layout from '../../components/Layout/Layout';

describe('Layout', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {
      children: [React.createElement('div', { key: 1 }, 'mock child component')]
    };
    wrapper = shallow(<Layout {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  afterEach(() => jest.resetAllMocks());

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('mock child component');
    expect(wrapper).toMatchSnapshot();
  });
});
