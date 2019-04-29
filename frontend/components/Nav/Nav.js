import Link from 'next/link';
import WithUser from '../wrappers/WithUser/WithUser';
import * as sc from './Nav.style';

const Nav = React.memo(() => (
  <WithUser>
    {me => (
      <nav>
        <sc.ul>
          <sc.li>
            <Link href="/">
              <sc.a>Home</sc.a>
            </Link>
          </sc.li>
          {me && (
            <sc.li>
              <Link href="users">
                <sc.a>Users</sc.a>
              </Link>
            </sc.li>
          )}
        </sc.ul>
      </nav>
    )}
  </WithUser>
));

export default Nav;
