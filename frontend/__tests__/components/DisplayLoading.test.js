import { shallow } from 'enzyme';
import DisplayLoading from '../../components/DisplayLoading/DisplayLoading';

describe('DisplayLoading', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    wrapper = shallow(<DisplayLoading {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  afterEach(() => jest.resetAllMocks());

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('Loading...');

    expect(wrapper).toMatchSnapshot();
  });
});
