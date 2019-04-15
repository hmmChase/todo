import Link from 'next/link';
import UserWrapper from '../wrappers/UserWrapper/UserWrapper';
import * as Styled from './Nav.style';

const Nav = React.memo(() => (
  <UserWrapper>
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
  </UserWrapper>
));

export default Nav;
