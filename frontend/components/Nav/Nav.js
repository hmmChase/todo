import Link from 'next/link';
import WithUser from '../wrappers/WithUser/WithUser';
import * as Styled from './Nav.style';

const Nav = React.memo(() => (
  <WithUser>
    {me => (
      <Styled.nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {me && (
            <li>
              <Link href="users">
                <a>Users</a>
              </Link>
            </li>
          )}
        </ul>
      </Styled.nav>
    )}
  </WithUser>
));

export default Nav;
