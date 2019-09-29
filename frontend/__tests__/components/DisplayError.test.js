import { shallow } from 'enzyme';
import DisplayError from '../../components/DisplayError/DisplayError';

describe('DisplayError', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {};
    wrapper = shallow(<DisplayError {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  afterEach(() => jest.resetAllMocks());

  it('renders correctly - no props.error', () => {
    expect(wrapper.text()).toContain('Opps, something went wrong.');

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - props.error.message', () => {
    mockProps = { error: { message: 'mock error message' } };
    wrapper = shallow(<DisplayError {...mockProps} />, {
      disableLifecycleMethods: true
    });

    expect(wrapper.text()).toContain('mock error message');

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly - props.error.graphQLErrors', () => {
    mockProps = {
      error: { graphQLErrors: [{ message: 'mock graphQLErrors message' }] }
    };
    wrapper = shallow(<DisplayError {...mockProps} />, {
      disableLifecycleMethods: true
    });

    expect(wrapper.text()).toContain('mock graphQLErrors message');

    expect(wrapper).toMatchSnapshot();
  });
});
