import Link from 'next/link';
import * as Styled from './Nav.style';

const Nav = React.memo(() => (
  <Styled.nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>

      <li>
        <Link href="users">
          <a>Users</a>
        </Link>
      </li>
    </ul>
  </Styled.nav>
));

export default Nav;
