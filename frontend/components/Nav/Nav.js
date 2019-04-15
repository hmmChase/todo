import Link from 'next/link';
import User from '../User/User';
import * as Styled from './Nav.style';

const Nav = React.memo(() => (
  <User>
    {({ data }) => (
      <Styled.nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {data.me && (
            <li>
              <Link href="users">
                <a>Users</a>
              </Link>
            </li>
          )}
        </ul>
      </Styled.nav>
    )}
  </User>
));

export default Nav;
