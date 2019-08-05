import { mount } from 'enzyme';

import SignOut from '../../components/SignOut/SignOut';

describe('SignOut', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = mount(<SignOut {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
