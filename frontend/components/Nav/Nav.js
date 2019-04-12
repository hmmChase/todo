import Link from 'next/link';
import { Query } from 'react-apollo';
import * as query from '../SignOn/SignOn.query';

import * as Styled from './Nav.style';

const Nav = React.memo(() => (
  <Query query={query.ME_QUERY}>
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
  </Query>
));

export default Nav;
