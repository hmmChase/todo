import { shallow } from 'enzyme';
import Head from '../../components/Head/Head';

describe('Head', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = { title: 'test' };
    wrapper = shallow(<Head {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('updates title w/ props.title', () => {
    expect(wrapper.find('title').text()).toContain('Starter | test');
  });
});
