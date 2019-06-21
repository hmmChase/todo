import { shallow } from 'enzyme';
import WithUser from '../../../components/wrappers/WithUser/WithUser';

describe('WithUser', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { children: jest.fn };
    wrapper = shallow(<WithUser {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
