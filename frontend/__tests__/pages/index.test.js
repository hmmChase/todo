import { shallow } from 'enzyme';
import IndexPage from '../../pages/index';

describe('IndexPage', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    wrapper = shallow(<IndexPage {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  afterEach(() => jest.resetAllMocks());

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
