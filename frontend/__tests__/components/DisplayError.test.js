import { shallow } from 'enzyme';
import DisplayError from '../../components/DisplayError/DisplayError';

describe('DisplayError', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<DisplayError {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot - generic error', () => {
    const wrapSnap = wrapper.find('DisplayErrorstyle__divError');

    expect(wrapSnap.text()).toContain('Opps, something went wrong.');

    expect(wrapSnap).toMatchSnapshot();
  });
});
