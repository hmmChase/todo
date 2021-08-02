import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { CURRENT_USER } from '../graphql/queries/user';

const Header = () => {
  const router = useRouter();

  const isActive = pathname => router.pathname === pathname;

  const { loading, error, data } = useQuery(CURRENT_USER, {
    onError: error => console.log('Header CURRENT_USER error: ', error)
  });

  const currentUser = data?.currentUser;

  const loggedIn = (
    <li>
      <Link href='/logout'>
        <a data-active={isActive('/logout')}>Log out</a>
      </Link>
    </li>
  );

  const loggedOut = (
    <>
      <li>
        <Link href='/login'>
          <a data-active={isActive('/login')}>Log in</a>
        </Link>
      </li>

      <li>
        <Link href='/signup'>
          <a data-active={isActive('/signup')}>Sign up</a>
        </Link>
      </li>
    </>
  );

  return (
    <header>
      <nav>
        <ul>
          {currentUser && (
            <li>
              <p>You're signed in as {currentUser.email}</p>
            </li>
          )}

          <li>
            <Link href='/'>
              <a data-active={isActive('/')}>Home</a>
            </Link>
          </li>

          <li>
            <Link href='/about'>
              <a data-active={isActive('/about')}>About</a>
            </Link>
          </li>

          {!loading && (currentUser ? loggedIn : loggedOut)}
        </ul>
      </nav>

      <style jsx>{`
        a[data-active='true'] {
          color: red;
        }
      `}</style>
    </header>
  );
};

export default Header;
