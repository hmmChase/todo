import Link from 'next/link';
import { useRouter } from 'next/router';

import HeaderLoggedIn from './HeaderLoggedIn';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderUsername from './HeaderUsername';

const Header = props => {
  const { isLoggedIn } = props;

  const router = useRouter();

  const isActive = pathname => router.pathname === pathname;

  return (
    <header>
      <nav>
        <ul>
          {/* {isLoggedIn && <HeaderUsername />} */}

          <li>
            <Link href='/'>
              <a data-active={isActive('/')}>Home</a>
            </Link>
          </li>

          <li>
            <Link href='/offset'>
              <a data-active={isActive('/offset')}>Offset</a>
            </Link>
          </li>

          <li>
            <Link href='/csr'>
              <a data-active={isActive('/csr')}>CSR</a>
            </Link>
          </li>

          <li>
            <Link href='/ssr'>
              <a data-active={isActive('/ssr')}>SSR</a>
            </Link>
          </li>

          <li>
            <Link href='/ssg'>
              <a data-active={isActive('/ssg')}>SSG</a>
            </Link>
          </li>

          <li>
            <Link href='/blog'>
              <a data-active={isActive('/blog')}>Blog</a>
            </Link>
          </li>

          {isLoggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
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
