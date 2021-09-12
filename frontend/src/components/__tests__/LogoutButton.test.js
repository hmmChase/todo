import LogoutButton from '../LogoutButton';

import { renderApollo, cleanup, fireEvent } from '../../utils/test-utils';
import { cache, isLoggedInVar } from '../../graphql/cache';

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders logout button', async () => {
    renderApollo(<LogoutButton />);
  });

  it('complete logout', async () => {
    isLoggedInVar(true);

    localStorage.setItem('userId', '1');

    const { getByTestId } = renderApollo(<LogoutButton />, { cache });

    fireEvent.click(getByTestId('logout-button'));

    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
